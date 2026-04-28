/**
 * MeNova Health — Soft Launch Waitlist Page (TEMPORARY)
 * This page is shown while the full website is being prepared for launch.
 * To switch back to the full website, update App.tsx route "/" to Home component.
 * This page connects to Make.com webhook to collect waitlist signups.
 */

import { useState } from "react";
import { Leaf, Heart, Shield, Clock, CheckCircle2, ArrowRight } from "lucide-react";

const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/ygbmyty71u7pahms7m7owjvcxpf22v68";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663515887063/Mbboc9yaua4MvveQ5gebGn/menova-hero-bg-jRKC2iNt3D4DtGerP5ykiZ.webp";
const WOMAN_HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663515887063/Mbboc9yaua4MvveQ5gebGn/menova-woman-hero-TdGCoZDVuHwERKBpG5xxdo.webp";

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
    <div
      className="min-h-screen font-sans"
      style={{ background: "oklch(0.12 0.04 155)", color: "oklch(0.97 0.01 90)" }}
    >
      {/* ── Header ── */}
      <header className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <Leaf className="w-6 h-6" style={{ color: "oklch(0.65 0.15 155)" }} />
          <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            MeNova Health
          </span>
        </div>
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full border"
          style={{ borderColor: "oklch(0.65 0.15 155)", color: "oklch(0.65 0.15 155)" }}
        >
          Coming Soon · BC
        </span>
      </header>

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "90vh" }}
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})`, opacity: 0.18 }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, oklch(0.12 0.04 155) 40%, oklch(0.18 0.06 155) 100%)" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 flex flex-col lg:flex-row items-center gap-12">
          {/* Left: Text + Form */}
          <div className="flex-1 max-w-xl">
            {/* Launching Soon Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
              style={{ background: "oklch(0.22 0.06 155)", color: "oklch(0.75 0.12 155)" }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "oklch(0.65 0.15 155)" }} />
              Launching Soon in BC
            </div>

            {/* Headline */}
            <h1
              className="text-4xl lg:text-5xl font-bold leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.97 0.01 90)" }}
            >
              Menopause Care,{" "}
              <span style={{ color: "oklch(0.65 0.15 155)" }}>Finally on Your Terms</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg mb-4" style={{ color: "oklch(0.78 0.04 90)" }}>
              MeNova Health is BC's first virtual menopause clinic — bringing personalized BHRT and expert care directly to you, no referral needed.
            </p>

            <p className="text-sm mb-8 italic" style={{ color: "oklch(0.60 0.04 90)" }}>
              We're preparing to launch virtual menopause care across BC. Join the early access list and be the first to know when we go live.
            </p>

            {/* Waitlist Form */}
            {status === "success" ? (
              <div
                className="flex flex-col items-center gap-4 p-8 rounded-2xl text-center"
                style={{ background: "oklch(0.18 0.06 155)", border: "1px solid oklch(0.65 0.15 155)" }}
              >
                <CheckCircle2 className="w-12 h-12" style={{ color: "oklch(0.65 0.15 155)" }} />
                <h3 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                  You're on the list!
                </h3>
                <p style={{ color: "oklch(0.78 0.04 90)" }}>
                  Thank you for joining. We'll email you as soon as we launch in BC.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
                    style={{
                      background: "oklch(0.20 0.05 155)",
                      border: "1px solid oklch(0.30 0.06 155)",
                      color: "oklch(0.97 0.01 90)",
                    }}
                    disabled={status === "loading"}
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
                    style={{
                      background: "oklch(0.20 0.05 155)",
                      border: "1px solid oklch(0.30 0.06 155)",
                      color: "oklch(0.97 0.01 90)",
                    }}
                    disabled={status === "loading"}
                  />
                </div>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-3 rounded-xl text-sm outline-none"
                  style={{
                    background: "oklch(0.20 0.05 155)",
                    border: "1px solid oklch(0.30 0.06 155)",
                    color: "oklch(0.97 0.01 90)",
                  }}
                  disabled={status === "loading"}
                />
                {errorMsg && (
                  <p className="text-sm" style={{ color: "oklch(0.65 0.18 25)" }}>
                    {errorMsg}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-sm transition-all"
                  style={{
                    background: status === "loading" ? "oklch(0.45 0.12 155)" : "oklch(0.55 0.15 155)",
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
                <p className="text-xs text-center" style={{ color: "oklch(0.55 0.04 90)" }}>
                  No spam. We'll only email you when we launch. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>

          {/* Right: Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div
              className="relative w-80 h-96 rounded-3xl overflow-hidden"
              style={{ border: "1px solid oklch(0.30 0.06 155)" }}
            >
              <img
                src={WOMAN_HERO}
                alt="MeNova Health"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, oklch(0.12 0.04 155) 0%, transparent 50%)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── What is MeNova ── */}
      <section className="py-20 px-6" style={{ background: "oklch(0.14 0.05 155)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl font-bold mb-6"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.97 0.01 90)" }}
          >
            What is MeNova Health?
          </h2>
          <p className="text-lg leading-relaxed mb-4" style={{ color: "oklch(0.78 0.04 90)" }}>
            MeNova Health is a virtual menopause clinic built for women in British Columbia. We connect you with licensed Nurse Practitioners who specialize in menopause and Bioidentical Hormone Replacement Therapy (BHRT) — all from the comfort of your home.
          </p>
          <p className="text-lg leading-relaxed" style={{ color: "oklch(0.78 0.04 90)" }}>
            No long waits. No referrals. No judgment. Just expert care, personalized to you.
          </p>
        </div>
      </section>

      {/* ── Who It's For ── */}
      <section className="py-20 px-6" style={{ background: "oklch(0.12 0.04 155)" }}>
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-3xl font-bold text-center mb-12"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.97 0.01 90)" }}
          >
            Who It's For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Women in Perimenopause",
                desc: "Experiencing irregular periods, mood changes, or early symptoms? We help you navigate the transition with expert guidance.",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Women in Menopause",
                desc: "Dealing with hot flashes, sleep issues, or brain fog? Our NPs create personalized BHRT plans to restore your quality of life.",
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Women Tired of Waiting",
                desc: "Frustrated by 6-month wait times and dismissive doctors? MeNova gets you seen quickly, with care that actually listens.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl"
                style={{ background: "oklch(0.17 0.05 155)", border: "1px solid oklch(0.25 0.06 155)" }}
              >
                <div className="mb-4" style={{ color: "oklch(0.65 0.15 155)" }}>{item.icon}</div>
                <h3 className="font-bold text-lg mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "oklch(0.72 0.04 90)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why It Matters ── */}
      <section className="py-20 px-6" style={{ background: "oklch(0.14 0.05 155)" }}>
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl font-bold text-center mb-12"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.97 0.01 90)" }}
          >
            Why It Matters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { stat: "1 in 2", label: "women experience severe menopause symptoms that impact daily life" },
              { stat: "6+ months", label: "average wait time to see a specialist in BC" },
              { stat: "75%", label: "of women say their symptoms are dismissed by their doctor" },
              { stat: "0 referrals", label: "needed with MeNova — book directly with a specialist" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-6 rounded-2xl"
                style={{ background: "oklch(0.17 0.05 155)", border: "1px solid oklch(0.25 0.06 155)" }}
              >
                <span
                  className="text-3xl font-bold shrink-0"
                  style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.65 0.15 155)" }}
                >
                  {item.stat}
                </span>
                <p className="text-sm leading-relaxed pt-1" style={{ color: "oklch(0.78 0.04 90)" }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-20 px-6 text-center" style={{ background: "oklch(0.12 0.04 155)" }}>
        <div className="max-w-2xl mx-auto">
          <Leaf className="w-10 h-10 mx-auto mb-6" style={{ color: "oklch(0.65 0.15 155)" }} />
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.97 0.01 90)" }}
          >
            Be First in Line
          </h2>
          <p className="text-lg mb-2" style={{ color: "oklch(0.78 0.04 90)" }}>
            We're preparing to launch virtual menopause care across BC.
          </p>
          <p className="text-base mb-8" style={{ color: "oklch(0.60 0.04 90)" }}>
            Join the early access list and be the first to know when we go live.
          </p>
          <a
            href="#top"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm transition-all"
            style={{ background: "oklch(0.55 0.15 155)", color: "oklch(0.97 0.01 90)" }}
          >
            Join the Waitlist
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="py-8 px-6 text-center text-sm"
        style={{ borderTop: "1px solid oklch(0.22 0.05 155)", color: "oklch(0.50 0.04 90)" }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Leaf className="w-4 h-4" style={{ color: "oklch(0.55 0.12 155)" }} />
          <span>MeNova Health</span>
        </div>
        <p>© {new Date().getFullYear()} MeNova Health. All rights reserved. · Vancouver, BC, Canada</p>
        <p className="mt-1">Virtual menopause care for women across British Columbia.</p>
      </footer>
    </div>
  );
}
