import { useState } from "react";
import { ROUTES, FLEET, RANKS } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Schedule() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [hubFilter, setHubFilter] = useState("All");

  const myRankIdx = RANKS.findIndex((r) => r.name === user?.rank);

  const filtered = ROUTES.filter((r) => {
    const rankIdx = RANKS.findIndex((rk) => rk.name === r.level);
    const eligible = myRankIdx >= rankIdx;
    const matchSearch = search === "" || r.flightNumber.toLowerCase().includes(search.toLowerCase()) ||
      r.departure.toLowerCase().includes(search.toLowerCase()) ||
      r.arrival.toLowerCase().includes(search.toLowerCase());
    return eligible && matchSearch;
  });

  return (
    <div className="p-8 page-enter">
      <div className="mb-8">
        <div className="text-[#E81932] font-bold text-sm uppercase tracking-wider mb-1">Flight Planning</div>
        <h1 className="text-3xl font-black text-[#0D1B2A]">Schedule & Routes</h1>
        <p className="text-gray-500 mt-1">Routes available for your rank: <strong>{user?.rank}</strong></p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6 shadow-sm flex gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by flight number, departure, or arrival..."
          className="ta-input flex-1"
        />
      </div>

      {/* Route cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((route) => {
          const aircraft = FLEET.find((f) => f.type.includes(route.aircraft.split(" ")[0]));
          return (
            <div key={route.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm stat-card hover:border-[#E81932]/20 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="font-mono text-[#E81932] font-black text-lg">{route.flightNumber}</span>
                  <div className="text-xs text-gray-400 mt-0.5">{route.aircraft}</div>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  route.level === "Captain" ? "bg-red-100 text-red-700" :
                  route.level === "Senior First Officer" ? "bg-orange-100 text-orange-700" :
                  route.level === "First Officer" ? "bg-blue-100 text-blue-700" :
                  "bg-green-100 text-green-700"
                }`}>{route.level}</span>
              </div>

              {/* Route viz */}
              <div className="flex items-center gap-3 mb-4">
                <div>
                  <div className="font-black text-2xl text-[#0D1B2A]">{route.departure.match(/\((\w+)\)/)?.[1] ?? route.departure.slice(0,3)}</div>
                  <div className="text-xs text-gray-400 truncate max-w-[120px]">{route.departure.split("(")[0].trim()}</div>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="text-xs text-gray-400 mb-1">{route.duration}</div>
                  <div className="flex items-center w-full">
                    <div className="flex-1 h-px bg-gray-200" />
                    <svg className="w-4 h-4 text-[#E81932] mx-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                    </svg>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{route.distance} nm</div>
                </div>
                <div className="text-right">
                  <div className="font-black text-2xl text-[#0D1B2A]">{route.arrival.match(/\((\w+)\)/)?.[1] ?? route.arrival.slice(0,3)}</div>
                  <div className="text-xs text-gray-400 truncate max-w-[120px]">{route.arrival.split("(")[0].trim()}</div>
                </div>
              </div>

              <Link to={`/pilot/pirep?route=${route.id}`}>
                <button className="w-full ta-btn-primary text-sm py-2">
                  Fly This Route ✈️
                </button>
              </Link>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">🔍</div>
          <p className="font-semibold">No routes found for your search.</p>
        </div>
      )}
    </div>
  );
}
