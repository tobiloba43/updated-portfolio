"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

type BrandWordmarkProps = {
  href: string;
  className?: string;
  label?: string;
};

function characters(text: string) {
  return Array.from(text).map((character, index) => (
    <span className="brand-char" key={`${character}-${index}`}>
      {character === " " ? "\u00a0" : character}
    </span>
  ));
}

export default function BrandWordmark({ href, className = "", label = "Erinle Tobiloba home" }: BrandWordmarkProps) {
  const brandRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ delay: 0.18 });
      timeline
        .fromTo(
          ".brand-mark .brand-char",
          { opacity: 0, y: 5, filter: "blur(3px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.24, stagger: 0.11, ease: "power2.out" },
        )
        .fromTo(
          ".brand-name .brand-char",
          { opacity: 0, y: 5, filter: "blur(3px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.24, stagger: 0.035, ease: "power2.out" },
          "-=0.02",
        );
    }, brandRef);

    return () => context.revert();
  }, []);

  return (
    <Link aria-label={label} className={`brand-wordmark ${className}`} href={href} ref={brandRef}>
      <span aria-hidden="true" className="wordmark-mark brand-mark">{characters("ET")}</span>
      <span aria-hidden="true" className="brand-name">{characters("Erinle Tobiloba")}</span>
    </Link>
  );
}
