import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

const NAV = [
  { to: "/pilot", label: "Dashboard", icon: "📊", end: true },
  { to: "/pilot/pirep", label: "File PIREP", icon: "✈️" },
  { to: "/pilot/logbook", label: "My Logbook", icon: "📋" },
  { to: "/pilot/schedule", label: "Schedule", icon: "📅" },
  { to: "/pilot/fleet", label: "Fleet Guide", icon: "🛫" },
  { to: "/pilot/profile", label: "My Profile", icon: "👤" },
];

export default function PilotLayout() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0D1B2A] text-white flex-shrink-0 flex flex-col min-h-screen sticky top-16 h-[calc(100vh-64px)]">
        {/* Pilot info */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-ta-gradient rounded-xl flex items-center justify-center text-white text-lg font-black">
              {user!.name.charAt(0)}
            </div>
            <div>
              <div className="font-bold text-sm">{user!.name}</div>
              <div className="text-white/50 text-xs">{user!.vatsimCid}</div>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg px-3 py-2 text-center">
            <div className="text-[#E81932] font-bold text-xs">{user!.rank}</div>
            <div className="text-white/50 text-xs mt-0.5">{user!.hub}</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {NAV.map(({ to, label, icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-[#E81932] text-white"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`
              }
            >
              <span>{icon}</span> {label}
            </NavLink>
          ))}
        </nav>

        {/* Quick stats */}
        <div className="p-4 border-t border-white/10">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <div className="font-black text-white text-lg">{user!.totalHours.toFixed(0)}</div>
              <div className="text-white/40 text-xs">Hours</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <div className="font-black text-white text-lg">{user!.totalFlights}</div>
              <div className="text-white/40 text-xs">Flights</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
