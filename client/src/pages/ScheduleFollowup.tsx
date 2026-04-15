import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function ScheduleFollowup() {
  const [, navigate] = useLocation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      // Send data to Make.com webhook
      const response = await fetch("https://hook.us2.make.com/dhizujs8dmj9v1255tklx92ehmgxg3uu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        toast.success("Verification submitted! Checking your records...");
        // Clear form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
        });
        // You can add logic here to handle the response from Make.com
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Webhook error:", error);
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.97 0.015 90)" }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: "oklch(0.88 0.01 90)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: "oklch(0.24 0.07 155)" }}
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.005 65)" }}
          >
            Schedule Your{" "}
            <em className="not-italic" style={{ color: "oklch(0.24 0.07 155)" }}>
              Follow-up
            </em>
          </h1>
          <p
            className="text-lg max-w-lg mx-auto"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.45 0.005 65)" }}
          >
            Verify your information to access your follow-up appointment booking. We'll check your records to confirm your initial visit.
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
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-semibold mb-2"
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
                placeholder="Enter your first name"
                className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                style={{
                  borderColor: "oklch(0.88 0.01 90)",
                  fontFamily: "'DM Sans', sans-serif",
                  color: "oklch(0.22 0.005 65)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "oklch(0.24 0.07 155)";
                  e.currentTarget.style.ringColor = "oklch(0.24 0.07 155 / 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "oklch(0.88 0.01 90)";
                }}
              />
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-semibold mb-2"
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
                placeholder="Enter your last name"
                className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                style={{
                  borderColor: "oklch(0.88 0.01 90)",
                  fontFamily: "'DM Sans', sans-serif",
                  color: "oklch(0.22 0.005 65)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "oklch(0.24 0.07 155)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "oklch(0.88 0.01 90)";
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2"
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
                placeholder="Enter your email address"
                className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                style={{
                  borderColor: "oklch(0.88 0.01 90)",
                  fontFamily: "'DM Sans', sans-serif",
                  color: "oklch(0.22 0.005 65)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "oklch(0.24 0.07 155)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "oklch(0.88 0.01 90)";
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg font-semibold transition-all disabled:opacity-50"
              style={{
                backgroundColor: "oklch(0.24 0.07 155)",
                color: "white",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {isLoading ? "Checking..." : "Check for Follow-up"}
            </button>
          </form>

          {/* Info Text */}
          <p
            className="text-center text-sm mt-6"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.50 0.005 65)" }}
          >
            We'll verify your information against our records and confirm your eligibility for a follow-up appointment.
          </p>
        </div>
      </main>
    </div>
  );
}
