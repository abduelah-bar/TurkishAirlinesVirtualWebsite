import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setDropdownOpen(false);
  };

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-[#0D1B2A] text-white text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span className="opacity-70">Turkish Airlines Virtual — The Premier Virtual Airline</span>
          <div className="flex items-center gap-4 opacity-70">
            <span>VATSIM Integrated</span>
            <span>|</span>
            <span>Discord Community</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-ta-gradient rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
              </svg>
            </div>
            <div>
              <div className="text-[#E81932] font-black text-lg leading-none tracking-tight">TURKISH</div>
              <div className="text-[#0D1B2A] font-bold text-xs tracking-widest uppercase">Airlines Virtual</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/" label="Home" active={location.pathname === "/"} />
            <NavLink to="/routes" label="Routes" active={isActive("/routes")} />
            <NavLink to="/fleet" label="Fleet" active={isActive("/fleet")} />
            <NavLink to="/apply" label="Join Us" active={isActive("/apply")} highlight />

            {isAuthenticated && (
              <>
                <NavLink to="/pilot" label="Pilot Portal" active={isActive("/pilot")} />
                {isAdmin && <NavLink to="/admin" label="Admin" active={isActive("/admin")} />}
              </>
            )}
          </div>

          {/* Auth section */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-ta-gradient rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user!.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-gray-900">{user!.name.split(" ")[0]}</div>
                    <div className="text-xs text-gray-500">{user!.rank}</div>
                  </div>
                  <svg className={`w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50">
                    <Link to="/pilot/profile" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setDropdownOpen(false)}>
                      <span>👤</span> My Profile
                    </Link>
                    <Link to="/pilot/logbook" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setDropdownOpen(false)}>
                      <span>📋</span> Logbook
                    </Link>
                    <Link to="/pilot/pirep" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setDropdownOpen(false)}>
                      <span>✈️</span> File PIREP
                    </Link>
                    <div className="border-t border-gray-100 my-1" />
                    <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full text-left">
                      <span>🚪</span> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="ta-btn-primary text-sm">
                  VATSIM Login
                </button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <div className={`w-5 h-0.5 bg-gray-700 mb-1.5 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <div className={`w-5 h-0.5 bg-gray-700 mb-1.5 transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <div className={`w-5 h-0.5 bg-gray-700 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          <MobileLink to="/" label="Home" onClick={() => setMenuOpen(false)} />
          <MobileLink to="/routes" label="Routes" onClick={() => setMenuOpen(false)} />
          <MobileLink to="/fleet" label="Fleet" onClick={() => setMenuOpen(false)} />
          <MobileLink to="/apply" label="Join Us" onClick={() => setMenuOpen(false)} />
          {isAuthenticated && (
            <>
              <MobileLink to="/pilot" label="Pilot Portal" onClick={() => setMenuOpen(false)} />
              {isAdmin && <MobileLink to="/admin" label="Admin Panel" onClick={() => setMenuOpen(false)} />}
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-sm text-red-600 font-semibold">
                Sign Out
              </button>
            </>
          )}
          {!isAuthenticated && (
            <Link to="/login" className="block px-3 py-2" onClick={() => setMenuOpen(false)}>
              <button className="ta-btn-primary w-full">VATSIM Login</button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

function NavLink({ to, label, active, highlight }: { to: string; label: string; active: boolean; highlight?: boolean }) {
  return (
    <Link
      to={to}
      className={`nav-link text-sm font-700 transition-colors ${
        highlight
          ? "text-[#E81932] font-extrabold"
          : active
          ? "text-[#E81932] font-bold"
          : "text-gray-700 hover:text-[#E81932]"
      } ${active ? "active" : ""}`}
      style={{ fontWeight: active || highlight ? 700 : 600 }}
    >
      {label}
    </Link>
  );
}

function MobileLink({ to, label, onClick }: { to: string; label: string; onClick: () => void }) {
  return (
    <Link to={to} className="block px-3 py-2 text-sm font-semibold text-gray-700 hover:text-[#E81932] rounded-lg hover:bg-gray-50" onClick={onClick}>
      {label}
    </Link>
  );
}
