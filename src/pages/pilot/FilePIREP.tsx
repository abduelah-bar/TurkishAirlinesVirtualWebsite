import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { pirepEmbed } from "../../utils/discord";
import { ROUTES, FLEET } from "../../data/mockData";

export default function FilePIREP() {
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    flightNumber: "", departure: "", arrival: "",
    aircraft: "", duration: "", distance: "",
    landingRate: "", fuel: "", network: "VATSIM",
    altRoute: false, remarks: "", date: new Date().toISOString().split("T")[0],
    departureTime: "", arrivalTime: "", cruiseAlt: "FL350", passengers: "",
  });

  const update = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const prefillRoute = (routeId: string) => {
    const r = ROUTES.find((r) => r.id === routeId);
    if (!r) return;
    const dep = r.departure.match(/\((\w+)\)/)?.[1] ?? r.departure;
    const arr = r.arrival.match(/\((\w+)\)/)?.[1] ?? r.arrival;
    update("flightNumber", r.flightNumber);
    update("departure", dep);
    update("arrival", arr);
    update("aircraft", r.aircraft);
    update("distance", r.distance.toString());
    update("duration", r.duration);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    await pirepEmbed({
      pilot: user!.name,
      cid: user!.vatsimCid,
      flightNumber: form.flightNumber,
      departure: form.departure,
      arrival: form.arrival,
      aircraft: form.aircraft,
      duration: form.duration,
      distance: form.distance,
      landingRate: form.landingRate,
      status: "Pending Review",
    });
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-8 flex items-center justify-center min-h-full page-enter">
        <div className="max-w-lg w-full text-center bg-white rounded-3xl shadow-xl p-12 border border-gray-100">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="font-display text-3xl font-bold text-[#0D1B2A] mb-3">PIREP Filed!</h2>
          <p className="text-gray-500 mb-5">
            Your PIREP for <strong>{form.flightNumber}</strong> ({form.departure} → {form.arrival}) has been submitted and posted to Discord for review.
          </p>
          <div className="bg-[#F8F8F8] rounded-xl p-5 text-sm text-left space-y-2 mb-6">
            <ReviewRow label="Flight" value={form.flightNumber} />
            <ReviewRow label="Route" value={`${form.departure} → ${form.arrival}`} />
            <ReviewRow label="Duration" value={form.duration} />
            <ReviewRow label="Landing Rate" value={`${form.landingRate} fpm`} />
          </div>
          <div className="flex gap-3">
            <button onClick={() => setSubmitted(false)} className="ta-btn-secondary flex-1">File Another</button>
            <button onClick={() => window.location.href = "/pilot/logbook"} className="ta-btn-primary flex-1">View Logbook</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 page-enter">
      <div className="mb-8">
        <div className="text-[#E81932] font-bold text-sm uppercase tracking-wider mb-1">PIREP System</div>
        <h1 className="text-3xl font-black text-[#0D1B2A]">File a PIREP</h1>
        <p className="text-gray-500 mt-1">Report your completed flight. All PIREPs are reviewed and posted to Discord.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick fill */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-24">
            <h3 className="font-bold text-[#0D1B2A] mb-4">Quick Fill from Schedule</h3>
            <div className="space-y-2">
              {ROUTES.map((r) => (
                <button
                  key={r.id}
                  onClick={() => prefillRoute(r.id)}
                  className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-[#E81932]/5 hover:border-[#E81932]/20 border border-transparent transition-all text-sm"
                >
                  <div className="font-mono font-bold text-[#E81932] text-xs">{r.flightNumber}</div>
                  <div className="text-gray-600 text-xs">{r.departure.split("(")[1]?.replace(")","") ?? ""} → {r.arrival.split("(")[1]?.replace(")","") ?? ""} · {r.duration}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <Section title="Flight Information">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Flight Number" value={form.flightNumber} onChange={(v) => update("flightNumber", v)} placeholder="e.g. THY081" required />
                <Field label="Date" value={form.date} onChange={(v) => update("date", v)} placeholder="" type="date" required />
                <Field label="Departure (ICAO/IATA)" value={form.departure} onChange={(v) => update("departure", v)} placeholder="e.g. IST" required />
                <Field label="Arrival (ICAO/IATA)" value={form.arrival} onChange={(v) => update("arrival", v)} placeholder="e.g. LHR" required />
                <Field label="Departure Time (UTC)" value={form.departureTime} onChange={(v) => update("departureTime", v)} placeholder="e.g. 0800" />
                <Field label="Arrival Time (UTC)" value={form.arrivalTime} onChange={(v) => update("arrivalTime", v)} placeholder="e.g. 1148" />
              </div>
            </Section>

            <Section title="Aircraft & Route">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Aircraft Type</label>
                  <select value={form.aircraft} onChange={(e) => update("aircraft", e.target.value)} className="ta-input" required>
                    <option value="">Select aircraft...</option>
                    {FLEET.map((f) => <option key={f.id}>{f.type}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Network</label>
                  <select value={form.network} onChange={(e) => update("network", e.target.value)} className="ta-input">
                    <option>VATSIM</option>
                    <option>IVAO</option>
                    <option>PilotEdge</option>
                    <option>Offline</option>
                  </select>
                </div>
                <Field label="Flight Duration" value={form.duration} onChange={(v) => update("duration", v)} placeholder="e.g. 3h 48m" required />
                <Field label="Distance (nm)" value={form.distance} onChange={(v) => update("distance", v)} placeholder="e.g. 2461" type="number" />
                <Field label="Cruise Altitude" value={form.cruiseAlt} onChange={(v) => update("cruiseAlt", v)} placeholder="e.g. FL350" />
                <Field label="Passengers / Cargo" value={form.passengers} onChange={(v) => update("passengers", v)} placeholder="e.g. 280 pax" />
              </div>
            </Section>

            <Section title="Performance Data">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Landing Rate (fpm)</label>
                  <input
                    type="number"
                    value={form.landingRate}
                    onChange={(e) => update("landingRate", e.target.value)}
                    placeholder="e.g. -142 (negative = touchdown)"
                    className="ta-input"
                    required
                  />
                  {form.landingRate && (
                    <div className={`mt-1.5 text-xs font-bold ${
                      Math.abs(+form.landingRate) < 100 ? "text-green-600" :
                      Math.abs(+form.landingRate) < 200 ? "text-blue-600" :
                      Math.abs(+form.landingRate) < 300 ? "text-yellow-600" :
                      "text-red-600"
                    }`}>
                      {Math.abs(+form.landingRate) < 100 ? "🟢 Greaser!" :
                       Math.abs(+form.landingRate) < 200 ? "🔵 Smooth" :
                       Math.abs(+form.landingRate) < 300 ? "🟡 Firm" :
                       "🔴 Hard Landing"}
                    </div>
                  )}
                </div>
                <Field label="Fuel Used (kg)" value={form.fuel} onChange={(v) => update("fuel", v)} placeholder="e.g. 42800" type="number" />
              </div>
            </Section>

            <Section title="Remarks">
              <textarea
                value={form.remarks}
                onChange={(e) => update("remarks", e.target.value)}
                placeholder="Any notes about the flight, weather, ATC service, incidents..."
                rows={4}
                className="ta-input resize-none"
              />
              <label className="flex items-center gap-2 mt-3 cursor-pointer text-sm text-gray-600">
                <input type="checkbox" checked={form.altRoute} onChange={(e) => update("altRoute", e.target.checked)} className="accent-[#E81932]" />
                I deviated from the scheduled route (alternate destination, diversion, etc.)
              </label>
            </Section>

            <div className="pt-4 flex justify-end gap-3">
              <button type="button" onClick={() => setForm({ ...form, flightNumber: "", departure: "", arrival: "" })} className="ta-btn-secondary">
                Reset
              </button>
              <button type="submit" disabled={loading} className="ta-btn-primary flex items-center gap-2 px-8 disabled:opacity-60">
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Submitting...</>
                ) : "Submit PIREP"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-7">
      <h4 className="font-bold text-[#0D1B2A] text-sm uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">{title}</h4>
      {children}
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", required }: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-1.5">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="ta-input" required={required} />
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
