import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { PIREPS } from "../../data/mockData";

export default function Logbook() {
  const { user } = useAuth();
  const myPireps = PIREPS.filter((p) => p.pilotId === user?.id);
  const [selected, setSelected] = useState<typeof PIREPS[0] | null>(null);

  const totalHours = myPireps.reduce((acc, p) => {
    const [h, m] = p.duration.replace("h", "").replace("m", "").split(" ").map(Number);
    return acc + h + (m || 0) / 60;
  }, 0);

  return (
    <div className="p-8 page-enter">
      <div className="mb-8">
        <div className="text-[#E81932] font-bold text-sm uppercase tracking-wider mb-1">Flight Records</div>
        <h1 className="text-3xl font-black text-[#0D1B2A]">My Logbook</h1>
        <p className="text-gray-500 mt-1">Your complete flight history with Turkish Airlines Virtual.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <MiniStat label="Flights" value={myPireps.length.toString()} />
        <MiniStat label="Hours" value={totalHours.toFixed(1)} />
        <MiniStat label="Approved" value={myPireps.filter((p) => p.status === "Approved").length.toString()} />
        <MiniStat label="Avg Landing" value={myPireps.length > 0 ? Math.round(myPireps.reduce((a, p) => a + Math.abs(+p.landingRate), 0) / myPireps.length) + " fpm" : "—"} />
      </div>

      {myPireps.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center shadow-sm">
          <div className="text-5xl mb-4">📋</div>
          <h3 className="font-bold text-[#0D1B2A] text-xl mb-2">No flights yet</h3>
          <p className="text-gray-500 mb-4">File your first PIREP to start building your logbook.</p>
          <button onClick={() => window.location.href = "/pilot/pirep"} className="ta-btn-primary">File First PIREP</button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="ta-table">
            <thead>
              <tr>
                <th>Flight</th>
                <th>Route</th>
                <th>Aircraft</th>
                <th>Date</th>
                <th>Duration</th>
                <th>Landing</th>
                <th>Network</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {myPireps.map((p) => (
                <tr key={p.id} className="cursor-pointer" onClick={() => setSelected(p)}>
                  <td><span className="font-mono font-bold text-[#E81932]">{p.flightNumber}</span></td>
                  <td className="font-semibold">{p.departure} → {p.arrival}</td>
                  <td className="text-gray-500 text-xs">{p.aircraft}</td>
                  <td className="font-mono text-xs">{p.date}</td>
                  <td className="font-mono text-sm">{p.duration}</td>
                  <td>
                    <span className={`font-mono text-sm font-bold ${
                      Math.abs(+p.landingRate) < 100 ? "text-green-600" :
                      Math.abs(+p.landingRate) < 200 ? "text-blue-600" :
                      Math.abs(+p.landingRate) < 300 ? "text-yellow-600" :
                      "text-red-600"
                    }`}>{p.landingRate} fpm</span>
                  </td>
                  <td><span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-bold">{p.network}</span></td>
                  <td>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.status === "Approved" ? "badge-approved" : "badge-pending"}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <button className="text-[#E81932] text-xs hover:underline">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="font-mono text-[#E81932] font-bold text-sm">{selected.flightNumber}</div>
                <h3 className="font-display text-2xl font-bold text-[#0D1B2A]">{selected.departure} → {selected.arrival}</h3>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-700 text-xl">✕</button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm mb-5">
              <D label="Aircraft" value={selected.aircraft} />
              <D label="Date" value={selected.date} />
              <D label="Duration" value={selected.duration} />
              <D label="Distance" value={`${selected.distance} nm`} />
              <D label="Landing Rate" value={`${selected.landingRate} fpm`} />
              <D label="Fuel Used" value={`${Number(selected.fuel).toLocaleString()} kg`} />
              <D label="Network" value={selected.network} />
              <D label="Status" value={selected.status} />
            </div>
            {selected.remarks && (
              <div className="bg-[#F8F8F8] rounded-xl p-4 text-sm text-gray-600">
                <div className="font-bold text-gray-700 mb-1">Remarks</div>
                {selected.remarks}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm text-center">
      <div className="text-2xl font-black text-[#0D1B2A]">{value}</div>
      <div className="text-xs text-gray-400 mt-1">{label}</div>
    </div>
  );
}

function D({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-gray-400 text-xs">{label}</div>
      <div className="font-semibold text-gray-900">{value}</div>
    </div>
  );
}
