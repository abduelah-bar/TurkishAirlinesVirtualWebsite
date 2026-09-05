import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { PIREPS, ROUTES, RANKS } from "../../data/mockData";

export default function PilotDashboard() {
  const { user } = useAuth();
  if (!user) return null;

  const myPireps = PIREPS.filter((p) => p.pilotId === user.id).slice(0, 5);
  const currentRank = RANKS.find((r) => r.name === user.rank);
  const nextRank = RANKS.find((r) => r.minHours > user.totalHours);
  const hoursToNext = nextRank ? nextRank.minHours - user.totalHours : 0;
  const progress = nextRank
    ? ((user.totalHours - (currentRank?.minHours ?? 0)) / (nextRank.minHours - (currentRank?.minHours ?? 0))) * 100
    : 100;

  const eligibleRoutes = ROUTES.filter((r) => {
    const idx = RANKS.findIndex((rk) => rk.name === r.level);
    const myIdx = RANKS.findIndex((rk) => rk.name === user.rank);
    return myIdx >= idx;
  });

  return (
    <div className="p-8 page-enter">
      {/* Header */}
      <div className="mb-8">
        <div className="text-[#E81932] font-bold text-sm uppercase tracking-wider mb-1">Pilot Portal</div>
        <h1 className="text-3xl font-black text-[#0D1B2A]">Welcome back, {user.name.split(" ")[0]} ✈️</h1>
        <p className="text-gray-500 mt-1">Here's your flight summary and latest activity.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Hours" value={user.totalHours.toFixed(1)} unit="hrs" color="red" icon="⏱️" />
        <StatCard label="Total Flights" value={user.totalFlights.toString()} unit="flt" color="navy" icon="✈️" />
        <StatCard label="Current Rank" value={currentRank?.badge ?? "—"} unit={user.rank} color="gold" icon="🎖️" />
        <StatCard label="Home Hub" value={user.hub.split(" ")[1]?.replace("(","").replace(")","") ?? "IST"} unit={user.hub} color="green" icon="🏠" />
      </div>

      {/* Rank progress */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className="font-bold text-[#0D1B2A]">Rank Progression</h3>
            <p className="text-gray-500 text-sm">{user.rank} → {nextRank?.name ?? "Chief Pilot (Max)"}</p>
          </div>
          {nextRank && (
            <div className="text-right">
              <div className="text-2xl font-black text-[#E81932]">{hoursToNext.toFixed(1)}</div>
              <div className="text-xs text-gray-400">hours to next rank</div>
            </div>
          )}
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div
            className="bg-ta-gradient h-3 rounded-full transition-all"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>{currentRank?.minHours ?? 0}h ({currentRank?.name})</span>
          <span>{nextRank ? `${nextRank.minHours}h (${nextRank.name})` : "Max Rank Achieved 🏆"}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent PIREPs */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-bold text-[#0D1B2A]">Recent PIREPs</h3>
            <Link to="/pilot/logbook" className="text-[#E81932] text-xs font-bold hover:underline">View All</Link>
          </div>
          {myPireps.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <div className="text-3xl mb-2">✈️</div>
              <p className="text-sm">No PIREPs yet. File your first flight!</p>
              <Link to="/pilot/pirep"><button className="ta-btn-primary mt-3 text-sm">File PIREP</button></Link>
            </div>
          ) : (
            <div className="space-y-3">
              {myPireps.map((p) => (
                <div key={p.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <div className="font-mono text-sm font-bold text-[#E81932]">{p.flightNumber}</div>
                    <div className="text-xs text-gray-500">{p.departure} → {p.arrival} · {p.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-[#0D1B2A]">{p.duration}</div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.status === "Approved" ? "badge-approved" : "badge-pending"}`}>
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Available routes */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-bold text-[#0D1B2A]">Available Routes</h3>
            <Link to="/pilot/schedule" className="text-[#E81932] text-xs font-bold hover:underline">Full Schedule</Link>
          </div>
          <div className="space-y-3">
            {eligibleRoutes.slice(0, 5).map((r) => (
              <div key={r.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <div className="font-mono text-sm font-bold text-[#E81932]">{r.flightNumber}</div>
                  <div className="text-xs text-gray-500">{r.departure} → {r.arrival}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-gray-700">{r.duration}</div>
                  <div className="text-xs text-gray-400">{r.aircraft}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "File PIREP", icon: "✈️", to: "/pilot/pirep", color: "bg-[#E81932]" },
          { label: "View Schedule", icon: "📅", to: "/pilot/schedule", color: "bg-[#0D1B2A]" },
          { label: "My Logbook", icon: "📋", to: "/pilot/logbook", color: "bg-[#1a3a5c]" },
          { label: "My Profile", icon: "👤", to: "/pilot/profile", color: "bg-gray-700" },
        ].map((action) => (
          <Link key={action.to} to={action.to}>
            <div className={`${action.color} text-white rounded-xl p-5 text-center stat-card cursor-pointer`}>
              <div className="text-3xl mb-2">{action.icon}</div>
              <div className="font-bold text-sm">{action.label}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value, unit, color, icon }: { label: string; value: string; unit: string; color: string; icon: string }) {
  const colors = {
    red: "border-l-[#E81932]",
    navy: "border-l-[#0D1B2A]",
    gold: "border-l-[#C9A84C]",
    green: "border-l-green-500",
  };
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 border-l-4 ${colors[color as keyof typeof colors]} p-5 shadow-sm stat-card`}>
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-2xl font-black text-[#0D1B2A]">{value}</div>
      <div className="text-xs text-gray-400 mt-0.5">{label}</div>
      <div className="text-xs text-gray-500 font-semibold mt-1 truncate">{unit}</div>
    </div>
  );
}
