import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, FileText, Globe, AlertTriangle, CreditCard, MessageSquare, Copyright, Link2, ShieldOff, RefreshCw, Mail } from "lucide-react";

const SECTIONS = [
  {
    icon: FileText,
    title: "Terms of Service",
    content: (
      <p>
        These Terms of Service ("Terms") govern use of the Menova Health website and related online services. By
        accessing or using the website, users agree to these Terms.
      </p>
    ),
  },
  {
    icon: Globe,
    title: "Use of the Website",
    content: (
      <p>
        The website may only be used for lawful purposes and in a way that does not violate the rights of others,
        interfere with the website's operation, or attempt unauthorized access to systems or data.
      </p>
    ),
  },
  {
    icon: AlertTriangle,
    title: "No Emergency Use",
    content: (
      <p>
        This website is not intended for medical emergencies. Anyone experiencing a medical emergency should call 911
        or go to the nearest emergency department immediately.
      </p>
    ),
  },
  {
    icon: FileText,
    title: "Medical Disclaimer",
    content: (
      <p>
        Content on the website is provided for general informational purposes only and is not medical advice, diagnosis,
        or treatment. Use of the website alone does not create a provider-patient relationship unless that relationship
        is separately established through the clinic's intake or care process.
      </p>
    ),
  },
  {
    icon: CreditCard,
    title: "Appointments and Payments",
    content: (
      <p>
        If services are booked through the website, accurate and complete information must be provided. Fees,
        cancellation terms, refund rules, and payment requirements may be presented at the time of booking or in a
        separate agreement. Menova Health reserves the right to refuse or cancel bookings where appropriate.
      </p>
    ),
  },
  {
    icon: MessageSquare,
    title: "User Submissions",
    content: (
      <p>
        Anyone submitting forms, messages, reviews, or other content is responsible for the accuracy of that
        information and for ensuring they have the right to provide it. Submitted content may be used to respond to
        requests and operate services, subject to the Privacy Policy.
      </p>
    ),
  },
  {
    icon: Copyright,
    title: "Intellectual Property",
    content: (
      <p>
        All content on the website, including text, graphics, branding, logos, and design elements, is owned by Menova
        Health or its licensors and is protected by applicable intellectual property laws. No content may be copied,
        reproduced, distributed, or adapted without prior written permission, except as allowed by law for personal,
        non-commercial use.
      </p>
    ),
  },
  {
    icon: Link2,
    title: "Third-Party Services",
    content: (
      <p>
        The website may contain links to third-party tools or platforms, including payment providers, scheduling
        services, or patient portals. Menova Health is not responsible for the content, privacy practices, or operations
        of third-party services.
      </p>
    ),
  },
  {
    icon: ShieldOff,
    title: "Limitation of Liability",
    content: (
      <p>
        To the fullest extent permitted by law, Menova Health is not liable for indirect, incidental, consequential,
        special, or punitive damages arising from use of the website. Use of the website is at the user's own risk.
      </p>
    ),
  },
  {
    icon: RefreshCw,
    title: "Changes to the Website and Terms",
    content: (
      <p>
        Any part of the website may be updated, suspended, or discontinued at any time. These Terms may also be revised
        from time to time, and continued use of the website after changes are posted means acceptance of the revised
        Terms.
      </p>
    ),
  },
  {
    icon: Mail,
    title: "Contact",
    content: (
      <p>
        Questions about these Terms may be sent to{" "}
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

export default function TermsAndConditions() {
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
              <FileText className="w-5 h-5" style={{ color: "oklch(0.75 0.10 42)" }} />
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
            Terms of Service
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
