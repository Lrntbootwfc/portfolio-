import React, { useState } from 'react';
import {
  ArrowUpRight,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle,
  Github,
  Linkedin,
  Info,
} from 'lucide-react';
import { profile } from '@/data/portfolio';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

const PROJECT_TYPE_OPTIONS = [
  'Business website',
  'E-commerce website',
  'Landing page',
  'Portfolio website',
  'Web application',
  'Website redesign',
  'Data analysis',
  'Power BI / Tableau dashboard',
  'Other',
];

const BUDGET_OPTIONS = [
  'Under ₹10,000',
  '₹10,000 – ₹25,000',
  '₹25,000 – ₹50,000',
  '₹50,000 – ₹1,00,000',
  '₹1,00,000+',
  'Not sure yet',
];

type FormData = {
  name: string;
  contactMethod: 'email' | 'phone';
  email: string;
  phone: string;
  projectType: string;
  description: string;
  budget: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  projectType?: string;
};

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    contactMethod: 'email',
    email: '',
    phone: '',
    projectType: '',
    description: '',
    budget: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionStatus, setSubmissionStatus] = useState<
    'idle' | 'dev_notice' | 'submitted'
  >('idle');
  const [submittedPayload, setSubmittedPayload] = useState<FormData | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }

    if (formData.contactMethod === 'email') {
      if (!formData.email.trim()) {
        newErrors.email = 'Please provide your email address.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address.';
      }
    } else if (formData.contactMethod === 'phone') {
      if (!formData.phone.trim()) {
        newErrors.phone = 'Please provide your phone number.';
      } else if (!/^[+0-9\s\-()]{7,20}$/.test(formData.phone.trim())) {
        newErrors.phone = 'Please enter a valid phone number (min 7 digits).';
      }
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Please select the type of project you want to build.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Submission handler abstraction:
   * Connect to Formspree, Resend, or custom backend API endpoint when ready.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    // Capture payload for abstraction
    setSubmittedPayload({ ...formData });

    // Show honest development-mode notice since no third-party email service is currently connected
    setSubmissionStatus('dev_notice');
  };

  return (
    <section id="contact" className="section-padding bg-paper-100 border-t border-paper-300">
      <div className="container-content">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* ============================================================
              LEFT COLUMN: HEADLINE, COPY & DIRECT CHANNELS (5 cols)
              ============================================================ */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <Reveal className="flex flex-col gap-6">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent-500">
                START A PROJECT
              </span>

              <h2 className="font-display text-display-xl font-400 text-ink-900 leading-tight text-balance">
                Have something you want to build?
              </h2>

              <p className="text-lg leading-relaxed text-ink-600 text-pretty">
                Tell me what you're working on. Let's figure out how to turn it into something useful.
              </p>

              {/* Quick direct CTA */}
              <div className="pt-2">
                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 text-sm font-medium text-paper-100 transition-all duration-200 hover:bg-accent-400"
                >
                  <span>Start a project</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              {/* Contact Channels Card */}
              <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-paper-300 bg-paper-50 p-6">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-400">
                  Direct Channels
                </span>

                <div className="flex flex-col gap-3">
                  {/* Email */}
                  <a
                    href={`mailto:${profile.email}`}
                    className="group flex items-center justify-between rounded-xl border border-paper-300 bg-paper-100 p-3.5 transition-colors hover:border-ink-400"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-50 text-accent-500 border border-accent-200">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-mono font-medium text-ink-500">Email</span>
                        <span className="text-sm font-medium text-ink-900">{profile.email}</span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-ink-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink-900" />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={`https://www.linkedin.com/in/${profile.linkedinUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-paper-300 bg-paper-100 p-3.5 transition-colors hover:border-ink-400"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-paper-200 text-ink-700">
                        <Linkedin className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-mono font-medium text-ink-500">LinkedIn</span>
                        <span className="text-sm font-medium text-ink-900">
                          {profile.linkedinUsername}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-ink-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink-900" />
                  </a>

                  {/* GitHub */}
                  <a
                    href={`https://github.com/${profile.githubUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-paper-300 bg-paper-100 p-3.5 transition-colors hover:border-ink-400"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-paper-200 text-ink-700">
                        <Github className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-mono font-medium text-ink-500">GitHub</span>
                        <span className="text-sm font-medium text-ink-900">
                          {profile.githubUsername}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-ink-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink-900" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ============================================================
              RIGHT COLUMN: INTERACTIVE ENQUIRY FORM (7 cols)
              ============================================================ */}
          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <div className="rounded-3xl border border-paper-300 bg-paper-50 p-7 sm:p-10 shadow-xs">
                <div className="border-b border-paper-300 pb-6 mb-6">
                  <h3 className="font-display text-display-md font-400 text-ink-900">
                    Project Enquiry
                  </h3>
                  <p className="mt-1 text-sm text-ink-500">
                    Fill out the fields below for project estimation and timeline scoping.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                  {/* FIELD 1: Your name * */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="client-name"
                      className="font-mono text-xs font-semibold text-ink-800 uppercase tracking-wider"
                    >
                      Your name <span className="text-accent-500">*</span>
                    </label>
                    <input
                      id="client-name"
                      type="text"
                      required
                      placeholder="e.g. Alex Miller"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      className={`w-full rounded-xl border bg-paper-100 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none transition-colors ${
                        errors.name
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-paper-300 focus:border-ink-800'
                      }`}
                    />
                    {errors.name && (
                      <span className="flex items-center gap-1 text-xs text-red-600 font-medium">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* FIELD 2: How can I reach you? (Toggle + Conditional input) */}
                  <div className="flex flex-col gap-3">
                    <label className="font-mono text-xs font-semibold text-ink-800 uppercase tracking-wider">
                      How can I reach you? <span className="text-accent-500">*</span>
                    </label>

                    {/* Method Selector Pills */}
                    <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Contact method">
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, contactMethod: 'email' });
                          if (errors.phone) setErrors({ ...errors, phone: undefined });
                        }}
                        className={`flex items-center justify-center gap-2 rounded-xl border py-2.5 px-4 text-xs font-mono font-medium transition-all ${
                          formData.contactMethod === 'email'
                            ? 'border-ink-900 bg-ink-900 text-paper-100'
                            : 'border-paper-300 bg-paper-100 text-ink-700 hover:border-ink-400'
                        }`}
                      >
                        <Mail className="h-3.5 w-3.5" />
                        Email
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, contactMethod: 'phone' });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        className={`flex items-center justify-center gap-2 rounded-xl border py-2.5 px-4 text-xs font-mono font-medium transition-all ${
                          formData.contactMethod === 'phone'
                            ? 'border-ink-900 bg-ink-900 text-paper-100'
                            : 'border-paper-300 bg-paper-100 text-ink-700 hover:border-ink-400'
                        }`}
                      >
                        <Phone className="h-3.5 w-3.5" />
                        Phone number
                      </button>
                    </div>

                    {/* Conditional Email / Phone Input */}
                    {formData.contactMethod === 'email' ? (
                      <div className="flex flex-col gap-1.5 pt-1">
                        <input
                          id="client-email"
                          type="email"
                          required
                          placeholder="name@company.com"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: undefined });
                          }}
                          className={`w-full rounded-xl border bg-paper-100 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none transition-colors ${
                            errors.email
                              ? 'border-red-500 focus:border-red-500'
                              : 'border-paper-300 focus:border-ink-800'
                          }`}
                        />
                        {errors.email && (
                          <span className="flex items-center gap-1 text-xs text-red-600 font-medium">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {errors.email}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-1.5 pt-1">
                        <input
                          id="client-phone"
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (errors.phone) setErrors({ ...errors, phone: undefined });
                          }}
                          className={`w-full rounded-xl border bg-paper-100 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none transition-colors ${
                            errors.phone
                              ? 'border-red-500 focus:border-red-500'
                              : 'border-paper-300 focus:border-ink-800'
                          }`}
                        />
                        {errors.phone && (
                          <span className="flex items-center gap-1 text-xs text-red-600 font-medium">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {errors.phone}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* FIELD 3: What do you want to build? (Dropdown) */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="project-type"
                      className="font-mono text-xs font-semibold text-ink-800 uppercase tracking-wider"
                    >
                      What do you want to build? <span className="text-accent-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="project-type"
                        required
                        value={formData.projectType}
                        onChange={(e) => {
                          setFormData({ ...formData, projectType: e.target.value });
                          if (errors.projectType) setErrors({ ...errors, projectType: undefined });
                        }}
                        className={`w-full appearance-none rounded-xl border bg-paper-100 px-4 py-3 text-sm text-ink-900 focus:outline-none transition-colors ${
                          errors.projectType
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-paper-300 focus:border-ink-800'
                        } ${!formData.projectType ? 'text-ink-400' : ''}`}
                      >
                        <option value="" disabled>
                          Select project type...
                        </option>
                        {PROJECT_TYPE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="text-ink-900 bg-paper-50">
                            {opt}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-ink-500 font-mono text-xs">
                        ▼
                      </div>
                    </div>
                    {errors.projectType && (
                      <span className="flex items-center gap-1 text-xs text-red-600 font-medium">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {errors.projectType}
                      </span>
                    )}
                  </div>

                  {/* FIELD 4: Tell me a little about it (Large Textarea) */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="project-description"
                      className="font-mono text-xs font-semibold text-ink-800 uppercase tracking-wider"
                    >
                      Tell me a little about it
                    </label>
                    <textarea
                      id="project-description"
                      rows={4}
                      placeholder="Briefly describe your goals, required features, or reference links..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full rounded-xl border border-paper-300 bg-paper-100 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-ink-800 focus:outline-none transition-colors resize-y"
                    />
                  </div>

                  {/* FIELD 5: What budget can you afford? (Dropdown) */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="project-budget"
                      className="font-mono text-xs font-semibold text-ink-800 uppercase tracking-wider"
                    >
                      What budget can you afford?
                    </label>
                    <div className="relative">
                      <select
                        id="project-budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className={`w-full appearance-none rounded-xl border border-paper-300 bg-paper-100 px-4 py-3 text-sm text-ink-900 focus:border-ink-800 focus:outline-none transition-colors ${
                          !formData.budget ? 'text-ink-400' : ''
                        }`}
                      >
                        <option value="">Select budget range (optional)...</option>
                        {BUDGET_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="text-ink-900 bg-paper-50">
                            {opt}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-ink-500 font-mono text-xs">
                        ▼
                      </div>
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink-900 px-6 py-3.5 text-sm font-medium text-paper-100 transition-all duration-200 hover:bg-accent-400"
                    >
                      <span>Submit enquiry</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>

                  {/* HONEST DEVELOPMENT NOTICE / INTEGRATION HOOK */}
                  {submissionStatus === 'dev_notice' && (
                    <div className="rounded-2xl border border-paper-400 bg-paper-100 p-5 text-ink-800 flex flex-col gap-3">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 shrink-0 text-accent-500 mt-0.5" />
                        <div className="flex flex-col gap-1">
                          <span className="font-mono text-xs font-semibold text-ink-900 uppercase tracking-wider">
                            Form Submission Ready (Dev Preview)
                          </span>
                          <p className="text-xs text-ink-600 leading-relaxed">
                            Form validation succeeded. Because an external mail API or backend handler (such as Formspree or a server endpoint) is not yet connected to this repository, your enquiry was not dispatched over the network.
                          </p>
                        </div>
                      </div>

                      {/* Payload preview for developer */}
                      {submittedPayload && (
                        <div className="rounded-lg bg-paper-200/80 p-3 font-mono text-[11px] text-ink-700 flex flex-col gap-1">
                          <div><span className="text-ink-500">Name:</span> {submittedPayload.name}</div>
                          <div>
                            <span className="text-ink-500">Contact:</span>{' '}
                            {submittedPayload.contactMethod === 'email'
                              ? submittedPayload.email
                              : submittedPayload.phone}
                          </div>
                          <div><span className="text-ink-500">Type:</span> {submittedPayload.projectType}</div>
                          {submittedPayload.budget && (
                            <div><span className="text-ink-500">Budget:</span> {submittedPayload.budget}</div>
                          )}
                        </div>
                      )}

                      <a
                        href={`mailto:${profile.email}?subject=Project Enquiry: ${encodeURIComponent(
                          formData.projectType || 'New Project'
                        )}&body=${encodeURIComponent(
                          `Hi Divya,\n\nName: ${formData.name}\nContact: ${
                            formData.contactMethod === 'email' ? formData.email : formData.phone
                          }\nProject: ${formData.projectType}\nBudget: ${formData.budget}\n\nDetails:\n${formData.description}`
                        )}`}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-accent-500 hover:underline pt-1"
                      >
                        Send via your default email client instead →
                      </a>
                    </div>
                  )}
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
