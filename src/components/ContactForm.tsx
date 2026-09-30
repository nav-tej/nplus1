"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePostHog } from "posthog-js/react";
import { useFormGuard } from "@/components/useFormGuard";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  message: string;
};

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const ph = usePostHog();
  const started = useRef(false);
  const { honeypot, guardFields } = useFormGuard();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!started.current) {
      started.current = true;
      ph?.capture("contact_form_started");
    }
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    ph?.capture("contact_form_submitted", {
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      company: form.company || null,
      message: form.message,
      has_company: !!form.company,
    });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, ...guardFields() }),
      });

      if (!res.ok) throw new Error("Failed to submit");

      const data: { success?: boolean; emailSent?: boolean } = await res.json();

      // Identify the person in PostHog so all prior anonymous events are linked
      ph?.identify(form.email, {
        email: form.email,
        name: `${form.firstName} ${form.lastName}`,
        first_name: form.firstName,
        last_name: form.lastName,
        ...(form.company && { company: form.company }),
      });

      ph?.capture("contact_form_success", {
        email: form.email,
        name: `${form.firstName} ${form.lastName}`,
        company: form.company || null,
        email_sent: !!data.emailSent,
      });

      setStatus("sent");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        message: "",
      });
    } catch {
      ph?.capture("contact_form_error", {
        email: form.email,
        company: form.company || null,
      });
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {honeypot}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-muted mb-2"
          >
            First name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            value={form.firstName}
            onChange={handleChange}
            className="w-full rounded-lg border border-[var(--line-strong)] bg-[var(--bg)] px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-colors"
            placeholder="Jane"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-muted mb-2"
          >
            Last name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            value={form.lastName}
            onChange={handleChange}
            className="w-full rounded-lg border border-[var(--line-strong)] bg-[var(--bg)] px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-colors"
            placeholder="Doe"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-muted mb-2"
        >
          Work email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-lg border border-[var(--line-strong)] bg-[var(--bg)] px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-colors"
          placeholder="jane@company.com"
        />
      </div>

      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium text-muted mb-2"
        >
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={form.company}
          onChange={handleChange}
          className="w-full rounded-lg border border-[var(--line-strong)] bg-[var(--bg)] px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-colors"
          placeholder="Acme Inc."
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-muted mb-2"
        >
          How can we help? *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={form.message}
          onChange={handleChange}
          className="w-full rounded-lg border border-[var(--line-strong)] bg-[var(--bg)] px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-colors resize-none"
          placeholder="Tell us about your growth challenges and goals..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-accent px-8 py-4 text-base font-medium text-[var(--on-alpha)] hover:brightness-110 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending..." : "Request a free GTM audit"}
      </button>

      <p className="text-[11px] text-muted text-center px-4 leading-relaxed">
        By submitting this form, you agree to our{" "}
        <Link href="/privacy" className="underline hover:text-accent transition-colors">
          Privacy Policy
        </Link>
        . Your data is stored securely and used only to respond to your inquiry.
      </p>

      <div aria-live="polite" role="status">
        {status === "sent" && (
          <p className="text-accent text-sm text-center">
            Thanks! We&apos;ll be in touch shortly.
          </p>
        )}
        {status === "error" && (
          <p className="text-red-400 text-sm text-center" role="alert">
            Something went wrong. Please try again or email us directly.
          </p>
        )}
      </div>
    </form>
  );
}
