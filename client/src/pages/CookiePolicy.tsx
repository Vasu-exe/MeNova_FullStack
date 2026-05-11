import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Cookie, Settings, BarChart2, Link2, Sliders, RefreshCw, Mail } from "lucide-react";

const SECTIONS = [
  {
    icon: Cookie,
    title: "What Cookies Are",
    content: (
      <p>
        This Cookie Policy explains how Menova Health uses cookies and similar technologies on its website. Cookies are
        small text files stored on a user's device when visiting a website. They help websites function properly and can
        also help site owners understand how visitors use the site.
      </p>
    ),
  },
  {
    icon: Settings,
    title: "Types of Cookies Used",
    content: (
      <>
        <p className="mb-4">The website may use:</p>
        <ul className="space-y-2">
          {[
            "Strictly necessary cookies to support core website functions",
            "Preference cookies to remember settings and selections",
            "Analytics cookies to understand traffic and usage patterns",
            "Functionality cookies to support tools such as forms, booking flows, or embedded services",
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
    icon: BarChart2,
    title: "How Cookies Are Used",
    content: (
      <>
        <p className="mb-4">Cookies may be used to:</p>
        <ul className="space-y-2">
          {[
            "Keep the website operating properly",
            "Improve performance and user experience",
            "Analyze website traffic and usage trends",
            "Remember user preferences",
            "Support embedded services and integrations",
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
    icon: Link2,
    title: "Third-Party Cookies",
    content: (
      <p>
        Some cookies may be placed by third-party services used on the website, such as analytics providers, form tools,
        payment systems, or patient portal integrations. Those third parties may collect information according to their
        own policies.
      </p>
    ),
  },
  {
    icon: Sliders,
    title: "Managing Cookies",
    content: (
      <p>
        Users can manage or delete cookies through browser settings and, where available, through any cookie consent or
        preference tools on the website. Disabling certain cookies may affect website functionality.
      </p>
    ),
  },
  {
    icon: RefreshCw,
    title: "Changes to This Policy",
    content: (
      <p>
        This Cookie Policy may be updated from time to time. Any updates will be posted on this page with a revised
        effective date.
      </p>
    ),
  },
  {
    icon: Mail,
    title: "Contact",
    content: (
      <p>
        Questions about this Cookie Policy may be sent to{" "}
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

export default function CookiePolicy() {
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
              <Cookie className="w-5 h-5" style={{ color: "oklch(0.75 0.10 42)" }} />
            </div>
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.75 0.10 42)" }}
            >
              Legal
            </span>
          </div>
          <h1
            className="text-4xl lg:text-5xl font-bold text-white mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Cookie Policy
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
