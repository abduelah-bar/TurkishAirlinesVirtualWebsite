import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#0D1B2A] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-ta-gradient rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                </svg>
              </div>
              <div>
                <div className="text-[#E81932] font-black text-base leading-none">TURKISH</div>
                <div className="text-white/70 text-xs tracking-widest uppercase">Airlines Virtual</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              The premier Turkish Airlines virtual airline, connecting aviation enthusiasts worldwide through VATSIM.
            </p>
            <div className="flex gap-3 mt-4">
              <SocialBtn label="Discord" icon="💬" />
              <SocialBtn label="VATSIM" icon="🌐" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[["Home", "/"], ["Routes", "/routes"], ["Fleet", "/fleet"], ["Join Us", "/apply"]].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="text-white/50 text-sm hover:text-[#E81932] transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pilot Resources */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Pilot Resources</h4>
            <ul className="space-y-2">
              {[["Pilot Portal", "/pilot"], ["File PIREP", "/pilot/pirep"], ["Schedule", "/pilot/schedule"], ["My Logbook", "/pilot/logbook"]].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="text-white/50 text-sm hover:text-[#E81932] transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* VATSIM & Network */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Network</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li>VATSIM Integrated</li>
              <li>Discord Community</li>
              <li>MSFS & X-Plane</li>
              <li>24/7 Operations</li>
            </ul>
            <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Active Pilots</div>
              <div className="text-2xl font-black text-white">98</div>
              <div className="text-xs text-white/40">online this week</div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-white/30 text-xs">
            © 2024 Turkish Airlines Virtual. Not affiliated with Turkish Airlines (Türk Hava Yolları A.O.). Fan project only.
          </p>
          <p className="text-white/30 text-xs">
            Powered by VATSIM • Built with ❤️ by aviation enthusiasts
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialBtn({ label, icon }: { label: string; icon: string }) {
  return (
    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold transition-colors">
      <span>{icon}</span> {label}
    </button>
  );
}
