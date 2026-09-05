import { Link } from "react-router-dom";
import { STATS, FLEET, ROUTES } from "../data/mockData";

export default function Home() {
  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1800&h=900&fit=crop&auto=format"
          alt="Turkish Airlines aircraft in flight"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A]/90 via-[#0D1B2A]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/40 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 text-white">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#E81932]/20 border border-[#E81932]/40 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-[#E81932] animate-pulse" />
              VATSIM Integrated Virtual Airline
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
              Fly the<br />
              <span className="text-[#E81932]">Turkish</span> Way
            </h1>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
              Join the most authentic Turkish Airlines virtual experience. Fly with VATSIM, file PIREPs, advance your rank, and be part of a thriving community.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/apply">
                <button className="ta-btn-primary text-base px-8 py-3">Join the Airline</button>
              </Link>
              <Link to="/routes">
                <button className="ta-btn-secondary text-base px-8 py-3 border-white text-white hover:bg-white hover:text-[#0D1B2A]">
                  Browse Routes
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#E81932] text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <StatItem label="Active Pilots" value={STATS.activePilots.toString()} />
            <StatItem label="Total Flights" value={STATS.totalFlights.toLocaleString()} />
            <StatItem label="Flight Hours" value={STATS.totalHours.toLocaleString()} />
            <StatItem label="Flights This Month" value={STATS.flightsThisMonth.toString()} />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-[#E81932] font-bold text-sm uppercase tracking-widest">Why Fly With Us</span>
            <h2 className="font-display text-4xl font-bold text-[#0D1B2A] mt-2">The Full Virtual Airline Experience</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon="🛫"
              title="VATSIM Integration"
              desc="Log flights directly on the VATSIM network with full ATC support. Your VATSIM CID is your pilot ID — no separate registration needed."
            />
            <FeatureCard
              icon="📊"
              title="Rank Progression"
              desc="Advance from Student Pilot to Chief Pilot. Every flight hour counts. Unlock new aircraft, routes, and privileges as you climb the ranks."
            />
            <FeatureCard
              icon="✈️"
              title="Authentic Fleet"
              desc="Fly the actual Turkish Airlines fleet — 737-800, 777-300ER, A330, 787-9 and more. All routes mirror real Turkish Airlines operations."
            />
            <FeatureCard
              icon="📋"
              title="PIREP System"
              desc="File detailed flight reports with landing rates, fuel figures, and remarks. Every PIREP is reviewed and posted to our Discord."
            />
            <FeatureCard
              icon="💬"
              title="Discord Community"
              desc="All activity — PIREPs, applications, admin actions — posts automatically to Discord. Stay connected with the community."
            />
            <FeatureCard
              icon="🏆"
              title="Awards & Events"
              desc="Participate in monthly route challenges, special events, and earn exclusive awards for milestone achievements."
            />
          </div>
        </div>
      </section>

      {/* Featured routes */}
      <section className="bg-[#F8F8F8] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-[#E81932] font-bold text-sm uppercase tracking-widest">Network</span>
              <h2 className="font-display text-4xl font-bold text-[#0D1B2A] mt-2">Featured Routes</h2>
            </div>
            <Link to="/routes" className="text-[#E81932] font-bold text-sm hover:underline">View All →</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ROUTES.slice(0, 4).map((route) => (
              <RouteCard key={route.id} route={route} />
            ))}
          </div>
        </div>
      </section>

      {/* Fleet preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-[#E81932] font-bold text-sm uppercase tracking-widest">Our Aircraft</span>
              <h2 className="font-display text-4xl font-bold text-[#0D1B2A] mt-2">The Fleet</h2>
            </div>
            <Link to="/fleet" className="text-[#E81932] font-bold text-sm hover:underline">Full Fleet →</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FLEET.slice(0, 3).map((aircraft) => (
              <div key={aircraft.id} className="rounded-2xl overflow-hidden border border-gray-100 stat-card bg-white shadow-sm">
                <div className="h-44 bg-gradient-to-br from-[#0D1B2A] to-[#1a3a5c] relative overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-${aircraft.type.includes("777") ? "1474302770737-173ee21bab63" : aircraft.type.includes("787") ? "1436491865332-7a61a109cc05" : "1544636331-e26879cd4d9b"}?w=600&h=300&fit=crop&auto=format`}
                    alt={aircraft.type}
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 flex items-end p-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${aircraft.status === "Active" ? "bg-green-500/90 text-white" : aircraft.status === "Maintenance" ? "bg-yellow-500/90 text-white" : "bg-gray-500/90 text-white"}`}>
                      {aircraft.status}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-[#E81932] font-mono text-xs font-bold mb-1">{aircraft.registration}</div>
                  <h3 className="font-bold text-lg text-[#0D1B2A] mb-3">{aircraft.type}</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-gray-400 text-xs">Seats</div>
                      <div className="font-bold text-gray-900">{aircraft.seats}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs">Range</div>
                      <div className="font-bold text-gray-900">{aircraft.range}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1800&h=600&fit=crop&auto=format"
          alt="Cockpit view"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0D1B2A]/85" />
        <div className="relative max-w-7xl mx-auto px-4 text-center text-white">
          <span className="text-[#E81932] font-bold text-sm uppercase tracking-widest">Ready to Fly?</span>
          <h2 className="font-display text-5xl font-bold mt-3 mb-5">Start Your Journey Today</h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Join 127 pilots already flying for Turkish Airlines Virtual. Your VATSIM account is all you need to get started.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/apply">
              <button className="ta-btn-primary text-base px-10 py-4">Apply Now — It's Free</button>
            </Link>
            <Link to="/login">
              <button className="ta-btn-secondary text-base px-10 py-4 border-white text-white hover:bg-white hover:text-[#0D1B2A]">
                Already a Member?
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-3xl font-black">{value}</div>
      <div className="text-white/70 text-sm mt-1">{label}</div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="p-6 rounded-2xl border border-gray-100 hover:border-[#E81932]/30 hover:shadow-lg transition-all stat-card">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="font-bold text-lg text-[#0D1B2A] mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function RouteCard({ route }: { route: typeof ROUTES[0] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 stat-card hover:border-[#E81932]/30 hover:shadow-md transition-all">
      <div className="text-[#E81932] font-mono font-bold text-xs mb-2">{route.flightNumber}</div>
      <div className="flex items-center gap-2 mb-3">
        <span className="font-black text-lg text-[#0D1B2A]">{route.departure.split(" ")[1]?.replace("(","").replace(")","") || route.departure.slice(-4,-1)}</span>
        <div className="flex-1 flex items-center gap-1">
          <div className="flex-1 h-px bg-gray-200" />
          <svg className="w-3 h-3 text-[#E81932]" fill="currentColor" viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <span className="font-black text-lg text-[#0D1B2A]">{route.arrival.split(" ")[1]?.replace("(","").replace(")","") || route.arrival.slice(-4,-1)}</span>
      </div>
      <div className="text-xs text-gray-400 mb-3 truncate">{route.departure} → {route.arrival}</div>
      <div className="flex justify-between text-xs">
        <span className="text-gray-500">{route.duration}</span>
        <span className="text-gray-500">{route.distance} nm</span>
      </div>
      <div className="mt-3">
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{route.level}</span>
      </div>
    </div>
  );
}
