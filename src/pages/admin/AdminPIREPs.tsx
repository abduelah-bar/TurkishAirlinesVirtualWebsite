import { useState } from "react";
import { PIREPS } from "../../data/mockData";
import { sendDiscordEmbed, COLORS } from "../../utils/discord";
import { useAuth } from "../../context/AuthContext";

export default function AdminPIREPs() {
  const { user } = useAuth();
  const [pireps, setPireps] = useState(PIREPS);
  const [selected, setSelected] = useState<typeof PIREPS[0] | null>(null);
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);

  const updateStatus = async (id: string, status: "Approved" | "Rejected") => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const p = pireps.find((x) => x.id === id)!;
    await sendDiscordEmbed({
      title: `${status === "Approved" ? "✅" : "❌"} PIREP ${status}`,
      color: status === "Approved" ? COLORS.green : COLORS.red,
      fields: [
        { name: "Flight", value: p.flightNumber, inline: true },
        { name: "Route", value: `${p.departure} → ${p.arrival}`, inline: true },
        { name: "Pilot", value: `${p.pilotName} (${p.pilotId})`, inline: true },
        { name: "Reviewed by", value: user!.name, inline: true },
        ...(remarks ? [{ name: "Note", value: remarks }] : []),
      ],
      footer: { text: "Turkish Airlines Virtual • PIREP Review" },
      timestamp: new Date().toISOString(),
    });
    setPireps((prev) => prev.map((x) => x.id === id ? { ...x, status } : x));
    setLoading(false);
    setSelected(null);
    setRemarks("");
  };

  return (
    <div className="p-8 page-enter">
      <div className="mb-8">
        <div className="text-[#E81932] font-bold text-sm uppercase tracking-wider mb-1">Flight Operations</div>
        <h1 className="text-3xl font-black text-[#0D1B2A]">PIREP Review</h1>
        <p className="text-gray-500 mt-1">{pireps.filter((p) => p.status === "Pending").length} awaiting review</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="ta-table">
          <thead>
            <tr>
              <th>Flight</th>
              <th>Pilot</th>
              <th>Route</th>
              <th>Aircraft</th>
              <th>Date</th>
              <th>Duration</th>
              <th>Landing</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pireps.map((p) => (
              <tr key={p.id} className={p.status === "Pending" ? "bg-yellow-50/50" : ""}>
                <td className="font-mono font-bold text-[#E81932]">{p.flightNumber}</td>
                <td className="text-sm font-semibold">{p.pilotName}</td>
                <td className="text-sm">{p.departure} → {p.arrival}</td>
                <td className="text-xs text-gray-500">{p.aircraft}</td>
                <td className="font-mono text-xs">{p.date}</td>
                <td className="font-mono text-sm">{p.duration}</td>
                <td className={`font-mono text-sm font-bold ${Math.abs(+p.landingRate) < 100 ? "text-green-600" : Math.abs(+p.landingRate) < 200 ? "text-blue-600" : Math.abs(+p.landingRate) < 300 ? "text-yellow-600" : "text-red-600"}`}>
                  {p.landingRate} fpm
                </td>
                <td>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.status === "Approved" ? "badge-approved" : p.status === "Rejected" ? "badge-rejected" : "badge-pending"}`}>
                    {p.status}
                  </span>
                </td>
                <td>
                  <button onClick={() => { setSelected(p); setRemarks(""); }} className="text-[#E81932] text-xs font-bold hover:underline">
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl max-w-xl w-full p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between mb-6">
              <div>
                <h3 className="font-black text-xl text-[#0D1B2A]">PIREP Review — {selected.flightNumber}</h3>
                <p className="text-gray-500 text-sm">{selected.pilotName} · {selected.date}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 text-xl">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
              {[
                ["Route", `${selected.departure} → ${selected.arrival}`],
                ["Aircraft", selected.aircraft],
                ["Duration", selected.duration],
                ["Distance", `${selected.distance} nm`],
                ["Landing Rate", `${selected.landingRate} fpm`],
                ["Fuel", `${Number(selected.fuel).toLocaleString()} kg`],
                ["Network", selected.network],
                ["Status", selected.status],
              ].map(([l, v]) => (
                <div key={l}>
                  <div className="text-xs text-gray-400">{l}</div>
                  <div className="font-semibold text-gray-900 text-sm">{v}</div>
                </div>
              ))}
            </div>

            {selected.remarks && (
              <div className="bg-[#F8F8F8] rounded-xl p-4 text-sm text-gray-600 mb-4">
                <div className="font-bold text-gray-700 mb-1">Pilot Remarks</div>
                {selected.remarks}
              </div>
            )}

            {selected.status === "Pending" && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Review Note (optional)</label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Optional note for the pilot..."
                  rows={2}
                  className="ta-input resize-none mb-4"
                />
                <div className="flex gap-3">
                  <button onClick={() => updateStatus(selected.id, "Approved")} disabled={loading} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-lg text-sm disabled:opacity-60">
                    {loading ? "..." : "✓ Approve"}
                  </button>
                  <button onClick={() => updateStatus(selected.id, "Rejected")} disabled={loading} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-lg text-sm disabled:opacity-60">
                    ✕ Reject
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
