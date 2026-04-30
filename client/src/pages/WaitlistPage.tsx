/**
 * MeNova Health — Soft Launch Waitlist Page (TEMPORARY)
 * To switch back to the full website, update App.tsx route "/" to Home component.
 * This page connects to Make.com webhook to collect waitlist signups.
 */

import { useState, useRef, useEffect } from "react";
import { Leaf, Heart, Shield, Clock, CheckCircle2, ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/ygbmyty71u7pahms7m7owjvcxpf22v68";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663515887063/Mbboc9yaua4MvveQ5gebGn/menova-hero-bg-jRKC2iNt3D4DtGerP5ykiZ.webp";
const WOMAN_HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663515887063/Mbboc9yaua4MvveQ5gebGn/menova-woman-hero-TdGCoZDVuHwERKBpG5xxdo.webp";
const WOMAN_OUTDOOR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663515887063/Mbboc9yaua4MvveQ5gebGn/menova-woman-outdoor-DmRovSNgWvgd9QDKqkUgts.webp";

// ── Colours ───────────────────────────────────────────────────────────────────
// Forest green dark:  oklch(0.18 0.06 155)
// Cream light:        oklch(0.98 0.01 90)
// Terracotta accent:  oklch(0.60 0.12 42)
// Sage mid:           oklch(0.50 0.08 155)

const faqItems = [
  {
    q: "Do I need a referral?",
    a: "No. MeNova Health is a direct-access virtual menopause clinic. You can self-refer and book online with a BC-licensed Nurse Practitioner.",
  },
  {
    q: "Is this only for Vancouver?",
    a: "We're based in Vancouver, but our virtual clinic serves women across British Columbia, including Surrey, Burnaby, Richmond, Kelowna, Victoria and more.",
  },
  {
    q: "Do you offer hormone replacement therapy?",
    a: "Yes. Our NPs provide evidence-based menopausal hormone therapy, including bioidentical hormone replacement therapy (BHRT) when it's the right fit for you.",
  },
];

// ── Carousel slides ────────────────────────────────────────────────────────────
const carouselSlides = [
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Women in Perimenopause",
    desc: "Experiencing irregular periods, mood changes, sleep problems or early perimenopause symptoms? Our NPs provide perimenopause assessments and treatment plans so you can navigate this transition with clear answers and expert guidance.",
    accent: "oklch(0.60 0.12 42)",
    accentLight: "oklch(0.60 0.12 42 / 0.12)",
  },
  {
    icon: <Leaf className="w-8 h-8" />,
    title: "Women in Menopause",
    desc: "Dealing with hot flashes, night sweats, low libido, brain fog or weight changes? Our menopause specialists create personalized BHRT and non‑hormonal treatment plans to relieve symptoms and restore your quality of life.",
    accent: "oklch(0.40 0.10 155)",
    accentLight: "oklch(0.40 0.10 155 / 0.12)",
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Women Tired of Waiting",
    desc: "Frustrated by 6‑ to 12‑month wait times to see a menopause specialist or have your hormone concerns taken seriously? With MeNova Health, you can see a virtual menopause Nurse Practitioner in weeks, not months — no referral required.",
    accent: "oklch(0.50 0.08 155)",
    accentLight: "oklch(0.50 0.08 155 / 0.12)",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Women Seeking BHRT",
    desc: "Curious about bioidentical hormone replacement therapy? Our NPs prescribe evidence-based BHRT custom-compounded to your hormone levels, dispensed by a Health Canada-regulated BC pharmacy and shipped discreetly to your door.",
    accent: "oklch(0.55 0.14 155)",
    accentLight: "oklch(0.55 0.14 155 / 0.12)",
  },
];

