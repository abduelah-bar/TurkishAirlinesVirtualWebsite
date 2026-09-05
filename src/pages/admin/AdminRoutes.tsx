import { useState } from "react";
import { ROUTES } from "../../data/mockData";

export default function AdminRoutes() {
  const [routes, setRoutes] = useState(ROUTES);
  const [adding, setAdding] = useState(false);
  const [newRoute, setNewRoute] = useState({
    flightNumber: "", departure: "", arrival: "", distance: "", duration: "", aircraft: "", level: "Junior", status: "Active",
  });

  const addRoute = () => {
    if (!newRoute.flightNumber) return;
    setRoutes((prev) => [
      ...prev,
      { id: `R${prev.length + 1}`, ...newRoute, distance: parseInt(newRoute.distance) || 0 },
    ]);
    setAdding(false);
    setNewRoute({ flightNumber: "", departure: "", arrival: "", distance: "", duration: "", aircraft: "", level: "Junior", status: "Active" });
  };

  const toggleRouteStatus = (id: string) => {
    setRoutes((prev) => prev.map((r) => r.id === id ? { ...r, status: r.status === "Active" ? "Suspended" : "Active" } : r));
  };

  return (
    <div className="p-8 page-enter">
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="text-[#E81932] font-bold text-sm uppercase tracking-wider mb-1">Network Management</div>
          <h1 className="text-3xl font-black text-[#0D1B2A]">Route Manager</h1>
          <p className="text-gray-500 mt-1">{routes.length} routes · {routes.filter((r) => r.status === "Active").length} active</p>
        </div>
        <button onClick={() => setAdding(true)} className="ta-btn-primary">+ Add Route</button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="ta-table">
          <thead>
            <tr>
              <th>Flight #</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Aircraft</th>
              <th>Distance</th>
              <th>Duration</th>
              <th>Min Rank</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route) => (
              <tr key={route.id}>
                <td className="font-mono font-bold text-[#E81932]">{route.flightNumber}</td>
                <td className="text-sm">{route.departure}</td>
                <td className="text-sm">{route.arrival}</td>
                <td className="text-xs text-gray-500">{route.aircraft}</td>
                <td className="font-mono text-sm">{route.distance} nm</td>
                <td className="font-mono text-sm">{route.duration}</td>
                <td>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    route.level === "Captain" ? "bg-red-100 text-red-700" :
                    route.level === "Senior First Officer" ? "bg-orange-100 text-orange-700" :
                    route.level === "First Officer" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                  }`}>{route.level}</span>
                </td>
                <td>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${route.status === "Active" ? "badge-active" : "badge-rejected"}`}>
                    {route.status}
                  </span>
                </td>
                <td>
                  <button onClick={() => toggleRouteStatus(route.id)} className="text-xs font-bold text-blue-600 hover:underline mr-2">
                    {route.status === "Active" ? "Suspend" : "Activate"}
                  </button>
                  <button className="text-xs font-bold text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {adding && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setAdding(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between mb-6">
              <h3 className="font-black text-xl text-[#0D1B2A]">Add New Route</h3>
              <button onClick={() => setAdding(false)} className="text-gray-400 text-xl">✕</button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {[
                ["Flight Number", "flightNumber", "THY999"],
                ["Departure", "departure", "Istanbul (IST)"],
                ["Arrival", "arrival", "Madrid (MAD)"],
                ["Distance (nm)", "distance", "2800"],
                ["Duration", "duration", "4h 30m"],
                ["Aircraft", "aircraft", "A330-300"],
              ].map(([label, field, ph]) => (
                <div key={field}>
                  <label className="block text-sm font-bold text-gray-700 mb-1">{label}</label>
                  <input
                    value={(newRoute as any)[field]}
                    onChange={(e) => setNewRoute((p) => ({ ...p, [field]: e.target.value }))}
                    placeholder={ph}
                    className="ta-input"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Minimum Rank</label>
                <select value={newRoute.level} onChange={(e) => setNewRoute((p) => ({ ...p, level: e.target.value }))} className="ta-input">
                  {["Junior", "First Officer", "Senior First Officer", "Captain"].map((r) => <option key={r}>{r}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setAdding(false)} className="flex-1 ta-btn-secondary">Cancel</button>
              <button onClick={addRoute} className="flex-1 ta-btn-primary">Add Route</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
