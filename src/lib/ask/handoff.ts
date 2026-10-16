/**
 * Handing a question from the command bar to Ask the portfolio, without
 * putting it in the address bar (where analytics would read it). Kept in
 * its own tiny module so the command bar doesn't load the answer engine.
 */
export const ASK_HANDOFF_KEY = "aseer-ask";
export const ASK_EVENT = "ask:question";

export function handOffQuestion(question: string, navigate: (href: string) => void) {
  if (window.location.pathname === "/ask") {
    window.dispatchEvent(new CustomEvent(ASK_EVENT, { detail: question }));
    return;
  }
  try {
    window.sessionStorage.setItem(ASK_HANDOFF_KEY, question);
  } catch {
    // Without storage the page still opens; the question is just not carried over.
  }
  navigate("/ask");
}
