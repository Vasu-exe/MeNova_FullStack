import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Shield, Lock, Eye, Users, Database, Clock, Mail } from "lucide-react";

const SECTIONS = [
  {
    icon: Eye,
    title: "Information Collected",
    content: (
      <>
        <p className="mb-4">
          Menova Health ("we," "us," or "our") respects your privacy and is committed to protecting your personal
          information. This Privacy Policy explains how personal information may be collected, used, disclosed, and
          safeguarded when visitors use the website, contact the clinic, book services, or otherwise interact with
          Menova Health.
        </p>
        <p>
          Personal information may include details provided directly by a user, such as name, email address, phone
          number, date of birth, billing details, health-related information, and any other information submitted
          through forms, appointment requests, or messages. Technical information may also be collected automatically,
          including browser type, device type, IP address, referring pages, and general website usage data.
        </p>
      </>
    ),
  },
  {
    icon: Users,
    title: "How Information Is Used",
    content: (
      <>
        <p className="mb-4">Personal information may be used to:</p>
        <ul className="space-y-2">
          {[
            "Provide healthcare-related services and respond to inquiries",
            "Schedule appointments and manage communications",
            "Process payments and send confirmations or receipts",
            "Improve the website, operations, and user experience",
            "Meet legal, regulatory, and professional obligations",
            "Send administrative or service-related emails",
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
    icon: Shield,
    title: "Consent",
    content: (
      <p>
        Personal information is collected, used, and disclosed with consent, except where otherwise permitted or
        required by law. By submitting information through the website or engaging services, users consent to the
        collection and use of information for the purposes described in this Policy. Consent may be withdrawn where
        permitted by law, subject to legal or contractual restrictions.
      </p>
    ),
  },
  {
    icon: Users,
    title: "Sharing Information",
    content: (
      <p>
        Menova Health does not sell personal information. Information may be shared with trusted service providers
        that support operations, such as website hosting, payment processing, email delivery, analytics, and practice
        management platforms. These providers are only permitted to use information as needed to provide services on
        behalf of Menova Health. Information may also be disclosed where required by law, court order, or regulatory
        obligation.
      </p>
    ),
  },
  {
    icon: Lock,
    title: "Healthcare Information",
    content: (
      <p>
        Health-related information is treated with additional care because of its sensitive nature. Access is limited
        to authorized personnel, and reasonable administrative, technical, and physical safeguards are used to help
        protect against unauthorized access, use, disclosure, loss, or misuse.
      </p>
    ),
  },
  {
    icon: Database,
    title: "Data Retention",
    content: (
      <p>
        Personal information is retained only for as long as necessary to fulfill the purposes for which it was
        collected, comply with legal obligations, resolve disputes, and enforce applicable agreements.
      </p>
    ),
  },
  {
    icon: Shield,
    title: "Security",
    content: (
      <p>
        Reasonable safeguards are used that are appropriate to the sensitivity of the information. However, no method
        of transmission over the internet or electronic storage can be guaranteed to be completely secure.
      </p>
    ),
  },
  {
    icon: Eye,
    title: "Your Rights",
    content: (
      <p>
        Depending on applicable law, individuals may have rights to request access to personal information, ask for
        corrections, or inquire about how their information is handled. Requests may be submitted by email.
      </p>
    ),
  },
  {
    icon: Clock,
    title: "Cookies and Analytics",
    content: (
      <p>
        The website may use cookies and similar technologies to support core functionality, remember preferences, and
        understand website usage. Users can manage cookies through browser controls and any consent tools made
        available on the website.
      </p>
    ),
  },
  {
    icon: Mail,
    title: "Contact",
    content: (
      <p>
        Questions about this Privacy Policy or personal information practices may be sent to{" "}
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

export default function PrivacyPolicy() {
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
              <Shield className="w-5 h-5" style={{ color: "oklch(0.75 0.10 42)" }} />
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
            Privacy Policy
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
