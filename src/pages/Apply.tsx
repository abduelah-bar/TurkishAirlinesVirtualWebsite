import { useState } from "react";
import { applicationEmbed } from "../utils/discord";
import { FLEET, ROUTES } from "../data/mockData";

type Step = 1 | 2 | 3 | 4;

export default function Apply() {
  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", cid: "",
    vatsimHours: "", realWorldExp: "", hub: "Istanbul (IST)",
    aircraft: "", simPlatform: "MSFS 2020", discordUsername: "",
    experience: "", motivation: "", availableHours: "",
    agreeRules: false, agreeActivity: false,
  });

  const update = (field: string, value: string | boolean) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    await applicationEmbed({
      name: `${form.firstName} ${form.lastName}`,
      cid: form.cid,
      email: form.email,
      hours: form.vatsimHours,
      hub: form.hub,
    });
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#F8F8F8] page-enter px-4">
        <div className="max-w-lg w-full text-center bg-white rounded-3xl shadow-xl p-12 border border-gray-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">✅</div>
          <h2 className="font-display text-3xl font-bold text-[#0D1B2A] mb-3">Application Submitted!</h2>
          <p className="text-gray-500 mb-6">
            Thank you, <strong>{form.firstName}</strong>! Your application has been received and our team has been notified via Discord. You'll hear back within 48–72 hours.
          </p>
          <div className="bg-[#F8F8F8] rounded-xl p-5 text-sm text-left space-y-2 mb-8">
            <div className="flex justify-between">
              <span className="text-gray-500">VATSIM CID</span>
              <span className="font-bold font-mono">{form.cid}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Preferred Hub</span>
              <span className="font-bold">{form.hub}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">VATSIM Hours</span>
              <span className="font-bold">{form.vatsimHours}h</span>
            </div>
          </div>
          <p className="text-xs text-gray-400">A Discord notification has been sent to the admin team.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8] page-enter">
      {/* Header */}
      <div className="bg-[#0D1B2A] text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="text-[#E81932] font-bold text-sm uppercase tracking-widest">Recruitment</span>
          <h1 className="font-display text-5xl font-bold mt-2 mb-4">Join Turkish Airlines Virtual</h1>
          <p className="text-white/60 text-lg">Complete the application below. All pilots need a valid VATSIM account.</p>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-0">
            {[1, 2, 3, 4].map((s, i) => (
              <div key={s} className="flex items-center flex-1 last:flex-none">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition-all ${step >= s ? "bg-[#E81932] text-white" : "bg-gray-100 text-gray-400"}`}>
                  {step > s ? "✓" : s}
                </div>
                <div className="flex-1 text-xs font-semibold text-gray-500 ml-2 hidden sm:block">
                  {["Personal Info", "Experience", "Motivation", "Review"][i]}
                </div>
                {i < 3 && <div className={`h-0.5 flex-1 mx-2 ${step > s ? "bg-[#E81932]" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {step === 1 && (
            <StepSection title="Personal Information" subtitle="Your basic details and VATSIM credentials.">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="First Name" value={form.firstName} onChange={(v) => update("firstName", v)} placeholder="e.g. Ahmet" />
                <Field label="Last Name" value={form.lastName} onChange={(v) => update("lastName", v)} placeholder="e.g. Yilmaz" />
                <Field label="Email Address" value={form.email} onChange={(v) => update("email", v)} placeholder="your@email.com" type="email" />
                <Field label="VATSIM CID" value={form.cid} onChange={(v) => update("cid", v)} placeholder="e.g. 1234567" />
                <Field label="Discord Username" value={form.discordUsername} onChange={(v) => update("discordUsername", v)} placeholder="e.g. ahmet#1234" />
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Preferred Hub</label>
                  <select value={form.hub} onChange={(e) => update("hub", e.target.value)} className="ta-input">
                    <option>Istanbul (IST)</option>
                    <option>Ankara (ESB)</option>
                    <option>Izmir (ADB)</option>
                    <option>Antalya (AYT)</option>
                  </select>
                </div>
              </div>
            </StepSection>
          )}

          {step === 2 && (
            <StepSection title="Flight Experience" subtitle="Tell us about your VATSIM and simulator background.">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="VATSIM Hours" value={form.vatsimHours} onChange={(v) => update("vatsimHours", v)} placeholder="e.g. 450" type="number" />
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Simulator Platform</label>
                  <select value={form.simPlatform} onChange={(e) => update("simPlatform", e.target.value)} className="ta-input">
                    <option>MSFS 2020</option>
                    <option>MSFS 2024</option>
                    <option>X-Plane 12</option>
                    <option>X-Plane 11</option>
                    <option>P3D v5</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Preferred Aircraft</label>
                  <select value={form.aircraft} onChange={(e) => update("aircraft", e.target.value)} className="ta-input">
                    <option value="">Select aircraft...</option>
                    {FLEET.map((f) => <option key={f.id}>{f.type}</option>)}
                  </select>
                </div>
                <Field label="Weekly Available Hours" value={form.availableHours} onChange={(v) => update("availableHours", v)} placeholder="e.g. 10" type="number" />
              </div>
              <div className="mt-5">
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Real-World Aviation Experience (optional)</label>
                <textarea
                  value={form.realWorldExp}
                  onChange={(e) => update("realWorldExp", e.target.value)}
                  placeholder="PPL, CPL, ATPL, student pilot, aviation enthusiast..."
                  rows={3}
                  className="ta-input resize-none"
                />
              </div>
              <div className="mt-5">
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Simulator Experience</label>
                <textarea
                  value={form.experience}
                  onChange={(e) => update("experience", e.target.value)}
                  placeholder="Describe your experience with aircraft, add-ons, VATSIM ratings..."
                  rows={4}
                  className="ta-input resize-none"
                />
              </div>
            </StepSection>
          )}

          {step === 3 && (
            <StepSection title="Your Motivation" subtitle="Why do you want to join Turkish Airlines Virtual?">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Motivation Letter</label>
                <textarea
                  value={form.motivation}
                  onChange={(e) => update("motivation", e.target.value)}
                  placeholder="Tell us why you want to join, what you bring to the community, and your aviation goals..."
                  rows={8}
                  className="ta-input resize-none"
                />
                <p className="text-xs text-gray-400 mt-1">{form.motivation.length} characters (min. 100 recommended)</p>
              </div>
              <div className="mt-6 space-y-4 bg-[#F8F8F8] rounded-xl p-5">
                <h4 className="font-bold text-[#0D1B2A]">Virtual Airline Rules</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Minimum 1 flight per month to maintain active status</li>
                  <li>• All flights must be filed via PIREP within 48 hours</li>
                  <li>• Flights must be conducted on VATSIM network</li>
                  <li>• Respectful conduct in Discord at all times</li>
                  <li>• Minimum 100 VATSIM hours to join</li>
                </ul>
                <div className="space-y-3 pt-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={form.agreeRules} onChange={(e) => update("agreeRules", e.target.checked)} className="mt-0.5 accent-[#E81932]" />
                    <span className="text-sm text-gray-700">I have read and agree to the Turkish Airlines Virtual rules and regulations.</span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={form.agreeActivity} onChange={(e) => update("agreeActivity", e.target.checked)} className="mt-0.5 accent-[#E81932]" />
                    <span className="text-sm text-gray-700">I understand the minimum activity requirements and commit to fulfilling them.</span>
                  </label>
                </div>
              </div>
            </StepSection>
          )}

          {step === 4 && (
            <StepSection title="Review Your Application" subtitle="Please review your details before submitting.">
              <div className="space-y-6">
                <ReviewSection title="Personal Information">
                  <ReviewRow label="Name" value={`${form.firstName} ${form.lastName}`} />
                  <ReviewRow label="Email" value={form.email} />
                  <ReviewRow label="VATSIM CID" value={form.cid} />
                  <ReviewRow label="Discord" value={form.discordUsername} />
                  <ReviewRow label="Hub" value={form.hub} />
                </ReviewSection>
                <ReviewSection title="Experience">
                  <ReviewRow label="VATSIM Hours" value={`${form.vatsimHours}h`} />
                  <ReviewRow label="Platform" value={form.simPlatform} />
                  <ReviewRow label="Aircraft" value={form.aircraft} />
                  <ReviewRow label="Available Weekly" value={`${form.availableHours}h/week`} />
                </ReviewSection>
                <ReviewSection title="Motivation">
                  <p className="text-sm text-gray-700 leading-relaxed">{form.motivation || "Not provided"}</p>
                </ReviewSection>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100 text-sm text-blue-800">
                📨 Upon submission, our admin team will be notified via Discord and will review your application within 48–72 hours.
              </div>
            </StepSection>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={() => setStep((s) => Math.max(1, s - 1) as Step)}
              disabled={step === 1}
              className="ta-btn-secondary disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Back
            </button>
            {step < 4 ? (
              <button
                onClick={() => setStep((s) => Math.min(4, s + 1) as Step)}
                className="ta-btn-primary"
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading || !form.agreeRules || !form.agreeActivity}
                className="ta-btn-primary disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Submitting...</>
                ) : "Submit Application"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepSection({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-2xl font-black text-[#0D1B2A] mb-1">{title}</h2>
      <p className="text-gray-500 text-sm mb-7">{subtitle}</p>
      {children}
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-1.5">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="ta-input" />
    </div>
  );
}

function ReviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#F8F8F8] rounded-xl p-5">
      <h4 className="font-bold text-[#0D1B2A] text-sm uppercase tracking-wider mb-3">{title}</h4>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold text-gray-900">{value || "—"}</span>
    </div>
  );
}
