import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Generated favicon (a simple monogram) so the site ships with a real
 * icon from day one without depending on a designed asset that doesn't
 * exist yet. Replace with a final mark whenever one is designed.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#3652e3",
          color: "#ffffff",
          fontSize: 20,
          fontWeight: 600,
          borderRadius: 6,
        }}
      >
        A
      </div>
    ),
    { ...size },
  );
}
