export const FLEET = [
  { id: "F001", registration: "TC-JNA", type: "Boeing 737-800", seats: 162, range: "5765 km", status: "Active", hub: "Istanbul (IST)", msfsModel: "PMDG 737-800" },
  { id: "F002", registration: "TC-LJA", type: "Boeing 777-300ER", seats: 340, range: "13650 km", status: "Active", hub: "Istanbul (IST)", msfsModel: "PMDG 777-300ER" },
  { id: "F003", registration: "TC-LKA", type: "Airbus A330-300", seats: 268, range: "13400 km", status: "Active", hub: "Istanbul (IST)", msfsModel: "Fenix A330" },
  { id: "F004", registration: "TC-LTB", type: "Boeing 787-9", seats: 300, range: "14140 km", status: "Active", hub: "Istanbul (IST)", msfsModel: "PMDG 787" },
  { id: "F005", registration: "TC-JYA", type: "Airbus A320neo", seats: 180, range: "6300 km", status: "Active", hub: "Ankara (ESB)", msfsModel: "Fenix A320" },
  { id: "F006", registration: "TC-LMA", type: "Boeing 737 MAX 8", seats: 174, range: "6570 km", status: "Maintenance", hub: "Izmir (ADB)", msfsModel: "PMDG 737 MAX" },
  { id: "F007", registration: "TC-LJE", type: "Boeing 777F", seats: 0, range: "9070 km", status: "Active", hub: "Istanbul (IST)", msfsModel: "PMDG 777F" },
  { id: "F008", registration: "TC-LOA", type: "Airbus A350-900", seats: 300, range: "15000 km", status: "Coming Soon", hub: "Istanbul (IST)", msfsModel: "Asobo A350" },
];

export const ROUTES = [
  { id: "R001", flightNumber: "THY001", departure: "Istanbul (IST)", arrival: "Ankara (ESB)", distance: 352, duration: "1h 10m", aircraft: "A320neo", level: "Junior", status: "Active" },
  { id: "R002", flightNumber: "THY002", departure: "Istanbul (IST)", arrival: "Izmir (ADB)", distance: 446, duration: "1h 20m", aircraft: "737-800", level: "Junior", status: "Active" },
  { id: "R003", flightNumber: "THY081", departure: "Istanbul (IST)", arrival: "London (LHR)", distance: 2461, duration: "3h 50m", aircraft: "777-300ER", level: "Senior First Officer", status: "Active" },
  { id: "R004", flightNumber: "THY003", departure: "Istanbul (IST)", arrival: "Frankfurt (FRA)", distance: 1850, duration: "3h 00m", aircraft: "A330-300", level: "First Officer", status: "Active" },
  { id: "R005", flightNumber: "THY006", departure: "Istanbul (IST)", arrival: "New York (JFK)", distance: 9296, duration: "11h 30m", aircraft: "787-9", level: "Captain", status: "Active" },
  { id: "R006", flightNumber: "THY012", departure: "Istanbul (IST)", arrival: "Dubai (DXB)", distance: 2889, duration: "4h 00m", aircraft: "777-300ER", level: "First Officer", status: "Active" },
  { id: "R007", flightNumber: "THY004", departure: "Istanbul (IST)", arrival: "Paris (CDG)", distance: 1836, duration: "3h 10m", aircraft: "A330-300", level: "First Officer", status: "Active" },
  { id: "R008", flightNumber: "THY050", departure: "Istanbul (IST)", arrival: "Tokyo (NRT)", distance: 9344, duration: "12h 15m", aircraft: "787-9", level: "Captain", status: "Active" },
];

export const PILOTS = [
  { id: "PLT001", cid: "1234567", name: "Ahmet Yilmaz", email: "ahmet@example.com", rank: "Senior First Officer", hub: "Istanbul (IST)", hours: 847.5, flights: 312, status: "active", joinDate: "2023-03-15", lastFlight: "2024-12-01" },
  { id: "PLT002", cid: "2345678", name: "Burak Demir", email: "burak@example.com", rank: "Captain", hub: "Istanbul (IST)", hours: 2100.3, flights: 780, status: "active", joinDate: "2022-06-20", lastFlight: "2024-12-02" },
  { id: "PLT003", cid: "3456789", name: "Ceren Kaya", email: "ceren@example.com", rank: "First Officer", hub: "Ankara (ESB)", hours: 320.0, flights: 145, status: "active", joinDate: "2023-09-10", lastFlight: "2024-11-28" },
  { id: "PLT004", cid: "4567890", name: "Deniz Arslan", email: "deniz@example.com", rank: "Junior First Officer", hub: "Izmir (ADB)", hours: 85.5, flights: 42, status: "probation", joinDate: "2024-08-01", lastFlight: "2024-11-30" },
  { id: "PLT005", cid: "5678901", name: "Emre Sahin", email: "emre@example.com", rank: "Captain", hub: "Istanbul (IST)", hours: 3400.0, flights: 1200, status: "active", joinDate: "2021-02-14", lastFlight: "2024-12-03" },
  { id: "PLT006", cid: "6789012", name: "Fatma Ozturk", email: "fatma@example.com", rank: "Senior First Officer", hub: "Istanbul (IST)", hours: 920.0, flights: 335, status: "inactive", joinDate: "2023-01-07", lastFlight: "2024-09-15" },
];

