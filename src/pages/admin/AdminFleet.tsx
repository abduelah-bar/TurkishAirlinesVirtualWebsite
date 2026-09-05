import { useState } from "react";
import { FLEET } from "../../data/mockData";
import { fleetUpdateEmbed } from "../../utils/discord";
import { useAuth } from "../../context/AuthContext";

export default function AdminFleet() {
  const { user } = useAuth();
  const [fleet, setFleet] = useState(FLEET);
  const [adding, setAdding] = useState(false);
  const [newAircraft, setNewAircraft] = useState({ registration: "", type: "", seats: "", range: "", hub: "Istanbul (IST)", msfsModel: "" });

  const toggleStatus = async (id: string) => {
    const aircraft = fleet.find((f) => f.id === id)!;
    const newStatus = aircraft.status === "Active" ? "Maintenance" : "Active";
    setFleet((prev) => prev.map((f) => f.id === id ? { ...f, status: newStatus } : f));
    await fleetUpdateEmbed({ action: `Status → ${newStatus}`, aircraft: `${aircraft.registration} (${aircraft.type})`, admin: user!.name });
  };

  const addAircraft = async () => {
    if (!newAircraft.registration || !newAircraft.type) return;
    const aircraft = {
      id: `F${fleet.length + 1}`.padStart(4, "0"),
      ...newAircraft,
      seats: parseInt(newAircraft.seats) || 0,
      status: "Active",
    };
    setFleet((prev) => [...prev, aircraft]);
    await fleetUpdateEmbed({ action: "Added to Fleet", aircraft: `${aircraft.registration} (${aircraft.type})`, admin: user!.name });
    setAdding(false);
    setNewAircraft({ registration: "", type: "", seats: "", range: "", hub: "Istanbul (IST)", msfsModel: "" });
  };

  return (
    <div className="p-8 page-enter">
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="text-[#E81932] font-bold text-sm uppercase tracking-wider mb-1">Fleet Management</div>
          <h1 className="text-3xl font-black text-[#0D1B2A]">Fleet Manager</h1>
          <p className="text-gray-500 mt-1">{fleet.length} aircraft · {fleet.filter((f) => f.status === "Active").length} active</p>
        </div>
        <button onClick={() => setAdding(true)} className="ta-btn-primary">+ Add Aircraft</button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="ta-table">
          <thead>
            <tr>
              <th>Registration</th>
              <th>Type</th>
              <th>Seats</th>
              <th>Range</th>
              <th>Hub</th>
              <th>MSFS Add-on</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fleet.map((aircraft) => (
              <tr key={aircraft.id}>
                <td className="font-mono font-bold text-[#E81932]">{aircraft.registration}</td>
                <td className="font-semibold">{aircraft.type}</td>
                <td>{aircraft.seats > 0 ? aircraft.seats : "Cargo"}</td>
                <td className="text-sm">{aircraft.range}</td>
                <td className="text-sm">{aircraft.hub}</td>
                <td className="text-xs text-gray-500">{aircraft.msfsModel}</td>
                <td>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    aircraft.status === "Active" ? "badge-active" :
                    aircraft.status === "Maintenance" ? "badge-pending" : "bg-gray-100 text-gray-500"
                  }`}>{aircraft.status}</span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button onClick={() => toggleStatus(aircraft.id)} className="text-xs font-bold text-blue-600 hover:underline">
                      {aircraft.status === "Active" ? "→ Maint." : "→ Active"}
                    </button>
                    <button className="text-xs font-bold text-red-500 hover:underline">Remove</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add aircraft modal */}
      {adding && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setAdding(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between mb-6">
              <h3 className="font-black text-xl text-[#0D1B2A]">Add New Aircraft</h3>
              <button onClick={() => setAdding(false)} className="text-gray-400 text-xl">✕</button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Field label="Registration" value={newAircraft.registration} onChange={(v) => setNewAircraft((p) => ({ ...p, registration: v }))} placeholder="TC-XXX" />
              <Field label="Type" value={newAircraft.type} onChange={(v) => setNewAircraft((p) => ({ ...p, type: v }))} placeholder="Boeing 737-800" />
              <Field label="Seats" value={newAircraft.seats} onChange={(v) => setNewAircraft((p) => ({ ...p, seats: v }))} placeholder="162" />
              <Field label="Range" value={newAircraft.range} onChange={(v) => setNewAircraft((p) => ({ ...p, range: v }))} placeholder="5765 km" />
              <Field label="MSFS Add-on" value={newAircraft.msfsModel} onChange={(v) => setNewAircraft((p) => ({ ...p, msfsModel: v }))} placeholder="PMDG 737-800" />
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Hub</label>
                <select value={newAircraft.hub} onChange={(e) => setNewAircraft((p) => ({ ...p, hub: e.target.value }))} className="ta-input">
                  <option>Istanbul (IST)</option>
                  <option>Ankara (ESB)</option>
                  <option>Izmir (ADB)</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setAdding(false)} className="flex-1 ta-btn-secondary">Cancel</button>
              <button onClick={addAircraft} className="flex-1 ta-btn-primary">Add Aircraft</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-1">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="ta-input" />
    </div>
  );
}
