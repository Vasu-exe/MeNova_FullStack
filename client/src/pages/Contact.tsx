import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Mail, Clock, MapPin, MessageCircle, ShieldCheck } from "lucide-react";

export default function Contact() {
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
              <MessageCircle className="w-5 h-5" style={{ color: "oklch(0.75 0.10 42)" }} />
            </div>
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.75 0.10 42)" }}
            >
              Get in Touch
            </span>
          </div>
          <h1
            className="text-4xl lg:text-5xl font-bold text-white mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Contact Us
          </h1>
          <p
            className="text-base max-w-xl"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.65)", lineHeight: "1.7" }}
          >
            We're here to help. Whether you have a question about our services, need support, or just want to learn
            more about menopause care — reach out and we'll get back to you.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

          {/* Primary Contact Card */}
          <div
            className="rounded-2xl p-7 lg:p-10"
            style={{
              backgroundColor: "white",
              border: "1.5px solid oklch(0.91 0.01 90)",
              boxShadow: "0 2px 12px oklch(0.18 0.07 155 / 0.06)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "oklch(0.24 0.07 155 / 0.08)" }}
              >
                <Mail className="w-4 h-4" style={{ color: "oklch(0.24 0.07 155)" }} />
              </div>
              <h2
                className="text-xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.005 65)" }}
              >
                Email Support
              </h2>
            </div>
            <p
              className="mb-5"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.40 0.005 65)", lineHeight: "1.75" }}
            >
              For all general inquiries, questions about our services, waitlist updates, or support requests, please
              email us directly. We aim to respond within 1–2 business days.
            </p>
            <a
              href="mailto:support.menova@gmail.com"
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "oklch(0.60 0.12 42)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.95rem",
                textDecoration: "none",
              }}
            >
              <Mail className="w-4 h-4" />
              support.menova@gmail.com
            </a>
          </div>

          {/* Info Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Response Time */}
            <div
              className="rounded-2xl p-7"
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
                  <Clock className="w-4 h-4" style={{ color: "oklch(0.24 0.07 155)" }} />
                </div>
                <h3
                  className="text-lg font-bold"
                  style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.005 65)" }}
                >
                  Response Time
                </h3>
              </div>
              <p
                style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.40 0.005 65)", lineHeight: "1.75", fontSize: "0.95rem" }}
              >
                We respond to all emails within <strong>1–2 business days</strong>. For urgent clinical matters, please
                call 911 or visit your nearest emergency department.
              </p>
            </div>

            {/* Service Area */}
            <div
              className="rounded-2xl p-7"
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
                  <MapPin className="w-4 h-4" style={{ color: "oklch(0.24 0.07 155)" }} />
                </div>
                <h3
                  className="text-lg font-bold"
                  style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.005 65)" }}
                >
                  Service Area
                </h3>
              </div>
              <p
                style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.40 0.005 65)", lineHeight: "1.75", fontSize: "0.95rem" }}
              >
                MeNova Health currently serves women across <strong>British Columbia, Canada</strong>. All appointments
                are conducted virtually — no travel required.
              </p>
            </div>
          </div>

          {/* Privacy Note */}
          <div
            className="rounded-2xl p-7"
            style={{
              backgroundColor: "oklch(0.24 0.07 155 / 0.04)",
              border: "1.5px solid oklch(0.24 0.07 155 / 0.12)",
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: "oklch(0.24 0.07 155 / 0.10)" }}
              >
                <ShieldCheck className="w-4 h-4" style={{ color: "oklch(0.24 0.07 155)" }} />
              </div>
              <div>
                <h3
                  className="text-base font-bold mb-2"
                  style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.005 65)" }}
                >
                  Your Privacy Matters
                </h3>
                <p
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.40 0.005 65)", lineHeight: "1.75", fontSize: "0.9rem" }}
                >
                  Please do not include personal health information in your initial email. Once a care relationship is
                  established, all clinical communication takes place through our secure patient portal. Review our{" "}
                  <Link href="/privacy-policy">
                    <span
                      className="font-semibold underline underline-offset-2 cursor-pointer"
                      style={{ color: "oklch(0.60 0.12 42)" }}
                    >
                      Privacy Policy
                    </span>
                  </Link>{" "}
                  for more details.
                </p>
              </div>
            </div>
          </div>

          {/* Emergency Note */}
          <div
            className="rounded-2xl p-6"
            style={{
              backgroundColor: "oklch(0.60 0.12 42 / 0.06)",
              border: "1.5px solid oklch(0.60 0.12 42 / 0.18)",
            }}
          >
            <p
              className="text-sm text-center font-medium"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.40 0.005 65)", lineHeight: "1.7" }}
            >
              <strong style={{ color: "oklch(0.45 0.12 30)" }}>Medical Emergency?</strong> Do not email us. Call{" "}
              <strong>911</strong> or go to your nearest emergency department immediately.
            </p>
          </div>

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
