import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { RANKS, PIREPS } from "../../data/mockData";

export default function Profile() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  if (!user) return null;

  const myPireps = PIREPS.filter((p) => p.pilotId === user.id);
  const currentRankIdx = RANKS.findIndex((r) => r.name === user.rank);
  const nextRank = RANKS[currentRankIdx + 1];
  const hoursToNext = nextRank ? nextRank.minHours - user.totalHours : 0;

  const avgLanding = myPireps.length > 0
    ? Math.round(myPireps.reduce((a, p) => a + Math.abs(+p.landingRate), 0) / myPireps.length)
    : 0;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-8 page-enter">
      <div className="mb-8">
        <div className="text-[#E81932] font-bold text-sm uppercase tracking-wider mb-1">Account</div>
        <h1 className="text-3xl font-black text-[#0D1B2A]">My Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm text-center">
            <div className="w-24 h-24 bg-ta-gradient rounded-full flex items-center justify-center text-white text-4xl font-black mx-auto mb-4">
              {user.name.charAt(0)}
            </div>
            <h2 className="text-xl font-black text-[#0D1B2A]">{user.name}</h2>
            <p className="text-[#E81932] font-bold text-sm mt-1">{user.rank}</p>
            <p className="text-gray-400 text-xs mt-1 font-mono">CID: {user.vatsimCid}</p>

            <div className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
              user.status === "active" ? "badge-active" :
              user.status === "probation" ? "badge-pending" : "bg-gray-100 text-gray-600"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${user.status === "active" ? "bg-blue-500" : user.status === "probation" ? "bg-yellow-500" : "bg-gray-400"}`} />
              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
            </div>

            <div className="mt-5 pt-5 border-t border-gray-100 grid grid-cols-2 gap-4">
              <div>
                <div className="text-xl font-black text-[#0D1B2A]">{user.totalHours.toFixed(0)}</div>
                <div className="text-xs text-gray-400">Hours</div>
              </div>
              <div>
                <div className="text-xl font-black text-[#0D1B2A]">{user.totalFlights}</div>
                <div className="text-xs text-gray-400">Flights</div>
              </div>
            </div>
          </div>

          {/* Rank card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-bold text-[#0D1B2A] mb-4">Rank Ladder</h3>
            <div className="space-y-2">
              {RANKS.map((rank, idx) => (
                <div key={rank.name} className={`flex items-center gap-3 p-2 rounded-lg ${idx === currentRankIdx ? "bg-[#E81932]/5 border border-[#E81932]/20" : ""}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${idx < currentRankIdx ? "bg-green-500 text-white" : idx === currentRankIdx ? "bg-[#E81932] text-white" : "bg-gray-100 text-gray-400"}`}>
                    {idx < currentRankIdx ? "✓" : rank.badge}
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm font-semibold ${idx === currentRankIdx ? "text-[#E81932]" : idx < currentRankIdx ? "text-gray-600" : "text-gray-300"}`}>
                      {rank.name}
                    </div>
                    <div className="text-xs text-gray-400">{rank.minHours}h</div>
                  </div>
                  {idx === currentRankIdx && <span className="text-xs text-[#E81932] font-bold">YOU</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <StatCard label="Avg Landing Rate" value={`${avgLanding} fpm`} icon="🛬" />
            <StatCard label="Member Since" value={user.joinDate} icon="📅" />
            <StatCard label="To Next Rank" value={nextRank ? `${hoursToNext.toFixed(0)}h` : "MAX"} icon="🎯" />
          </div>

          {/* Account info */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <h3 className="font-bold text-[#0D1B2A] mb-6">Account Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <InfoField label="Full Name" value={user.name} />
              <InfoField label="Email" value={user.email} />
              <InfoField label="VATSIM CID" value={user.vatsimCid} mono />
              <InfoField label="Discord" value={user.discordId ?? "Not linked"} />
              <InfoField label="Home Hub" value={user.hub} />
              <InfoField label="Pilot ID" value={user.id} mono />
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <h4 className="font-bold text-gray-700 mb-4">Preferences</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Preferred Simulator</label>
                  <select className="ta-input">
                    <option>MSFS 2020</option>
                    <option>MSFS 2024</option>
                    <option>X-Plane 12</option>
                    <option>P3D v5</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Notification Preferences</label>
                  <select className="ta-input">
                    <option>All notifications</option>
                    <option>PIREP updates only</option>
                    <option>None</option>
                  </select>
                </div>
              </div>
              <div className="mt-5 flex justify-end">
                <button onClick={handleSave} className={`ta-btn-primary flex items-center gap-2 ${saved ? "bg-green-500" : ""}`}>
                  {saved ? "✓ Saved!" : "Save Preferences"}
                </button>
              </div>
            </div>
          </div>

          {/* Awards */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <h3 className="font-bold text-[#0D1B2A] mb-5">Awards & Milestones</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Award icon="🛫" label="First Flight" earned />
              <Award icon="💯" label="100 Flights" earned={user.totalFlights >= 100} />
              <Award icon="⏰" label="100 Hours" earned={user.totalHours >= 100} />
              <Award icon="🌍" label="Long Haul" earned={myPireps.some((p) => +p.distance > 5000)} />
              <Award icon="🟢" label="Greaser" earned={myPireps.some((p) => Math.abs(+p.landingRate) < 100)} />
              <Award icon="⭐" label="500 Hours" earned={user.totalHours >= 500} />
              <Award icon="🏆" label="Captain" earned={user.rank === "Captain" || user.rank === "Senior Captain" || user.rank === "Chief Pilot"} />
              <Award icon="🌟" label="1000 Flights" earned={user.totalFlights >= 1000} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="font-black text-[#0D1B2A] text-lg">{value}</div>
      <div className="text-xs text-gray-400">{label}</div>
    </div>
  );
}

function InfoField({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">{label}</div>
      <div className={`text-sm font-semibold text-gray-900 ${mono ? "font-mono" : ""}`}>{value}</div>
    </div>
  );
}

function Award({ icon, label, earned }: { icon: string; label: string; earned: boolean }) {
  return (
    <div className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${earned ? "bg-[#E81932]/5 border-[#E81932]/20" : "bg-gray-50 border-gray-100 opacity-40 grayscale"}`}>
      <span className="text-2xl">{icon}</span>
      <span className="text-xs font-bold text-center text-gray-700">{label}</span>
      {earned && <span className="text-xs text-[#E81932] font-bold">✓ Earned</span>}
    </div>
  );
}
