import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Heart, CheckCircle2, RefreshCw, AlertCircle, Mail } from "lucide-react";

const SECTIONS = [
  {
    icon: Heart,
    title: "Commitment to Accessibility",
    content: (
      <>
        <p className="mb-4">
          Menova Health is committed to making its website and services accessible to as many people as possible. The goal
          is to provide a website that is usable, understandable, and compatible with assistive technologies.
        </p>
        <p>
          The website aims to follow recognized accessibility best practices so that people can navigate it using a
          keyboard, screen reader, voice tools, magnification software, and other assistive technologies. British
          Columbia's Accessible B.C. Act is intended to identify, remove, and prevent barriers to participation, which
          supports the importance of ongoing accessibility work.
        </p>
      </>
    ),
  },
  {
    icon: CheckCircle2,
    title: "Accessibility Features",
    content: (
      <>
        <p className="mb-4">The website aims to include:</p>
        <ul className="space-y-2">
          {[
            "Clear headings and page structure",
            "Sufficient color contrast",
            "Keyboard-friendly navigation",
            "Descriptive link text and form labels",
            "Responsive layouts across devices",
            "Alternative text for meaningful images where appropriate",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "oklch(0.60 0.12 42)" }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    icon: RefreshCw,
    title: "Ongoing Improvement",
    content: (
      <p>
        Accessibility is treated as an ongoing process. Website content and features may be reviewed regularly, and
        improvements may be made over time as standards, tools, and user needs evolve.
      </p>
    ),
  },
  {
    icon: AlertCircle,
    title: "Known Limitations",
    content: (
      <p>
        Some parts of the website or some third-party tools may not yet be fully accessible. Efforts may be made to
        identify and address barriers where feasible.
      </p>
    ),
  },
  {
    icon: Mail,
    title: "Feedback",
    content: (
      <p>
        Anyone who encounters an accessibility barrier or needs information in an alternative format may contact Menova
        Health at{" "}
        <a
          href="mailto:support.menova@gmail.com"
          className="font-semibold underline underline-offset-2"
          style={{ color: "oklch(0.60 0.12 42)" }}
        >
          support.menova@gmail.com
        </a>
        .
      </p>
    ),
  },
];

export default function Accessibility() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "oklch(0.97 0.015 90)" }}>
      {/* Hero Header */}
      <header style={{ backgroundColor: "oklch(0.18 0.07 155)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link href="/">
            <button
              className="flex items-center gap-2 mb-8 text-sm font-medium transition-opacity hover:opacity-70"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.75)" }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to MeNova Health
            </button>
          </Link>
          <div className="flex items-center gap-4 mb-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "oklch(0.60 0.12 42 / 0.25)" }}
            >
              <Heart className="w-5 h-5" style={{ color: "oklch(0.75 0.10 42)" }} />
            </div>
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.75 0.10 42)" }}
            >
              Accessibility
            </span>
          </div>
          <h1
            className="text-4xl lg:text-5xl font-bold text-white mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Accessibility Statement
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.60)", fontSize: "0.875rem" }}>
            Last updated: April 12, 2026
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {SECTIONS.map(({ icon: Icon, title, content }, i) => (
            <div
              key={i}
              className="rounded-2xl p-7 lg:p-8"
              style={{
                backgroundColor: "white",
                border: "1.5px solid oklch(0.91 0.01 90)",
                boxShadow: "0 2px 12px oklch(0.18 0.07 155 / 0.06)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "oklch(0.24 0.07 155 / 0.08)" }}
                >
                  <Icon className="w-4 h-4" style={{ color: "oklch(0.24 0.07 155)" }} />
                </div>
                <h2
                  className="text-xl font-bold"
                  style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.005 65)" }}
                >
                  {title}
                </h2>
              </div>
              <div
                style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.40 0.005 65)", lineHeight: "1.75" }}
              >
                {content}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer
        className="py-8 mt-8 border-t"
        style={{ backgroundColor: "white", borderColor: "oklch(0.91 0.01 90)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.55 0.005 65)", fontSize: "0.875rem" }}>
            © 2026 MeNova Health. All rights reserved.
          </span>
          <Link href="/">
            <button
              className="text-sm font-semibold flex items-center gap-2 transition-opacity hover:opacity-70"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.24 0.07 155)" }}
            >
              <ArrowLeft className="w-4 h-4" />
              Return to homepage
            </button>
          </Link>
        </div>
      </footer>
    </div>
  );
}
