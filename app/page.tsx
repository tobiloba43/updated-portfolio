"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Code2, Layers3, Mail, Menu, Pause, Play, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BrandWordmark from "./components/brand-wordmark";

const roles = ["frontend developer", "Next.js enthusiast", "UI builder"];
const portraits = [
  { src: "/Images/1ST.jpeg", label: "Portrait 01" },
  { src: "/Images/2ND.jpeg", label: "Portrait 02" },
  { src: "/Images/3RD.jpeg", label: "Portrait 03" },
  { src: "/Images/4TH.jpeg", label: "Portrait 04" },
  { src: "/Images/5TH.jpeg", label: "Portrait 05" },
  { src: "/Images/6TH.jpeg", label: "Portrait 06" },
];

const projects = [
  {
    number: "01",
    title: "Form & Function",
    category: "Commerce concept",
    description: "A considered storefront for everyday objects, built around a calmer way to browse.",
    className: "project-visual--shop",
  },
  {
    number: "02",
    title: "Daylight Studio",
    category: "Dashboard concept",
    description: "A bright, focused workspace that turns a busy week into a clear next step.",
    className: "project-visual--studio",
  },
];

const toolkit = ["HTML & CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "GSAP", "Git & GitHub"];

export default function Home() {
  const galleryTrack = useRef<HTMLDivElement>(null);
  const galleryMotion = useRef<gsap.core.Tween | null>(null);
  const [isGalleryPlaying, setIsGalleryPlaying] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      if (prefersReducedMotion) return;
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(".hero-kicker, .hero-title, .hero-copy, .hero-actions, .portrait-frame", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.15,
      });
      gsap.to(".portrait-frame", {
        y: -9,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.1,
      });

      const target = document.querySelector<HTMLElement>("#typed-role");
      if (!target) return;

      let roleIndex = 0;
      let timeline: gsap.core.Timeline;
      const counter = { value: 0 };
      const writeRole = () => {
        const role = roles[roleIndex];
        timeline = gsap.timeline({
          onComplete: () => {
            roleIndex = (roleIndex + 1) % roles.length;
            writeRole();
          },
        });
        timeline
          .to(counter, {
            value: role.length,
            duration: 1.1,
            ease: "none",
            onUpdate: () => {
              target.textContent = role.slice(0, Math.round(counter.value));
            },
          })
          .to({}, { duration: 1.4 })
          .to(counter, {
            value: 0,
            duration: 0.35,
            ease: "none",
            onUpdate: () => {
              target.textContent = role.slice(0, Math.round(counter.value));
            },
          })
          .to({}, { duration: 0.2 });
      };

      writeRole();
      if (galleryTrack.current) {
        galleryMotion.current = gsap.to(galleryTrack.current, {
          xPercent: -50,
          duration: 48,
          repeat: -1,
          ease: "none",
        });
      }
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 28,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        });
      });
    });

    return () => context.revert();
  }, []);

  useEffect(() => {
    galleryMotion.current?.paused(!isGalleryPlaying);
  }, [isGalleryPlaying]);

  useEffect(() => {
    if (selectedPhoto === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedPhoto(null);
      if (event.key === "ArrowRight") setSelectedPhoto((current) => current === null ? null : (current + 1) % portraits.length);
      if (event.key === "ArrowLeft") setSelectedPhoto((current) => current === null ? null : (current - 1 + portraits.length) % portraits.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhoto]);

  return (
    <main>
      <header className="site-header">
        <BrandWordmark className="wordmark" href="#home" />
        <nav aria-label="Main navigation" className="main-nav">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-cta" href="#contact">
          Let&apos;s talk <ArrowUpRight aria-hidden="true" size={15} />
        </a>
        <button
          aria-controls="mobile-navigation"
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          type="button"
        >
          {isMobileMenuOpen ? <X aria-hidden="true" size={18} /> : <Menu aria-hidden="true" size={18} />}
          <span>{isMobileMenuOpen ? "Close" : "Menu"}</span>
        </button>
        <nav aria-label="Mobile navigation" className="mobile-nav" hidden={!isMobileMenuOpen} id="mobile-navigation">
          <ul>
            <li><a href="#work" onClick={() => setIsMobileMenuOpen(false)}>Work <span>01</span></a></li>
            <li><a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About <span>02</span></a></li>
            <li><a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact <span>03</span></a></li>
          </ul>
          <a className="mobile-nav-cta" href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Let&apos;s talk <ArrowUpRight aria-hidden="true" size={15} /></a>
        </nav>
      </header>

      <section className="hero section-shell" id="home">
        <div className="hero-copy-block">
          <p className="eyebrow hero-kicker"><span className="status-dot" /> Independent developer · Nigeria</p>
          <h1 className="hero-title">Erinle<br />Tobiloba<span className="hero-period">.</span></h1>
          <div className="role-line" aria-label="Frontend developer and Next.js enthusiast">
            <span className="role-prefix">I&apos;m a</span>
            <span className="role-value"><span id="typed-role">frontend developer</span><span className="typing-cursor" aria-hidden="true" /></span>
          </div>
          <p className="hero-copy">
            I build thoughtful digital experiences with clean code, careful details, and a little curiosity.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">Explore my work <ArrowDown aria-hidden="true" size={16} /></a>
            <a className="text-link" href="#about">A little about me <ArrowRight aria-hidden="true" size={15} /></a>
          </div>
        </div>

        <div className="portrait-stage">
          <div className="portrait-frame">
            <Image className="portrait-image" src={portraits[0].src} alt="Erinle Tobiloba seated with his laptop" width={960} height={1280} priority />
            <div className="portrait-overlay"><span>ERINLE TOBILOBA</span><span>FRONTEND DEVELOPER</span></div>
          </div>
          <div className="portrait-sticker"><span>BUILDING<br />WITH<br />INTENTION</span></div>
          <div className="portrait-caption"><span>01 / A LITTLE ABOUT ME</span><span>SCROLL TO EXPLORE ↓</span></div>
        </div>
        <span className="hero-index">PORTFOLIO / 2026</span>
      </section>

      <section className="ticker" aria-label="Areas of focus">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <div className="ticker-set" aria-hidden={copy === 1} key={copy}>
              <span>Frontend development</span><i>✳</i><span>Next.js applications</span><i>✳</i><span>Thoughtful interfaces</span><i>✳</i><span>Always learning</span><i>✳</i>
            </div>
          ))}
        </div>
      </section>

      <section className="portrait-gallery" id="portraits" aria-labelledby="gallery-title">
        <div className="gallery-heading section-shell" data-reveal>
          <div><p className="eyebrow">A little more of me</p><h2 id="gallery-title">Life <span>in frames.</span></h2></div>
          <button className="gallery-toggle" type="button" onClick={() => setIsGalleryPlaying((playing) => !playing)} aria-label={isGalleryPlaying ? "Pause moving photo gallery" : "Play moving photo gallery"}>
            {isGalleryPlaying ? <Pause aria-hidden="true" size={16} /> : <Play aria-hidden="true" size={16} />}
            <span>{isGalleryPlaying ? "Pause motion" : "Play motion"}</span>
          </button>
        </div>
        <div className={`gallery-window${isGalleryPlaying ? " is-moving" : ""}`} onMouseEnter={() => galleryMotion.current?.pause()} onMouseLeave={() => galleryMotion.current?.paused(!isGalleryPlaying)} onFocus={() => galleryMotion.current?.pause()} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) galleryMotion.current?.paused(!isGalleryPlaying); }}>
          <div className="gallery-track" ref={galleryTrack}>
            {[0, 1].map((copy) => (
              <div className="gallery-set" aria-hidden={copy === 1} key={copy}>
                {portraits.map((portrait, index) => (
                  <button className={`gallery-photo gallery-photo--${index + 1}`} type="button" key={portrait.src} onClick={() => setSelectedPhoto(index)} tabIndex={copy === 1 ? -1 : undefined} aria-label={`Open ${portrait.label}`}>
                    <Image src={portrait.src} alt={copy === 1 ? "" : `${portrait.label}, Erinle Tobiloba`} width={810} height={1080} sizes="(max-width: 640px) 70vw, 30vw" />
                    <span className="gallery-photo-label">{portrait.label}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
        <p className="gallery-note section-shell">A few moments, outside the browser window.</p>
      </section>

      <section className="work-section section-shell" id="work">
        <div className="section-heading" data-reveal>
          <div><p className="eyebrow">A few things I&apos;m exploring</p><h2>Good work starts<br />with a <span>good question.</span></h2></div>
          <p className="section-intro">A couple of interface concepts to show how I think about clear, useful experiences. More real work will find its way here soon.</p>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" data-reveal key={project.number}>
              <div className={`project-visual ${project.className}`}>
                <div className="project-visual-meta"><span>CONCEPT STUDY</span><span>{project.number} / 02</span></div>
                {project.number === "01" ? (
                  <div className="shop-screen">
                    <div className="shop-nav"><b>form<span>&</span>function</b><span>OBJECTS&nbsp;&nbsp; JOURNAL&nbsp;&nbsp; ABOUT</span><i>bag (0)</i></div>
                    <div className="shop-content"><div><small>OBJECTS FOR SLOWER LIVING</small><h3>Keep the<br />good things.</h3><span className="shop-link">Shop the collection ↗</span></div><div className="shop-object"><div className="vase vase-one" /><div className="vase vase-two" /><div className="vase-shadow" /></div></div>
                    <div className="shop-foot"><span>01 — 04</span><span>Made to live with.</span></div>
                  </div>
                ) : (
                  <div className="studio-screen">
                    <div className="studio-nav"><b>daylight<span>·</span></b><i>MONDAY, 14 JULY</i><span className="avatar-mini">ET</span></div>
                    <div className="studio-content"><div className="studio-welcome"><small>YOUR SPACE, YOUR PACE</small><h3>Make room<br />for good work.</h3><span>One clear thing at a time.</span></div><div className="task-panel"><div><b>Today</b><span>3 of 5 done</span></div><i className="task-line task-done">✳ &nbsp;Review the first draft</i><i className="task-line task-done">✳ &nbsp;Send a little feedback</i><i className="task-line">○ &nbsp;Build the new thing</i><div className="task-progress"><span /></div></div></div>
                    <div className="studio-foot"><span>MAKE SPACE FOR WHAT MATTERS.</span><span>WEEK 28</span></div>
                  </div>
                )}
              </div>
              <div className="project-details"><div><span className="project-category">{project.category}</span><h3>{project.title}</h3><p>{project.description}</p></div><span className="project-arrow" aria-hidden="true"><ArrowUpRight size={19} /></span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="about-inner section-shell">
          <div className="about-mark" data-reveal><div className="about-monogram">E<span>T</span></div><span>MADE WITH<br />CURIOSITY</span><div className="about-mark-line" /></div>
          <div className="about-copy" data-reveal>
            <p className="eyebrow">The person behind the pixels</p>
            <h2>Curious by nature.<br /><span>Developer by choice.</span></h2>
            <p className="about-paragraph">I&apos;m Erinle Tobiloba, a frontend developer who enjoys turning thoughtful ideas into polished, easy-to-use interfaces. I care about the small things: the rhythm of a layout, the clarity of a button, the moment a page just feels right.</p>
            <p className="about-paragraph">I&apos;m especially drawn to React and Next.js, and I&apos;m always learning something new along the way. Good work, to me, is a mix of patience, play, and making the complex feel simple.</p>
            <a className="text-link about-link" href="#contact">A project in mind? Say hello <ArrowRight aria-hidden="true" size={15} /></a>
          </div>
        </div>
      </section>

      <section className="toolkit-section section-shell" id="toolkit">
        <div className="toolkit-heading" data-reveal><p className="eyebrow">Tools of the trade</p><h2>My current<br /><span>toolkit.</span></h2></div>
        <div className="toolkit-content" data-reveal>
          <div className="toolkit-symbol"><Code2 aria-hidden="true" size={21} /><span>BUILD / LEARN / REPEAT</span></div>
          <div className="toolkit-list">{toolkit.map((tool, index) => <div className="toolkit-item" key={tool}><span className="toolkit-number">0{index + 1}</span><span>{tool}</span><ArrowUpRight aria-hidden="true" size={15} /></div>)}</div>
          <p className="toolkit-note"><Layers3 aria-hidden="true" size={16} /> The stack is always growing.</p>
        </div>
      </section>

      <footer className="contact-section" id="contact">
        <div className="contact-inner section-shell">
          <p className="eyebrow"><span className="status-dot" /> OPEN TO GOOD IDEAS</p>
          <h2>Have a good one<br />in <span>mind?</span></h2>
          <p className="contact-copy">I&apos;d love to hear what you&apos;re working on. Let&apos;s make something useful, together.</p>
          <a className="button button-light" href="/contact">Start a conversation <Mail aria-hidden="true" size={17} /></a>
          <div className="footer-bottom"><a className="wordmark wordmark-light" href="#home"><span className="wordmark-mark">ET</span><span>Erinle Tobiloba</span></a><span>DESIGNED & BUILT WITH CARE · 2026</span><a className="back-to-top" href="#home">Back to top <ArrowUpRight aria-hidden="true" size={14} /></a></div>
        </div>
      </footer>

      {selectedPhoto !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo gallery" onClick={(event) => { if (event.target === event.currentTarget) setSelectedPhoto(null); }}>
          <button className="lightbox-close" type="button" onClick={() => setSelectedPhoto(null)} aria-label="Close photo viewer">×</button>
          <button className="lightbox-arrow lightbox-prev" type="button" onClick={() => setSelectedPhoto((selectedPhoto - 1 + portraits.length) % portraits.length)} aria-label="Previous photo"><ArrowLeft aria-hidden="true" /></button>
          <figure className="lightbox-figure">
            <Image src={portraits[selectedPhoto].src} alt={`${portraits[selectedPhoto].label}, Erinle Tobiloba`} width={960} height={1280} priority />
            <figcaption>{portraits[selectedPhoto].label} <span>/ {String(selectedPhoto + 1).padStart(2, "0")} — {String(portraits.length).padStart(2, "0")}</span></figcaption>
          </figure>
          <button className="lightbox-arrow lightbox-next" type="button" onClick={() => setSelectedPhoto((selectedPhoto + 1) % portraits.length)} aria-label="Next photo"><ArrowRight aria-hidden="true" /></button>
        </div>
      )}
    </main>
  );
}