export const APPLICATIONS = [
  { id: "APP001", name: "Gokhan Celik", cid: "7890123", email: "gokhan@example.com", hours: "450", hub: "Istanbul (IST)", appliedDate: "2024-12-01", status: "pending", experience: "Real world PPL, 450 VATSIM hours, experience on PMDG 737 and A320.", motivation: "Long-time aviation enthusiast and Turkish Airlines fan." },
  { id: "APP002", name: "Hande Yildiz", cid: "8901234", email: "hande@example.com", hours: "1200", hub: "Ankara (ESB)", appliedDate: "2024-11-28", status: "pending", experience: "1200 VATSIM hours, IFR rated, experience on 777 and A330.", motivation: "I want to be part of the best virtual airline community." },
  { id: "APP003", name: "Ibrahim Kurt", cid: "9012345", email: "ibrahim@example.com", hours: "200", hub: "Izmir (ADB)", appliedDate: "2024-11-25", status: "approved", experience: "200 VATSIM hours, currently training for IR.", motivation: "Aspiring pilot, love the Turkish Airlines brand." },
  { id: "APP004", name: "Jale Acar", cid: "0123456", email: "jale@example.com", hours: "50", hub: "Istanbul (IST)", appliedDate: "2024-11-20", status: "rejected", experience: "50 VATSIM hours, still learning.", motivation: "Love flying!", rejectionReason: "Insufficient VATSIM experience. Minimum 100 hours required." },
];

export const PIREPS = [
  { id: "PR001", pilotId: "PLT001", pilotName: "Ahmet Yilmaz", flightNumber: "THY081", departure: "IST", arrival: "LHR", aircraft: "Boeing 777-300ER", duration: "3h 48m", distance: "2461", landingRate: "-142", fuel: "42800", date: "2024-12-01", status: "Approved", network: "VATSIM", remarks: "Smooth flight, minor turbulence over Alps." },
  { id: "PR002", pilotId: "PLT002", pilotName: "Burak Demir", flightNumber: "THY006", departure: "IST", arrival: "JFK", aircraft: "Boeing 787-9", duration: "11h 22m", distance: "9296", landingRate: "-98", fuel: "88200", date: "2024-12-02", status: "Approved", network: "VATSIM", remarks: "Perfect transatlantic, full ATC coverage." },
  { id: "PR003", pilotId: "PLT001", pilotName: "Ahmet Yilmaz", flightNumber: "THY001", departure: "IST", arrival: "ESB", aircraft: "Airbus A320neo", duration: "1h 09m", distance: "352", landingRate: "-187", fuel: "5400", date: "2024-11-28", status: "Approved", network: "VATSIM", remarks: "" },
  { id: "PR004", pilotId: "PLT003", pilotName: "Ceren Kaya", flightNumber: "THY002", departure: "IST", arrival: "ADB", aircraft: "Boeing 737-800", duration: "1h 18m", distance: "446", landingRate: "-220", fuel: "6100", date: "2024-11-30", status: "Pending", network: "VATSIM", remarks: "Good flight." },
  { id: "PR005", pilotId: "PLT005", pilotName: "Emre Sahin", flightNumber: "THY050", departure: "IST", arrival: "NRT", aircraft: "Boeing 787-9", duration: "12h 10m", distance: "9344", landingRate: "-112", fuel: "91400", date: "2024-12-03", status: "Approved", network: "VATSIM", remarks: "Long haul complete. Crew rest simulated." },
];

export const RANKS = [
  { name: "Student Pilot", minHours: 0, badge: "SP" },
  { name: "Junior First Officer", minHours: 50, badge: "JFO" },
  { name: "First Officer", minHours: 200, badge: "FO" },
  { name: "Senior First Officer", minHours: 500, badge: "SFO" },
  { name: "Captain", minHours: 1000, badge: "CPT" },
  { name: "Senior Captain", minHours: 2500, badge: "SCPT" },
  { name: "Chief Pilot", minHours: 5000, badge: "CP" },
];

export const STATS = {
  totalPilots: 127,
  activePilots: 98,
  totalFlights: 8432,
  totalHours: 24891,
  flightsThisMonth: 342,
  hoursThisMonth: 987,
};
