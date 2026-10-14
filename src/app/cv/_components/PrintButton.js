"use client";

// "All" is flagged on <html> only while the print dialog is open (see .cv-print-skip in cv.scss).
function print(all) {
  const root = document.documentElement;
  if (all) root.dataset.printAll = "true";
  window.addEventListener("afterprint", () => delete root.dataset.printAll, { once: true });
  window.print();
}

export default function PrintButton() {
  return (
    <>
      <button className="button-primary no-print" onClick={() => print(false)}>
        ✦ Print highlights
      </button>
      <button className="button-primary cv-print-all no-print" onClick={() => print(true)}>
        Print all
      </button>
    </>
  );
}
