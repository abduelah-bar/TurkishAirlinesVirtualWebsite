import { FLEET } from "../../data/mockData";

export default function FleetGuide() {
  return (
    <div className="p-8 page-enter">
      <div className="mb-8">
        <div className="text-[#E81932] font-bold text-sm uppercase tracking-wider mb-1">Resources</div>
        <h1 className="text-3xl font-black text-[#0D1B2A]">Fleet Guide</h1>
        <p className="text-gray-500 mt-1">Aircraft specifications and MSFS add-on recommendations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FLEET.map((aircraft) => (
          <div key={aircraft.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
            <div className="bg-gradient-to-r from-[#0D1B2A] to-[#1a3a5c] p-5 flex justify-between items-center">
              <div>
                <div className="font-mono text-[#E81932] font-bold text-sm">{aircraft.registration}</div>
                <h3 className="text-white font-black text-lg">{aircraft.type}</h3>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                aircraft.status === "Active" ? "bg-green-500/20 text-green-400 border border-green-500/30" :
                aircraft.status === "Maintenance" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" :
                "bg-gray-500/20 text-gray-400 border border-gray-500/30"
              }`}>{aircraft.status}</span>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <Spec label="Seats" value={aircraft.seats > 0 ? `${aircraft.seats}` : "Cargo"} />
                <Spec label="Range" value={aircraft.range} />
                <Spec label="Hub" value={aircraft.hub.split(" ")[0]} />
              </div>
              <div className="bg-[#F8F8F8] rounded-xl p-4">
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Recommended Add-on</div>
                <div className="font-bold text-[#0D1B2A]">{aircraft.msfsModel}</div>
              </div>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Turkish Airlines livery required
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> VATSIM compatible
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-500">ℹ</span> Check Discord #resources for livery downloads
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">{label}</div>
      <div className="font-bold text-[#0D1B2A] text-sm">{value}</div>
    </div>
  );
}
