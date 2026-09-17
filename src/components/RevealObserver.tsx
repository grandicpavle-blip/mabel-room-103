"use client";

import { useEffect } from "react";

export function RevealObserver() {
  useEffect(() => {
    const observe = () => {
      const nodes = document.querySelectorAll(".reveal:not(.is-visible)");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
      );
      nodes.forEach((node) => observer.observe(node));
      return observer;
    };

    let observer = observe();
    const mo = new MutationObserver(() => {
      observer.disconnect();
      observer = observe();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
