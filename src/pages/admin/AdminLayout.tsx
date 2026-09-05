import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: "📊", end: true },
  { to: "/admin/pilots", label: "Pilots", icon: "👥" },
  { to: "/admin/applications", label: "Applications", icon: "📋" },
  { to: "/admin/fleet", label: "Fleet", icon: "🛫" },
  { to: "/admin/routes", label: "Routes", icon: "🗺️" },
  { to: "/admin/pireps", label: "PIREPs", icon: "✈️" },
  { to: "/admin/discord", label: "Discord Logs", icon: "💬" },
];

export default function AdminLayout() {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
    else if (!isAdmin) navigate("/pilot");
  }, [isAuthenticated, isAdmin]);

  if (!isAuthenticated || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">
      {/* Admin sidebar */}
      <aside className="w-64 bg-[#0D1B2A] text-white flex-shrink-0 flex flex-col min-h-screen sticky top-16 h-[calc(100vh-64px)]">
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#E81932] text-lg">🛡️</span>
            <span className="font-black text-white">Admin Panel</span>
          </div>
          <p className="text-white/40 text-xs">Turkish Airlines Virtual</p>
        </div>

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

        <div className="p-4 border-t border-white/10">
          <NavLink to="/pilot" className="flex items-center gap-2 text-white/50 hover:text-white text-xs font-semibold transition-colors">
            ← Back to Pilot Portal
          </NavLink>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
