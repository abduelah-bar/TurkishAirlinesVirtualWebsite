import { useState } from "react";
import { PILOTS } from "../../data/mockData";

export default function AdminPilots() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<typeof PILOTS[0] | null>(null);

  const filtered = PILOTS.filter((p) => {
    const matchSearch = search === "" || p.name.toLowerCase().includes(search.toLowerCase()) || p.cid.includes(search);
    const matchFilter = filter === "All" || p.status === filter.toLowerCase();
    return matchSearch && matchFilter;
  });

  return (
    <div className="p-8 page-enter">
      <div className="mb-8">
        <div className="text-[#E81932] font-bold text-sm uppercase tracking-wider mb-1">Roster Management</div>
        <h1 className="text-3xl font-black text-[#0D1B2A]">Pilot Roster</h1>
        <p className="text-gray-500 mt-1">{PILOTS.length} registered pilots</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or CID..."
          className="ta-input max-w-xs"
        />
        {["All", "Active", "Inactive", "Probation"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${filter === f ? "bg-[#E81932] text-white" : "bg-white text-gray-500 border border-gray-200"}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="ta-table">
          <thead>
            <tr>
              <th>Pilot</th>
              <th>CID</th>
              <th>Rank</th>
              <th>Hub</th>
              <th>Hours</th>
              <th>Flights</th>
              <th>Joined</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((pilot) => (
              <tr key={pilot.id}>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-ta-gradient rounded-full flex items-center justify-center text-white text-xs font-black">
                      {pilot.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{pilot.name}</div>
                      <div className="text-xs text-gray-400">{pilot.email}</div>
                    </div>
                  </div>
                </td>
                <td className="font-mono text-[#E81932] font-bold text-xs">{pilot.cid}</td>
                <td className="text-sm">{pilot.rank}</td>
                <td className="text-sm">{pilot.hub}</td>
                <td className="font-bold font-mono text-sm">{pilot.hours.toFixed(0)}h</td>
                <td className="font-mono text-sm">{pilot.flights}</td>
                <td className="font-mono text-xs">{pilot.joinDate}</td>
                <td>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    pilot.status === "active" ? "badge-active" :
                    pilot.status === "probation" ? "badge-pending" : "bg-gray-100 text-gray-500"
                  }`}>{pilot.status}</span>
                </td>
                <td>
                  <button onClick={() => setSelected(pilot)} className="text-[#E81932] text-xs font-bold hover:underline">
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pilot detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-ta-gradient rounded-full flex items-center justify-center text-white text-2xl font-black">
                  {selected.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-black text-xl text-[#0D1B2A]">{selected.name}</h3>
                  <p className="text-[#E81932] font-bold text-sm">{selected.rank}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 text-xl">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                ["VATSIM CID", selected.cid],
                ["Pilot ID", selected.id],
                ["Email", selected.email],
                ["Hub", selected.hub],
                ["Total Hours", `${selected.hours.toFixed(1)}h`],
                ["Total Flights", selected.flights.toString()],
                ["Joined", selected.joinDate],
                ["Last Flight", selected.lastFlight],
              ].map(([l, v]) => (
                <div key={l}>
                  <div className="text-xs text-gray-400">{l}</div>
                  <div className="font-semibold text-gray-900 text-sm font-mono">{v}</div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Rank</label>
                <select className="ta-input text-sm" defaultValue={selected.rank}>
                  {["Student Pilot", "Junior First Officer", "First Officer", "Senior First Officer", "Captain", "Senior Captain", "Chief Pilot"].map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Status</label>
                <select className="ta-input text-sm" defaultValue={selected.status}>
                  <option value="active">Active</option>
                  <option value="probation">Probation</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button className="flex-1 ta-btn-primary text-sm">Save Changes</button>
              <button className="flex-1 ta-btn-secondary text-sm text-red-600 border-red-200 hover:bg-red-50">Remove Pilot</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
