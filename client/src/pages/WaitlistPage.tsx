/**
 * MeNova Health — Soft Launch Waitlist Page (TEMPORARY)
 * To switch back to the full website, update App.tsx route "/" to Home component.
 * This page connects to Make.com webhook to collect waitlist signups.
 */

import { useState } from "react";
import { Leaf, Heart, Shield, Clock, CheckCircle2, ArrowRight, ChevronDown } from "lucide-react";

const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/ygbmyty71u7pahms7m7owjvcxpf22v68";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663515887063/Mbboc9yaua4MvveQ5gebGn/menova-hero-bg-jRKC2iNt3D4DtGerP5ykiZ.webp";
const WOMAN_HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663515887063/Mbboc9yaua4MvveQ5gebGn/menova-woman-hero-TdGCoZDVuHwERKBpG5xxdo.webp";
const WOMAN_OUTDOOR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663515887063/Mbboc9yaua4MvveQ5gebGn/menova-woman-outdoor-DmRovSNgWvgd9QDKqkUgts.webp";

// ── Colours (matching homepage palette) ──────────────────────────────────────
// Forest green dark:  oklch(0.18 0.06 155)
// Cream light:        oklch(0.98 0.01 90)
// Terracotta accent:  oklch(0.60 0.12 42)
// Sage mid:           oklch(0.50 0.08 155)
// Warm off-white:     oklch(0.94 0.02 80)

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

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden cursor-pointer"
      style={{ background: "oklch(0.97 0.01 85)", border: "1px solid oklch(0.88 0.03 80)" }}
      onClick={() => setOpen((o) => !o)}
    >
      <div className="flex items-center justify-between px-6 py-4 gap-4">
        <span className="font-semibold text-sm" style={{ color: "oklch(0.22 0.06 155)" }}>{q}</span>
        <ChevronDown
          className="w-4 h-4 shrink-0 transition-transform"
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

  const inputStyle: React.CSSProperties = {
    background: "oklch(0.96 0.01 85)",
    border: "1.5px solid oklch(0.85 0.04 80)",
    color: "oklch(0.22 0.06 155)",
    borderRadius: "0.75rem",
    padding: "0.875rem 1rem",
    fontSize: "0.875rem",
    outline: "none",
    width: "100%",
  };

  return (
    <div className="min-h-screen font-sans" style={{ background: "oklch(0.98 0.01 90)", color: "oklch(0.22 0.06 155)" }}>

      {/* ── SEO meta via document title ── */}
      {typeof document !== "undefined" && (() => {
        document.title = "Menopause Specialist Vancouver BC | Virtual Menopause Clinic";
        return null;
      })()}

      {/* ── Header ── */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 max-w-6xl mx-auto"
        style={{ background: "oklch(0.98 0.01 90 / 0.95)", backdropFilter: "blur(12px)" }}
      >
        <div className="flex items-center gap-2">
          <Leaf className="w-6 h-6" style={{ color: "oklch(0.40 0.10 155)" }} />
          <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.06 155)" }}>
            MeNova Health
          </span>
        </div>
        <span
          className="text-xs font-semibold px-3 py-1.5 rounded-full"
          style={{ background: "oklch(0.22 0.06 155)", color: "oklch(0.94 0.02 80)" }}
        >
          Coming Soon · BC
        </span>
      </header>

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, oklch(0.18 0.07 155) 0%, oklch(0.24 0.08 155) 60%, oklch(0.30 0.06 42) 100%)", minHeight: "92vh" }}
      >
        {/* Subtle background texture */}
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
              style={{ background: "oklch(0.94 0.02 80 / 0.12)", color: "oklch(0.88 0.04 80)", border: "1px solid oklch(0.94 0.02 80 / 0.25)" }}
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

            {/* Hero paragraph */}
            <p className="text-base lg:text-lg leading-relaxed mb-4" style={{ color: "oklch(0.82 0.04 90)" }}>
              MeNova Health is a BC‑based virtual menopause clinic. We connect you with BC‑licensed Nurse Practitioners who specialize in menopause and perimenopause treatment, menopausal hormone therapy (HRT) and Bioidentical Hormone Replacement Therapy (BHRT) — all by secure video from home, no referral needed.
            </p>

            {/* Sub-line */}
            <p className="text-sm italic mb-4" style={{ color: "oklch(0.68 0.04 90)" }}>
              We're preparing to launch virtual menopause care across BC. Join the early access list and be the first to know when we go live.
            </p>

            {/* Early-bird offer */}
            <div
              className="flex items-start gap-3 px-4 py-3 rounded-xl mb-6"
              style={{ background: "oklch(0.60 0.12 42 / 0.18)", border: "1px solid oklch(0.60 0.12 42 / 0.40)" }}
            >
              <span className="text-lg shrink-0">🎁</span>
              <p className="text-sm font-medium" style={{ color: "oklch(0.92 0.05 80)" }}>
                <strong>Early access bonus:</strong> Get 15% off your first virtual menopause visit — limited to the first 40 women on our BC waitlist.
              </p>
            </div>

            {/* Form */}
            {status === "success" ? (
              <div
                className="flex flex-col items-center gap-4 p-8 rounded-2xl text-center"
                style={{ background: "oklch(0.94 0.02 80 / 0.12)", border: "1px solid oklch(0.75 0.12 155 / 0.50)" }}
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
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={{ ...inputStyle, background: "oklch(0.96 0.01 85 / 0.15)", border: "1.5px solid oklch(0.94 0.02 80 / 0.35)", color: "oklch(0.97 0.01 90)" }}
                    className="flex-1"
                    disabled={status === "loading"}
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    style={{ ...inputStyle, background: "oklch(0.96 0.01 85 / 0.15)", border: "1.5px solid oklch(0.94 0.02 80 / 0.35)", color: "oklch(0.97 0.01 90)" }}
                    className="flex-1"
                    disabled={status === "loading"}
                  />
                </div>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ ...inputStyle, background: "oklch(0.96 0.01 85 / 0.15)", border: "1.5px solid oklch(0.94 0.02 80 / 0.35)", color: "oklch(0.97 0.01 90)" }}
                  disabled={status === "loading"}
                />
                {errorMsg && (
                  <p className="text-sm" style={{ color: "oklch(0.75 0.18 25)" }}>{errorMsg}</p>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-sm transition-all"
                  style={{
                    background: status === "loading" ? "oklch(0.45 0.10 155)" : "oklch(0.55 0.14 155)",
                    color: "oklch(0.97 0.01 90)",
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                  }}
                >
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
                </button>
                <p className="text-xs text-center" style={{ color: "oklch(0.68 0.04 90)" }}>
                  No spam. We'll only email you about your launch invitation and care options. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>

          {/* Right: Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div
              className="relative w-80 h-[420px] rounded-3xl overflow-hidden shadow-2xl"
              style={{ border: "1px solid oklch(0.94 0.02 80 / 0.20)" }}
            >
              <img src={WOMAN_HERO} alt="MeNova Health — virtual menopause care" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, oklch(0.18 0.07 155) 0%, transparent 55%)" }} />
              {/* Floating badge on image */}
              <div
                className="absolute bottom-6 left-4 right-4 px-4 py-3 rounded-xl"
                style={{ background: "oklch(0.18 0.07 155 / 0.85)", backdropFilter: "blur(8px)", border: "1px solid oklch(0.75 0.12 155 / 0.30)" }}
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
            <div className="flex-shrink-0 w-64 h-72 rounded-2xl overflow-hidden shadow-lg">
              <img src={WOMAN_OUTDOOR} alt="Virtual menopause care BC" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Who It's For ── */}
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
              <div
                key={i}
                className="p-7 rounded-2xl shadow-sm"
                style={{ background: "oklch(0.98 0.01 90)", border: "1px solid oklch(0.88 0.03 80)" }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${item.accent}18` }}>
                  <span style={{ color: item.accent }}>{item.icon}</span>
                </div>
                <h3 className="font-bold text-lg mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.06 155)" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "oklch(0.42 0.04 80)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why It Matters ── */}
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
              <div
                key={i}
                className="p-6 rounded-2xl text-center shadow-sm"
                style={{ background: "oklch(0.98 0.01 90)", border: "1px solid oklch(0.88 0.03 80)" }}
              >
                <div className="text-3xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: item.accent }}>
                  {item.stat}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "oklch(0.42 0.04 80)" }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mini FAQ ── */}
      <section className="py-20 px-6" style={{ background: "oklch(0.94 0.02 80)" }}>
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
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: "oklch(0.94 0.02 80 / 0.12)" }}>
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
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm transition-all shadow-lg"
            style={{ background: "oklch(0.94 0.02 80)", color: "oklch(0.22 0.06 155)" }}
          >
            Join the Waitlist
            <ArrowRight className="w-4 h-4" />
          </button>
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
