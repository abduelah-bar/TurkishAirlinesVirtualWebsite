import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginEmbed } from "../utils/discord";

export default function Login() {
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [cid, setCid] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (isAuthenticated) {
    setTimeout(() => navigate(user?.role === "admin" ? "/admin" : "/pilot"), 100);
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(cid, password);
    setLoading(false);
    if (result.success) {
      const u = { cid, name: "Pilot", role: "pilot" };
      await loginEmbed({ name: "Pilot", cid, role: "pilot" });
      navigate(cid === "9999999" ? "/admin" : "/pilot");
    } else {
      setError(result.error || "Login failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex page-enter">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=900&h=1200&fit=crop&auto=format"
          alt="Boeing 777 cockpit"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D1B2A]/90 to-[#E81932]/40" />
        <div className="relative p-12 flex flex-col justify-between text-white">
          <div>
            <div className="flex items-center gap-3 mb-16">
              <div className="w-10 h-10 bg-ta-gradient rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                </svg>
              </div>
              <div>
                <div className="text-[#E81932] font-black text-lg leading-none">TURKISH</div>
                <div className="text-white/70 text-xs tracking-widest uppercase">Airlines Virtual</div>
              </div>
            </div>

            <h2 className="font-display text-4xl font-bold mb-4">Welcome back,<br />Captain.</h2>
            <p className="text-white/60 text-base leading-relaxed max-w-xs">
              Sign in with your VATSIM credentials to access the pilot portal, file PIREPs, and manage your flights.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-white/70 text-sm">
              <span className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">✓</span>
              Authenticated via VATSIM OAuth
            </div>
            <div className="flex items-center gap-3 text-white/70 text-sm">
              <span className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">✓</span>
              Discord notifications for all activity
            </div>
            <div className="flex items-center gap-3 text-white/70 text-sm">
              <span className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">✓</span>
              Full flight logbook and PIREP history
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-ta-gradient rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
              </svg>
            </div>
            <div>
              <div className="text-[#E81932] font-black text-lg">TURKISH</div>
              <div className="text-gray-500 text-xs tracking-widest uppercase">Airlines Virtual</div>
            </div>
          </div>

          <h1 className="text-3xl font-black text-[#0D1B2A] mb-2">Sign In</h1>
          <p className="text-gray-500 text-sm mb-8">Use your VATSIM credentials to access the portal.</p>

          {/* Demo credentials hint */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-sm">
            <div className="font-bold text-blue-800 mb-2">Demo Credentials</div>
            <div className="text-blue-700 space-y-1">
              <div>🧑‍✈️ Pilot — CID: <code className="font-mono bg-blue-100 px-1 rounded">1234567</code> / Pass: <code className="font-mono bg-blue-100 px-1 rounded">pilot123</code></div>
              <div>👑 Admin — CID: <code className="font-mono bg-blue-100 px-1 rounded">9999999</code> / Pass: <code className="font-mono bg-blue-100 px-1 rounded">admin123</code></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">VATSIM CID</label>
              <input
                type="text"
                value={cid}
                onChange={(e) => setCid(e.target.value)}
                placeholder="e.g. 1234567"
                className="ta-input"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your VATSIM password"
                className="ta-input"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="ta-btn-primary w-full py-3 text-base flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Authenticating via VATSIM...
                </>
              ) : (
                "Sign In with VATSIM"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Not a member yet?{" "}
            <Link to="/apply" className="text-[#E81932] font-bold hover:underline">Apply to Join</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
