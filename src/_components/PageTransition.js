"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

// Keep in sync with `.is-leaving .page-transition` in global.scss (0.75s),
// plus a little margin so we're fully black before swapping pages.
const FADE_OUT_MS = 800;

// Set when we navigate away from the intro, so the destination page can play
// its own "fade in from black" (e.g. the shader background).
let cameFromIntro = false;

/** True once after an intro transition; the destination page calls this on mount. */
export function consumeIntroEntry() {
  const value = cameFromIntro;
  cameFromIntro = false;
  return value;
}

/** Black overlay in the root layout. Clears the fade whenever the route changes. */
export default function PageTransition() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.remove("is-leaving");
  }, [pathname]);

  return <div className="page-transition" />;
}

/** Returns a click handler factory: fade to black, then navigate to `href`. */
export function useFadeNavigate() {
  const router = useRouter();

  return (href) => (event) => {
    // Let new-tab / modified clicks behave normally
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return router.push(href);

    cameFromIntro = true;
    document.documentElement.classList.add("is-leaving");
    setTimeout(() => router.push(href), FADE_OUT_MS);
  };
}
