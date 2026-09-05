import { FLEET } from "../data/mockData";

const AIRCRAFT_IMAGES: Record<string, string> = {
  "Boeing 737-800": "photo-1544636331-e26879cd4d9b",
  "Boeing 777-300ER": "photo-1474302770737-173ee21bab63",
  "Airbus A330-300": "photo-1436491865332-7a61a109cc05",
  "Boeing 787-9": "photo-1436491865332-7a61a109cc05",
  "Airbus A320neo": "photo-1544636331-e26879cd4d9b",
  "Boeing 737 MAX 8": "photo-1544636331-e26879cd4d9b",
  "Boeing 777F": "photo-1474302770737-173ee21bab63",
  "Airbus A350-900": "photo-1436491865332-7a61a109cc05",
};

export default function FleetPage() {
  const active = FLEET.filter((f) => f.status === "Active").length;

  return (
    <div className="page-enter">
      {/* Header */}
      <div className="relative bg-[#0D1B2A] py-20 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1800&h=400&fit=crop&auto=format"
          alt="Fleet"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative max-w-7xl mx-auto px-4 text-center text-white">
          <span className="text-[#E81932] font-bold text-sm uppercase tracking-widest">Our Aircraft</span>
          <h1 className="font-display text-5xl font-bold mt-2 mb-4">The Fleet</h1>
          <p className="text-white/60 text-lg">{active} aircraft in active service across our network</p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#E81932] text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-2xl font-black">{FLEET.length}</div><div className="text-white/70 text-sm">Total Aircraft</div></div>
            <div><div className="text-2xl font-black">{active}</div><div className="text-white/70 text-sm">Active</div></div>
            <div><div className="text-2xl font-black">3</div><div className="text-white/70 text-sm">Hubs</div></div>
            <div><div className="text-2xl font-black">15,000km</div><div className="text-white/70 text-sm">Max Range</div></div>
          </div>
        </div>
      </div>

      {/* Fleet grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FLEET.map((aircraft) => (
            <div key={aircraft.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm stat-card hover:shadow-xl hover:border-[#E81932]/20 transition-all">
              <div className="relative h-52 bg-gradient-to-br from-[#0D1B2A] to-[#1a3a5c] overflow-hidden">
                <img
                  src={`https://images.unsplash.com/${AIRCRAFT_IMAGES[aircraft.type] || "photo-1436491865332-7a61a109cc05"}?w=600&h=300&fit=crop&auto=format`}
                  alt={aircraft.type}
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-mono text-sm font-bold px-3 py-1 rounded-full">
                    {aircraft.registration}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    aircraft.status === "Active" ? "bg-green-500 text-white" :
                    aircraft.status === "Maintenance" ? "bg-yellow-500 text-white" :
                    "bg-gray-500 text-white"
                  }`}>{aircraft.status}</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-black text-xl">{aircraft.type}</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-5">
                  <Spec label="Seats" value={aircraft.seats > 0 ? aircraft.seats.toString() : "Cargo"} />
                  <Spec label="Range" value={aircraft.range} />
                  <Spec label="Hub" value={aircraft.hub.split(" ")[0]} />
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">MSFS Add-on</div>
                  <div className="text-sm font-semibold text-[#0D1B2A]">{aircraft.msfsModel}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">{label}</div>
      <div className="font-bold text-[#0D1B2A] text-sm">{value}</div>
    </div>
  );
}