// ── FAQ Item ──────────────────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen((o) => !o)}
      className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-200"
      style={{
        background: "oklch(0.97 0.01 85)",
        border: "1px solid oklch(0.88 0.03 80)",
        boxShadow: open
          ? "0 8px 24px oklch(0.22 0.06 155 / 0.10), 0 2px 6px oklch(0.22 0.06 155 / 0.08), inset 0 1px 0 oklch(1 0 0 / 0.6)"
          : "0 2px 8px oklch(0.22 0.06 155 / 0.06), 0 1px 3px oklch(0.22 0.06 155 / 0.04), inset 0 1px 0 oklch(1 0 0 / 0.6)",
        transform: open ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      <div className="flex items-center justify-between px-6 py-4 gap-4">
        <span className="font-semibold text-sm" style={{ color: "oklch(0.22 0.06 155)" }}>{q}</span>
        <ChevronDown
          className="w-4 h-4 shrink-0 transition-transform duration-300"
          style={{ color: "oklch(0.50 0.08 155)", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </div>
      {open && (
        <div className="px-6 pb-4 text-sm leading-relaxed" style={{ color: "oklch(0.38 0.04 80)" }}>
          {a}
        </div>
      )}
    </div>
  );
}

// ── 3D Button ─────────────────────────────────────────────────────────────────
function Button3D({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  const [pressed, setPressed] = useState(false);

  const styles: Record<string, React.CSSProperties> = {
    primary: {
      background: disabled ? "oklch(0.45 0.10 155)" : "oklch(0.50 0.14 155)",
      color: "oklch(0.97 0.01 90)",
      boxShadow: pressed || disabled
        ? "0 1px 2px oklch(0.18 0.07 155 / 0.5), inset 0 1px 3px oklch(0.18 0.07 155 / 0.3)"
        : "0 6px 0 oklch(0.28 0.10 155), 0 8px 16px oklch(0.18 0.07 155 / 0.35), inset 0 1px 0 oklch(0.75 0.12 155 / 0.3)",
      transform: pressed ? "translateY(4px)" : "translateY(0)",
      border: "1px solid oklch(0.35 0.10 155)",
    },
    secondary: {
      background: "oklch(0.94 0.02 80)",
      color: "oklch(0.22 0.06 155)",
      boxShadow: pressed
        ? "0 1px 2px oklch(0.22 0.06 155 / 0.3), inset 0 1px 3px oklch(0.22 0.06 155 / 0.15)"
        : "0 6px 0 oklch(0.78 0.04 80), 0 8px 16px oklch(0.22 0.06 155 / 0.20), inset 0 1px 0 oklch(1 0 0 / 0.8)",
      transform: pressed ? "translateY(4px)" : "translateY(0)",
      border: "1px solid oklch(0.82 0.04 80)",
    },
    ghost: {
      background: "oklch(0.94 0.02 80 / 0.12)",
      color: "oklch(0.97 0.01 90)",
      boxShadow: pressed
        ? "0 1px 2px oklch(0.18 0.07 155 / 0.3), inset 0 1px 3px oklch(0.18 0.07 155 / 0.2)"
        : "0 4px 0 oklch(0.12 0.05 155 / 0.6), 0 6px 12px oklch(0.18 0.07 155 / 0.3), inset 0 1px 0 oklch(1 0 0 / 0.15)",
      transform: pressed ? "translateY(3px)" : "translateY(0)",
      border: "1px solid oklch(0.94 0.02 80 / 0.25)",
    },
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      className={`inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-sm transition-all duration-100 select-none ${className}`}
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
        ...styles[variant],
      }}
    >
      {children}
    </button>
  );
}

// ── Carousel ──────────────────────────────────────────────────────────────────
function Carousel3D() {
  const [active, setActive] = useState(0);
  const [animDir, setAnimDir] = useState<"left" | "right" | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = (dir: "left" | "right") => {
    if (isAnimating) return;
    setAnimDir(dir);
    setIsAnimating(true);
    setTimeout(() => {
      setActive((prev) =>
        dir === "right"
          ? (prev + 1) % carouselSlides.length
          : (prev - 1 + carouselSlides.length) % carouselSlides.length
      );
      setIsAnimating(false);
      setAnimDir(null);
    }, 300);
  };

  // Auto-advance
  useEffect(() => {
    timerRef.current = setInterval(() => go("right"), 4500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [active]);

  const slide = carouselSlides[active];

  return (
    <div className="relative max-w-2xl mx-auto select-none">
      {/* Track with perspective */}
      <div style={{ perspective: "1200px" }}>
        <div
          className="rounded-3xl p-8 md:p-10 transition-all duration-300"
          style={{
            background: "oklch(0.98 0.01 90)",
            border: `2px solid ${slide.accent}`,
            boxShadow: `
              0 20px 40px oklch(0.22 0.06 155 / 0.15),
              0 8px 16px oklch(0.22 0.06 155 / 0.10),
              0 2px 4px oklch(0.22 0.06 155 / 0.08),
              inset 0 1px 0 oklch(1 0 0 / 0.9),
              inset 0 -2px 0 ${slide.accent}30
            `,
            transform: isAnimating
              ? animDir === "right"
                ? "rotateY(-8deg) translateX(-20px) scale(0.97)"
                : "rotateY(8deg) translateX(20px) scale(0.97)"
              : "rotateY(0deg) translateX(0) scale(1)",
            opacity: isAnimating ? 0.7 : 1,
          }}
        >
          {/* Icon */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
            style={{
              background: slide.accentLight,
              boxShadow: `0 4px 12px ${slide.accent}30, inset 0 1px 0 oklch(1 0 0 / 0.5)`,
              border: `1px solid ${slide.accent}40`,
            }}
          >
            <span style={{ color: slide.accent }}>{slide.icon}</span>
          </div>

          {/* Content */}
          <h3
            className="text-2xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.06 155)" }}
          >
            {slide.title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "oklch(0.40 0.04 80)" }}>
            {slide.desc}
          </p>

          {/* Slide counter */}
          <div className="flex items-center gap-2 mt-6">
            {carouselSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (i !== active && !isAnimating) {
                    setAnimDir(i > active ? "right" : "left");
                    setIsAnimating(true);
                    setTimeout(() => { setActive(i); setIsAnimating(false); setAnimDir(null); }, 300);
                  }
                }}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === active ? "24px" : "8px",
                  height: "8px",
                  background: i === active ? slide.accent : "oklch(0.80 0.03 80)",
                  boxShadow: i === active ? `0 2px 6px ${slide.accent}50` : "none",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => go("left")}
        className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-150 active:scale-95"
        style={{
          background: "oklch(0.98 0.01 90)",
          border: "1px solid oklch(0.85 0.03 80)",
          boxShadow: "0 4px 0 oklch(0.78 0.04 80), 0 6px 12px oklch(0.22 0.06 155 / 0.12), inset 0 1px 0 oklch(1 0 0 / 0.9)",
          color: "oklch(0.35 0.06 155)",
        }}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={() => go("right")}
        className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-150 active:scale-95"
        style={{
          background: "oklch(0.98 0.01 90)",
          border: "1px solid oklch(0.85 0.03 80)",
          boxShadow: "0 4px 0 oklch(0.78 0.04 80), 0 6px 12px oklch(0.22 0.06 155 / 0.12), inset 0 1px 0 oklch(1 0 0 / 0.9)",
          color: "oklch(0.35 0.06 155)",
        }}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

// ── 3D Input ──────────────────────────────────────────────────────────────────
function Input3D({
  type,
  placeholder,
  value,
  onChange,
  disabled,
  className = "",
}: {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={`transition-all duration-200 ${className}`}
      style={{
        background: focused ? "oklch(0.22 0.06 155 / 0.22)" : "oklch(0.96 0.01 85 / 0.15)",
        border: focused ? "1.5px solid oklch(0.75 0.14 155)" : "1.5px solid oklch(0.94 0.02 80 / 0.35)",
        color: "oklch(0.97 0.01 90)",
        borderRadius: "0.75rem",
        padding: "0.875rem 1rem",
        fontSize: "0.875rem",
        outline: "none",
        width: "100%",
        boxShadow: focused
          ? "0 0 0 3px oklch(0.55 0.14 155 / 0.25), inset 0 2px 6px oklch(0.12 0.05 155 / 0.4), inset 0 1px 3px oklch(0.12 0.05 155 / 0.3)"
          : "inset 0 2px 6px oklch(0.12 0.05 155 / 0.25), inset 0 1px 3px oklch(0.12 0.05 155 / 0.2)",
      }}
    />
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard3D({ stat, label, accent }: { stat: string; label: string; accent: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="p-6 rounded-2xl text-center transition-all duration-200 cursor-default"
      style={{
        background: "oklch(0.98 0.01 90)",
        border: `1px solid ${hovered ? accent : "oklch(0.88 0.03 80)"}`,
        boxShadow: hovered
          ? `0 16px 32px oklch(0.22 0.06 155 / 0.14), 0 4px 8px oklch(0.22 0.06 155 / 0.08), inset 0 1px 0 oklch(1 0 0 / 0.9), 0 0 0 1px ${accent}30`
          : "0 4px 12px oklch(0.22 0.06 155 / 0.07), 0 1px 3px oklch(0.22 0.06 155 / 0.05), inset 0 1px 0 oklch(1 0 0 / 0.8)",
        transform: hovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
      }}
    >
      <div className="text-3xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: accent }}>
        {stat}
      </div>
      <p className="text-sm leading-relaxed" style={{ color: "oklch(0.42 0.04 80)" }}>
        {label}
      </p>
    </div>
  );
}

// ── Who-It's-For Card ─────────────────────────────────────────────────────────
function WhoCard3D({ icon, title, desc, accent }: { icon: React.ReactNode; title: string; desc: string; accent: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="p-7 rounded-2xl transition-all duration-200 cursor-default"
      style={{
        background: "oklch(0.98 0.01 90)",
        border: `1px solid ${hovered ? accent : "oklch(0.88 0.03 80)"}`,
        boxShadow: hovered
          ? `0 20px 40px oklch(0.22 0.06 155 / 0.14), 0 6px 12px oklch(0.22 0.06 155 / 0.08), inset 0 1px 0 oklch(1 0 0 / 0.9)`
          : "0 4px 12px oklch(0.22 0.06 155 / 0.07), 0 1px 3px oklch(0.22 0.06 155 / 0.05), inset 0 1px 0 oklch(1 0 0 / 0.8)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-200"
        style={{
          background: `${accent}18`,
          boxShadow: hovered ? `0 4px 12px ${accent}30, inset 0 1px 0 oklch(1 0 0 / 0.5)` : "inset 0 1px 0 oklch(1 0 0 / 0.4)",
          border: `1px solid ${accent}25`,
        }}
      >
        <span style={{ color: accent }}>{icon}</span>
      </div>
      <h3 className="font-bold text-lg mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.06 155)" }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "oklch(0.42 0.04 80)" }}>
        {desc}
      </p>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function WaitlistPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setErrorMsg("Please fill in all fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    setErrorMsg("");
    setStatus("loading");
    try {
      await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          timestamp: new Date().toISOString(),
          source: "menova-waitlist",
        }),
      });
      setStatus("success");
      setFirstName("");
      setLastName("");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen font-sans" style={{ background: "oklch(0.98 0.01 90)", color: "oklch(0.22 0.06 155)" }}>

      {/* ── SEO meta ── */}
      {typeof document !== "undefined" && (() => {
        document.title = "Menopause Specialist Vancouver BC | Virtual Menopause Clinic";
        return null;
      })()}

      {/* ── Header ── */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 max-w-6xl mx-auto"
        style={{ background: "oklch(0.98 0.01 90 / 0.95)", backdropFilter: "blur(12px)", borderRadius: "0px", borderStyle: "none" }}
      >
        <a href="/" className="flex items-center gap-2" style={{ textDecoration: "none" }}>
          <Leaf className="w-6 h-6" style={{ color: "oklch(0.40 0.10 155)" }} />
          <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.06 155)" }}>
            MeNova Health
          </span>
        </a>
        <span
          className="text-xs font-semibold px-3 py-1.5 rounded-full"
          style={{
            background: "oklch(0.22 0.06 155)",
            color: "oklch(0.94 0.02 80)",
            boxShadow: "0 3px 0 oklch(0.12 0.04 155), 0 4px 8px oklch(0.22 0.06 155 / 0.25)",
          }}
        >
          Coming Soon · BC
        </span>
      </header>

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, oklch(0.18 0.07 155) 0%, oklch(0.24 0.08 155) 60%, oklch(0.30 0.06 42) 100%)", minHeight: "92vh" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})`, opacity: 0.10 }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 flex flex-col lg:flex-row items-center gap-12">
          {/* Left: Text + Form */}
          <div className="flex-1 max-w-xl">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
              style={{
                background: "oklch(0.94 0.02 80 / 0.12)",
                color: "oklch(0.88 0.04 80)",
                border: "1px solid oklch(0.94 0.02 80 / 0.25)",
                boxShadow: "0 2px 8px oklch(0.12 0.05 155 / 0.3), inset 0 1px 0 oklch(1 0 0 / 0.1)",
              }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "oklch(0.75 0.12 155)" }} />
              Launching Soon in British Columbia
            </div>

            {/* H1 */}
            <h1
              className="text-4xl lg:text-5xl font-bold leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.97 0.01 90)" }}
            >
              Menopause Care,{" "}
              <span style={{ color: "oklch(0.75 0.14 155)" }}>Finally on Your Terms</span>
            </h1>

            <p className="text-base lg:text-lg leading-relaxed mb-4" style={{ color: "oklch(0.82 0.04 90)" }}>
              MeNova Health is a BC‑based virtual menopause clinic. We connect you with BC‑licensed Nurse Practitioners who specialize in menopause and perimenopause treatment, menopausal hormone therapy (HRT) and Bioidentical Hormone Replacement Therapy (BHRT) — all by secure video from home, no referral needed.
            </p>

            <p className="text-sm italic mb-4" style={{ color: "oklch(0.68 0.04 90)" }}>
              We're preparing to launch virtual menopause care across BC. Join the early access list and be the first to know when we go live.
            </p>

            {/* Early-bird offer */}
            <div
              className="flex items-start gap-3 px-4 py-3 rounded-xl mb-6"
              style={{
                background: "oklch(0.60 0.12 42 / 0.18)",
                border: "1px solid oklch(0.60 0.12 42 / 0.40)",
                boxShadow: "0 4px 12px oklch(0.60 0.12 42 / 0.15), inset 0 1px 0 oklch(1 0 0 / 0.08)",
              }}
            >
              <span className="text-lg shrink-0">🎁</span>
              <p className="text-sm font-medium" style={{ color: "oklch(0.92 0.05 80)" }}>
                <strong>Early access bonus:</strong> Get 15% off your first virtual menopause visit — limited to the first 40 women on our BC waitlist.
              </p>
            </div>

            {/* ── 3D Form ── */}
            {status === "success" ? (
              <div
                className="flex flex-col items-center gap-4 p-8 rounded-2xl text-center"
                style={{
                  background: "oklch(0.94 0.02 80 / 0.12)",
                  border: "1px solid oklch(0.75 0.12 155 / 0.50)",
                  boxShadow: "0 8px 24px oklch(0.12 0.05 155 / 0.3), inset 0 1px 0 oklch(1 0 0 / 0.1)",
                }}
              >
                <CheckCircle2 className="w-12 h-12" style={{ color: "oklch(0.75 0.14 155)" }} />
                <h3 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.97 0.01 90)" }}>
                  You're on the list!
                </h3>
                <p style={{ color: "oklch(0.82 0.04 90)" }}>
                  Thank you for joining. You'll get a short welcome email and be notified as soon as we open our booking calendar.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 p-6 rounded-2xl"
                style={{
                  background: "oklch(0.18 0.06 155 / 0.35)",
                  border: "1px solid oklch(0.94 0.02 80 / 0.18)",
                  boxShadow: "0 12px 32px oklch(0.12 0.05 155 / 0.4), 0 4px 8px oklch(0.12 0.05 155 / 0.3), inset 0 1px 0 oklch(1 0 0 / 0.08), inset 0 -1px 0 oklch(0.12 0.05 155 / 0.3)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div className="flex gap-3">
                  <Input3D
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={status === "loading"}
                    className="flex-1"
                  />
                  <Input3D
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={status === "loading"}
                    className="flex-1"
                  />
                </div>
                <Input3D
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                />
                {errorMsg && (
                  <p className="text-xs font-medium" style={{ color: "oklch(0.75 0.18 42)" }}>
                    {errorMsg}
                  </p>
                )}
                <Button3D type="submit" disabled={status === "loading"} variant="primary" className="w-full mt-1">
                  {status === "loading" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Joining...
                    </>
                  ) : (
                    <>
                      Join the Early Access List
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button3D>
                <p className="text-xs text-center" style={{ color: "oklch(0.68 0.04 90)" }}>
                  No spam. We'll only email you about your launch invitation and care options. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>

          {/* Right: Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div
              className="relative w-80 h-[420px] rounded-3xl overflow-hidden"
              style={{
                border: "1px solid oklch(0.94 0.02 80 / 0.20)",
                boxShadow: "0 24px 48px oklch(0.12 0.05 155 / 0.5), 0 8px 16px oklch(0.12 0.05 155 / 0.3), inset 0 1px 0 oklch(1 0 0 / 0.15)",
                transform: "perspective(800px) rotateY(-4deg) rotateX(2deg)",
              }}
            >
              <img src={WOMAN_HERO} alt="MeNova Health — virtual menopause care" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, oklch(0.18 0.07 155) 0%, transparent 55%)" }} />
              <div
                className="absolute bottom-6 left-4 right-4 px-4 py-3 rounded-xl"
                style={{
                  background: "oklch(0.18 0.07 155 / 0.85)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid oklch(0.75 0.12 155 / 0.30)",
                  boxShadow: "0 4px 12px oklch(0.12 0.05 155 / 0.4), inset 0 1px 0 oklch(1 0 0 / 0.08)",
                }}
              >
                <p className="text-xs font-semibold" style={{ color: "oklch(0.75 0.14 155)" }}>BC-Licensed Nurse Practitioners</p>
                <p className="text-xs mt-0.5" style={{ color: "oklch(0.82 0.04 90)" }}>Specialized in menopause & BHRT</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What is MeNova Health? ── */}
      <section className="py-20 px-6" style={{ background: "oklch(0.97 0.01 85)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.06 155)" }}>
              What Is MeNova Health?
            </h2>
            <div className="w-16 h-1 mx-auto rounded-full" style={{ background: "oklch(0.60 0.12 42)" }} />
          </div>
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="flex-1">
              <p className="text-base leading-relaxed mb-4" style={{ color: "oklch(0.35 0.04 80)" }}>
                MeNova Health is a virtual menopause clinic in Vancouver, British Columbia, built for women across BC. We focus exclusively on perimenopause and menopause, so you're never dismissed or told "it's just your age."
              </p>
              <p className="text-base leading-relaxed mb-4" style={{ color: "oklch(0.35 0.04 80)" }}>
                Our BC‑licensed Nurse Practitioners provide comprehensive menopause and perimenopause care, including symptom assessment, lab work, lifestyle support and evidence‑based hormone replacement therapy (including BHRT when appropriate) — all from the comfort of your home, on your schedule.
              </p>
              <p className="text-base font-semibold" style={{ color: "oklch(0.30 0.08 155)" }}>
                No long waits. No referrals. No judgment. Just specialized menopause care, personalized to you.
              </p>
            </div>
            <div
              className="flex-shrink-0 w-64 h-72 rounded-2xl overflow-hidden"
              style={{
                boxShadow: "0 16px 32px oklch(0.22 0.06 155 / 0.14), 0 4px 8px oklch(0.22 0.06 155 / 0.08), inset 0 1px 0 oklch(1 0 0 / 0.5)",
                transform: "perspective(800px) rotateY(3deg) rotateX(-1deg)",
                border: "1px solid oklch(0.88 0.03 80)",
              }}
            >
              <img src={WOMAN_OUTDOOR} alt="Virtual menopause care BC" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Who It's For — 3D Cards ── */}
      <section className="py-20 px-6" style={{ background: "oklch(0.94 0.02 80)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.06 155)" }}>
              Who It's For
            </h2>
            <div className="w-16 h-1 mx-auto rounded-full" style={{ background: "oklch(0.60 0.12 42)" }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Heart className="w-7 h-7" />,
                title: "Women in Perimenopause",
                desc: "Experiencing irregular periods, mood changes, sleep problems or early perimenopause symptoms? Our NPs provide perimenopause assessments and treatment plans so you can navigate this transition with clear answers and expert guidance.",
                accent: "oklch(0.60 0.12 42)",
              },
              {
                icon: <Leaf className="w-7 h-7" />,
                title: "Women in Menopause",
                desc: "Dealing with hot flashes, night sweats, low libido, brain fog or weight changes? Our menopause specialists create personalized BHRT and non‑hormonal treatment plans to relieve symptoms and restore your quality of life.",
                accent: "oklch(0.40 0.10 155)",
              },
              {
                icon: <Clock className="w-7 h-7" />,
                title: "Women Tired of Waiting",
                desc: "Frustrated by 6‑ to 12‑month wait times to see a menopause specialist or have your hormone concerns taken seriously? With MeNova Health, you can see a virtual menopause Nurse Practitioner in weeks, not months — no referral required.",
                accent: "oklch(0.50 0.08 155)",
              },
            ].map((item, i) => (
              <WhoCard3D key={i} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why It Matters — 3D Stat Cards ── */}
      <section className="py-20 px-6" style={{ background: "oklch(0.97 0.01 85)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.06 155)" }}>
              Why It Matters
            </h2>
            <div className="w-16 h-1 mx-auto rounded-full mb-4" style={{ background: "oklch(0.60 0.12 42)" }} />
            <p className="text-base max-w-2xl mx-auto" style={{ color: "oklch(0.42 0.04 80)" }}>
              Menopause symptoms are common — but getting timely, respectful care in BC shouldn't be this hard.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {[
              { stat: "1 in 2", label: "women experience moderate to severe menopause symptoms that affect daily life.", accent: "oklch(0.60 0.12 42)" },
              { stat: "6+ months", label: "is the average wait time to see a menopause specialist in many parts of BC.", accent: "oklch(0.40 0.10 155)" },
              { stat: "75%", label: "of women say their menopause symptoms have been dismissed or downplayed by a provider.", accent: "oklch(0.50 0.08 155)" },
              { stat: "0 referrals", label: "needed with MeNova — you can self‑refer and book directly with a menopause‑trained NP.", accent: "oklch(0.60 0.12 42)" },
            ].map((item, i) => (
              <StatCard3D key={i} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Who It's For — 3D Carousel ── */}
      <section className="py-20 px-8" style={{ background: "oklch(0.94 0.02 80)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.06 155)" }}>
              Is MeNova Right for You?
            </h2>
            <div className="w-16 h-1 mx-auto rounded-full mb-4" style={{ background: "oklch(0.60 0.12 42)" }} />
            <p className="text-sm" style={{ color: "oklch(0.45 0.04 80)" }}>Swipe through to see who we help</p>
          </div>
          <Carousel3D />
        </div>
      </section>

      {/* ── Mini FAQ ── */}
      <section className="py-20 px-6" style={{ background: "oklch(0.97 0.01 85)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.06 155)" }}>
              Questions About Virtual Menopause Care?
            </h2>
            <div className="w-16 h-1 mx-auto rounded-full" style={{ background: "oklch(0.60 0.12 42)" }} />
          </div>
          <div className="flex flex-col gap-3">
            {faqItems.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section
        className="py-24 px-6 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, oklch(0.18 0.07 155) 0%, oklch(0.24 0.08 155) 60%, oklch(0.30 0.06 42) 100%)" }}
      >
        <div className="max-w-2xl mx-auto relative z-10">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{
              background: "oklch(0.94 0.02 80 / 0.12)",
              boxShadow: "0 6px 0 oklch(0.12 0.05 155 / 0.5), 0 8px 16px oklch(0.12 0.05 155 / 0.3), inset 0 1px 0 oklch(1 0 0 / 0.12)",
              border: "1px solid oklch(0.94 0.02 80 / 0.20)",
            }}
          >
            <Shield className="w-7 h-7" style={{ color: "oklch(0.75 0.14 155)" }} />
          </div>
          <h2
            className="text-3xl lg:text-4xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.97 0.01 90)" }}
          >
            Be First in Line for Virtual Menopause Care in BC
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "oklch(0.82 0.04 90)" }}>
            We're putting the finishing touches on MeNova Health, BC's first dedicated virtual menopause clinic. Join the early access list to be among the first women invited to book a visit with a menopause‑trained Nurse Practitioner.
          </p>
          <p className="text-sm font-semibold mb-8" style={{ color: "oklch(0.75 0.14 155)" }}>
            🎁 Early access members receive 15% off their first virtual menopause appointment and priority access to limited launch‑day spots.
          </p>
          <Button3D
            variant="secondary"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-8 py-4 rounded-full"
          >
            Join the Waitlist
            <ArrowRight className="w-4 h-4" />
          </Button3D>
          <p className="text-xs mt-4" style={{ color: "oklch(0.65 0.04 90)" }}>
            You'll get a short welcome email and be notified as soon as we open our booking calendar.
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="py-8 px-6 text-center text-sm"
        style={{ background: "oklch(0.14 0.05 155)", borderTop: "1px solid oklch(0.25 0.06 155)", color: "oklch(0.55 0.04 90)" }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Leaf className="w-4 h-4" style={{ color: "oklch(0.55 0.12 155)" }} />
          <span style={{ color: "oklch(0.82 0.04 90)", fontWeight: 600 }}>MeNova Health</span>
        </div>
        <p>© {new Date().getFullYear()} MeNova Health. All rights reserved. · Vancouver, BC, Canada</p>
        <p className="mt-1">Virtual menopause care for women across British Columbia.</p>
      </footer>
    </div>
  );
}
