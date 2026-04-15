import { useState } from "react";
import { ChevronLeft, CheckCircle2, Mail, Clock } from "lucide-react";
import { useLocation } from "wouter";

export default function ScheduleFollowup() {
  const [, navigate] = useLocation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      await fetch("https://hook.us2.make.com/dhizujs8dmj9v1255tklx92ehmgxg3uu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          timestamp: new Date().toISOString(),
        }),
      });
      // Always show confirmation regardless of response
      setIsSubmitted(true);
    } catch {
      // Still show confirmation — Make.com will process async
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.97 0.015 90)" }}>
      {/* Header */}
      <header
        className="border-b"
        style={{
          borderColor: "oklch(0.88 0.01 90)",
          backgroundColor: "white",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <path
                d="M16 3C16 3 8 8 8 17C8 21.4 11.6 25 16 25C20.4 25 24 21.4 24 17C24 8 16 3 16 3Z"
                fill="oklch(0.24 0.07 155)"
                opacity="0.9"
              />
              <path
                d="M16 10C16 10 12 13 12 17.5C12 19.9 13.8 22 16 22C18.2 22 20 19.9 20 17.5C20 13 16 10 16 10Z"
                fill="white"
                opacity="0.3"
              />
            </svg>
            <span
              className="text-xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.005 65)" }}
            >
              MeNova
            </span>
          </button>

          {/* Back link */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-sm font-medium transition-colors"
            style={{ color: "oklch(0.24 0.07 155)", fontFamily: "'DM Sans', sans-serif" }}
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-xl mx-auto px-4 sm:px-6 py-16">

        {!isSubmitted ? (
          <>
            {/* Heading */}
            <div className="text-center mb-10">
              <span
                className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-5"
                style={{
                  backgroundColor: "oklch(0.24 0.07 155 / 0.08)",
                  color: "oklch(0.24 0.07 155)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Existing Patients
              </span>
              <h1
                className="text-4xl font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.005 65)" }}
              >
                Schedule Your{" "}
                <em className="not-italic" style={{ color: "oklch(0.24 0.07 155)" }}>
                  Follow-up
                </em>
              </h1>
              <p
                className="text-base"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.45 0.005 65)" }}
              >
                Enter the details you used during your first visit. We'll verify your records and send you a booking link within 5 minutes.
              </p>
            </div>

            {/* Form Card */}
            <div
              className="rounded-3xl p-8 shadow-sm"
              style={{
                backgroundColor: "white",
                border: "2px solid oklch(0.88 0.01 90)",
              }}
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* First Name */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-semibold mb-1.5"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.22 0.005 65)" }}
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="e.g. Sarah"
                    className="w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none"
                    style={{
                      borderColor: errors.firstName ? "oklch(0.60 0.20 25)" : "oklch(0.88 0.01 90)",
                      fontFamily: "'DM Sans', sans-serif",
                      color: "oklch(0.22 0.005 65)",
                      fontSize: "0.95rem",
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "oklch(0.24 0.07 155)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = errors.firstName ? "oklch(0.60 0.20 25)" : "oklch(0.88 0.01 90)"; }}
                  />
                  {errors.firstName && (
                    <p className="text-xs mt-1" style={{ color: "oklch(0.60 0.20 25)", fontFamily: "'DM Sans', sans-serif" }}>
                      {errors.firstName}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-semibold mb-1.5"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.22 0.005 65)" }}
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="e.g. Johnson"
                    className="w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none"
                    style={{
                      borderColor: errors.lastName ? "oklch(0.60 0.20 25)" : "oklch(0.88 0.01 90)",
                      fontFamily: "'DM Sans', sans-serif",
                      color: "oklch(0.22 0.005 65)",
                      fontSize: "0.95rem",
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "oklch(0.24 0.07 155)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = errors.lastName ? "oklch(0.60 0.20 25)" : "oklch(0.88 0.01 90)"; }}
                  />
                  {errors.lastName && (
                    <p className="text-xs mt-1" style={{ color: "oklch(0.60 0.20 25)", fontFamily: "'DM Sans', sans-serif" }}>
                      {errors.lastName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold mb-1.5"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.22 0.005 65)" }}
                  >
                    Email Address Used During First Visit
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. sarah@email.com"
                    className="w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none"
                    style={{
                      borderColor: errors.email ? "oklch(0.60 0.20 25)" : "oklch(0.88 0.01 90)",
                      fontFamily: "'DM Sans', sans-serif",
                      color: "oklch(0.22 0.005 65)",
                      fontSize: "0.95rem",
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "oklch(0.24 0.07 155)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = errors.email ? "oklch(0.60 0.20 25)" : "oklch(0.88 0.01 90)"; }}
                  />
                  {errors.email && (
                    <p className="text-xs mt-1" style={{ color: "oklch(0.60 0.20 25)", fontFamily: "'DM Sans', sans-serif" }}>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-xl font-semibold text-white transition-all mt-2"
                  style={{
                    backgroundColor: isLoading ? "oklch(0.40 0.07 155)" : "oklch(0.24 0.07 155)",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.95rem",
                    letterSpacing: "0.01em",
                  }}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Checking your records...
                    </span>
                  ) : (
                    "Check for Follow-up"
                  )}
                </button>
              </form>
            </div>
          </>
        ) : (
          /* ─── Confirmation Screen ─── */
          <div className="text-center">
            {/* Success icon */}
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: "oklch(0.24 0.07 155 / 0.10)" }}
            >
              <CheckCircle2 className="w-10 h-10" style={{ color: "oklch(0.24 0.07 155)" }} />
            </div>

            <h2
              className="text-3xl font-bold mb-3"
              style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.005 65)" }}
            >
              Request Received!
            </h2>
            <p
              className="text-base mb-10"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.45 0.005 65)" }}
            >
              Thank you, <strong>{formData.firstName}</strong>. We've received your request and are checking your records.
            </p>

            {/* Confirmation Card */}
            <div
              className="rounded-3xl p-8 shadow-sm text-left mb-8"
              style={{
                backgroundColor: "white",
                border: "2px solid oklch(0.88 0.01 90)",
              }}
            >
              {/* Email notice */}
              <div className="flex items-start gap-4 mb-6 pb-6" style={{ borderBottom: "1px solid oklch(0.92 0.01 90)" }}>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "oklch(0.24 0.07 155 / 0.08)" }}
                >
                  <Mail className="w-5 h-5" style={{ color: "oklch(0.24 0.07 155)" }} />
                </div>
                <div>
                  <p
                    className="font-semibold mb-1"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.22 0.005 65)" }}
                  >
                    Check your inbox
                  </p>
                  <p
                    className="text-sm"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.50 0.005 65)" }}
                  >
                    A follow-up booking link will be sent to{" "}
                    <strong style={{ color: "oklch(0.24 0.07 155)" }}>{formData.email}</strong>
                  </p>
                </div>
              </div>

              {/* Time notice */}
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "oklch(0.60 0.12 42 / 0.08)" }}
                >
                  <Clock className="w-5 h-5" style={{ color: "oklch(0.60 0.12 42)" }} />
                </div>
                <div>
                  <p
                    className="font-semibold mb-1"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.22 0.005 65)" }}
                  >
                    Within 5 minutes
                  </p>
                  <p
                    className="text-sm"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.50 0.005 65)" }}
                  >
                    You'll receive an email with your personalised follow-up scheduling link. Please also check your spam folder if you don't see it.
                  </p>
                </div>
              </div>
            </div>

            {/* Back to home */}
            <button
              onClick={() => navigate("/")}
              className="text-sm font-medium underline underline-offset-4"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.24 0.07 155)" }}
            >
              ← Return to Home
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
