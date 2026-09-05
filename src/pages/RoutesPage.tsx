import { useState } from "react";
import { ROUTES } from "../data/mockData";

export default function RoutesPage() {
  const [filter, setFilter] = useState("All");
  const levels = ["All", "Junior", "First Officer", "Senior First Officer", "Captain"];
  const filtered = filter === "All" ? ROUTES : ROUTES.filter((r) => r.level === filter);

  return (
    <div className="page-enter">
      <div className="relative bg-[#0D1B2A] py-20 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1800&h=400&fit=crop&auto=format"
          alt="Routes"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative max-w-7xl mx-auto px-4 text-center text-white">
          <span className="text-[#E81932] font-bold text-sm uppercase tracking-widest">Network</span>
          <h1 className="font-display text-5xl font-bold mt-2 mb-4">Route Network</h1>
          <p className="text-white/60 text-lg">{ROUTES.length} active routes across {new Set(ROUTES.map(r => r.departure)).size} departure airports</p>
        </div>
      </div>

      <div className="bg-[#E81932] text-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2">
            {levels.map((l) => (
              <button
                key={l}
                onClick={() => setFilter(l)}
                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${filter === l ? "bg-white text-[#E81932]" : "bg-white/20 hover:bg-white/30"}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="ta-table">
            <thead>
              <tr>
                <th>Flight</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Aircraft</th>
                <th>Distance</th>
                <th>Duration</th>
                <th>Min. Rank</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((route) => (
                <tr key={route.id}>
                  <td><span className="font-mono font-bold text-[#E81932]">{route.flightNumber}</span></td>
                  <td><span className="font-semibold">{route.departure}</span></td>
                  <td><span className="font-semibold">{route.arrival}</span></td>
                  <td className="text-gray-600">{route.aircraft}</td>
                  <td className="font-mono text-sm">{route.distance} nm</td>
                  <td className="font-mono text-sm">{route.duration}</td>
                  <td>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      route.level === "Captain" ? "bg-red-100 text-red-700" :
                      route.level === "Senior First Officer" ? "bg-orange-100 text-orange-700" :
                      route.level === "First Officer" ? "bg-blue-100 text-blue-700" :
                      "bg-green-100 text-green-700"
                    }`}>{route.level}</span>
                  </td>
                  <td>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${route.status === "Active" ? "badge-active" : "badge-pending"}`}>
                      {route.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
