#!/usr/bin/env node
/**
 * Downloads every image the site still referenced on Framer's CDN into
 * public/media/framer/, keeping the original file names.
 *
 * Run once from the repo root, on a machine with normal internet access:
 *
 *   node scripts/self-host-framer-images.mjs
 *
 * Safe to run again: files that already exist are skipped, so a second
 * run only fetches whatever failed the first time. It exits with an
 * error if any file is still missing, so nothing half-done gets pushed.
 */
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "media", "framer");
const files = JSON.parse(
  await readFile(path.join(root, "scripts", "framer-images.json"), "utf8"),
);

await mkdir(outDir, { recursive: true });

const exists = async (p) => {
  try {
    return (await stat(p)).size > 0;
  } catch {
    return false;
  }
};

async function download(file, attempt = 1) {
  const url = `https://framerusercontent.com/images/${file}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const bytes = Buffer.from(await res.arrayBuffer());
    if (bytes.length === 0) throw new Error("empty response");
    await writeFile(path.join(outDir, file), bytes);
    return bytes.length;
  } catch (error) {
    if (attempt < 3) return download(file, attempt + 1);
    throw error;
  }
}

let fetched = 0;
let skipped = 0;
let totalBytes = 0;
const failed = [];

// Four at a time: quick, without hammering the CDN.
const queue = [...files];
async function worker() {
  while (queue.length) {
    const file = queue.shift();
    if (await exists(path.join(outDir, file))) {
      skipped++;
      continue;
    }
    try {
      totalBytes += await download(file);
      fetched++;
      process.stdout.write(`\r${fetched + skipped}/${files.length} done`);
    } catch (error) {
      failed.push(`${file} (${error.message})`);
    }
  }
}
await Promise.all([worker(), worker(), worker(), worker()]);

console.log(
  `\nDownloaded ${fetched}, already had ${skipped}, ${(totalBytes / 1e6).toFixed(1)} MB new.`,
);
if (failed.length) {
  console.error(`\n${failed.length} failed. Run the script again to retry:`);
  for (const f of failed) console.error(`  ${f}`);
  process.exit(1);
}
console.log(`All ${files.length} images are in public/media/framer/.`);
