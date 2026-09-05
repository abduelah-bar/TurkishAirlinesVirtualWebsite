import { STATS, PIREPS, APPLICATIONS, PILOTS } from "../../data/mockData";

export default function AdminDashboard() {
  const pendingApps = APPLICATIONS.filter((a) => a.status === "pending").length;
  const pendingPireps = PIREPS.filter((p) => p.status === "Pending").length;

  return (
    <div className="p-8 page-enter">
      <div className="mb-8">
        <div className="text-[#E81932] font-bold text-sm uppercase tracking-wider mb-1">Administration</div>
        <h1 className="text-3xl font-black text-[#0D1B2A]">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Turkish Airlines Virtual — Operations Overview</p>
      </div>

      {/* Alerts */}
      {(pendingApps > 0 || pendingPireps > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {pendingApps > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center gap-3">
              <span className="text-2xl">📋</span>
              <div>
                <div className="font-bold text-yellow-800">{pendingApps} Pending Application{pendingApps > 1 ? "s" : ""}</div>
                <a href="/admin/applications" className="text-yellow-600 text-sm hover:underline">Review now →</a>
              </div>
            </div>
          )}
          {pendingPireps > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
              <span className="text-2xl">✈️</span>
              <div>
                <div className="font-bold text-blue-800">{pendingPireps} PIREP{pendingPireps > 1 ? "s" : ""} Awaiting Review</div>
                <a href="/admin/pireps" className="text-blue-600 text-sm hover:underline">Review now →</a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Key metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <MetricCard label="Total Pilots" value={STATS.totalPilots} sub="registered" color="red" icon="👥" />
        <MetricCard label="Active Pilots" value={STATS.activePilots} sub="this week" color="green" icon="✅" />
        <MetricCard label="Total Flights" value={STATS.totalFlights} sub="all time" color="blue" icon="✈️" />
        <MetricCard label="Total Hours" value={STATS.totalHours} sub="all time" color="gold" icon="⏱️" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <MetricCard label="This Month" value={STATS.flightsThisMonth} sub="flights" color="navy" icon="📅" />
        <MetricCard label="This Month" value={STATS.hoursThisMonth} sub="hours" color="navy" icon="🕐" />
        <MetricCard label="Applications" value={pendingApps} sub="pending" color="yellow" icon="📋" />
        <MetricCard label="PIREPs" value={pendingPireps} sub="pending review" color="orange" icon="📄" />
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent PIREPs */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="font-bold text-[#0D1B2A] mb-5">Recent PIREPs</h3>
          <div className="space-y-3">
            {PIREPS.map((p) => (
              <div key={p.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#E81932] text-xs">{p.flightNumber}</span>
                    <span className="text-xs text-gray-400">{p.departure}→{p.arrival}</span>
                  </div>
                  <div className="text-xs text-gray-500">{p.pilotName} · {p.date}</div>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.status === "Approved" ? "badge-approved" : "badge-pending"}`}>
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pilot status overview */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="font-bold text-[#0D1B2A] mb-5">Top Pilots (by Hours)</h3>
          <div className="space-y-3">
            {[...PILOTS].sort((a, b) => b.hours - a.hours).slice(0, 5).map((p, i) => (
              <div key={p.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${i === 0 ? "bg-yellow-400 text-white" : i === 1 ? "bg-gray-300 text-gray-700" : i === 2 ? "bg-orange-400 text-white" : "bg-gray-100 text-gray-500"}`}>
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm text-gray-900">{p.name}</div>
                  <div className="text-xs text-gray-400">{p.rank}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm text-[#0D1B2A]">{p.hours.toFixed(0)}h</div>
                  <div className="text-xs text-gray-400">{p.flights} flights</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, sub, color, icon }: { label: string; value: number; sub: string; color: string; icon: string }) {
  const borders: Record<string, string> = {
    red: "border-l-[#E81932]", green: "border-l-green-500", blue: "border-l-blue-500",
    gold: "border-l-[#C9A84C]", navy: "border-l-[#0D1B2A]", yellow: "border-l-yellow-500", orange: "border-l-orange-500",
  };
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 border-l-4 ${borders[color] || "border-l-gray-400"} p-5 shadow-sm stat-card`}>
      <div className="text-xl mb-1">{icon}</div>
      <div className="text-2xl font-black text-[#0D1B2A]">{value.toLocaleString()}</div>
      <div className="text-xs text-gray-400 mt-0.5">{label}</div>
      <div className="text-xs text-gray-500">{sub}</div>
    </div>
  );
}
