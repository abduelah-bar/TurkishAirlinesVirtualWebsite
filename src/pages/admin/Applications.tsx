import { useState } from "react";
import { APPLICATIONS } from "../../data/mockData";
import { applicationStatusEmbed } from "../../utils/discord";

type App = typeof APPLICATIONS[0];

export default function Applications() {
  const [apps, setApps] = useState(APPLICATIONS);
  const [selected, setSelected] = useState<App | null>(null);
  const [filter, setFilter] = useState("All");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const filtered = filter === "All" ? apps : apps.filter((a) => a.status === filter.toLowerCase());

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const app = apps.find((a) => a.id === id)!;
    await applicationStatusEmbed({ name: app.name, cid: app.cid, status, reason });
    setApps((prev) => prev.map((a) => a.id === id ? { ...a, status, rejectionReason: reason } : a));
    setLoading(false);
    setSelected(null);
    setReason("");
  };

  return (
    <div className="p-8 page-enter">
      <div className="mb-8">
        <div className="text-[#E81932] font-bold text-sm uppercase tracking-wider mb-1">HR Management</div>
        <h1 className="text-3xl font-black text-[#0D1B2A]">Pilot Applications</h1>
        <p className="text-gray-500 mt-1">Review and process new pilot applications.</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {["All", "Pending", "Approved", "Rejected"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${filter === f ? "bg-[#E81932] text-white" : "bg-white text-gray-500 border border-gray-200 hover:border-[#E81932]/30"}`}>
            {f} <span className="ml-1 opacity-70">{f === "All" ? apps.length : apps.filter((a) => a.status === f.toLowerCase()).length}</span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="ta-table">
          <thead>
            <tr>
              <th>Applicant</th>
              <th>VATSIM CID</th>
              <th>Hours</th>
              <th>Hub</th>
              <th>Applied</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((app) => (
              <tr key={app.id}>
                <td>
                  <div className="font-semibold text-gray-900">{app.name}</div>
                  <div className="text-xs text-gray-400">{app.email}</div>
                </td>
                <td className="font-mono font-bold text-[#E81932]">{app.cid}</td>
                <td className="font-bold">{app.hours}h</td>
                <td>{app.hub}</td>
                <td className="font-mono text-xs">{app.appliedDate}</td>
                <td>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    app.status === "approved" ? "badge-approved" :
                    app.status === "rejected" ? "badge-rejected" : "badge-pending"
                  }`}>{app.status.charAt(0).toUpperCase() + app.status.slice(1)}</span>
                </td>
                <td>
                  <button
                    onClick={() => { setSelected(app); setReason(""); }}
                    className="text-[#E81932] text-xs font-bold hover:underline"
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Review modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between mb-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-[#0D1B2A]">{selected.name}</h3>
                <p className="text-gray-500 text-sm">VATSIM CID: {selected.cid} · Applied: {selected.appliedDate}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-700 text-xl">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <InfoRow label="Email" value={selected.email} />
              <InfoRow label="VATSIM Hours" value={`${selected.hours}h`} />
              <InfoRow label="Preferred Hub" value={selected.hub} />
              <InfoRow label="Status" value={selected.status} />
            </div>

            <div className="bg-[#F8F8F8] rounded-xl p-5 mb-4">
              <div className="font-bold text-gray-700 mb-2 text-sm">Experience</div>
              <p className="text-gray-600 text-sm leading-relaxed">{selected.experience}</p>
            </div>
            <div className="bg-[#F8F8F8] rounded-xl p-5 mb-5">
              <div className="font-bold text-gray-700 mb-2 text-sm">Motivation</div>
              <p className="text-gray-600 text-sm leading-relaxed">{selected.motivation}</p>
            </div>

            {selected.status === "pending" && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  Reason (required for rejection, optional for approval)
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Add a note..."
                  rows={2}
                  className="ta-input resize-none mb-4"
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => updateStatus(selected.id, "approved")}
                    disabled={loading}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-lg text-sm transition-colors disabled:opacity-60"
                  >
                    {loading ? "Processing..." : "✓ Approve"}
                  </button>
                  <button
                    onClick={() => updateStatus(selected.id, "rejected")}
                    disabled={loading || !reason}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-lg text-sm transition-colors disabled:opacity-60"
                  >
                    ✕ Reject
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">Decision will be posted to Discord automatically.</p>
              </div>
            )}
            {selected.status !== "pending" && (
              <div className={`rounded-xl p-4 text-sm font-semibold text-center ${selected.status === "approved" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                Application {selected.status.toUpperCase()}
                {selected.status === "rejected" && (selected as any).rejectionReason && (
                  <div className="text-xs mt-1 opacity-80">{(selected as any).rejectionReason}</div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-gray-400">{label}</div>
      <div className="font-semibold text-gray-900 text-sm">{value}</div>
    </div>
  );
}
