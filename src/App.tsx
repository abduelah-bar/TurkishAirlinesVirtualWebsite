import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Apply from "./pages/Apply";
import FleetPage from "./pages/FleetPage";
import RoutesPage from "./pages/RoutesPage";

import PilotLayout from "./pages/pilot/PilotLayout";
import PilotDashboard from "./pages/pilot/PilotDashboard";
import FilePIREP from "./pages/pilot/FilePIREP";
import Logbook from "./pages/pilot/Logbook";
import Schedule from "./pages/pilot/Schedule";
import Profile from "./pages/pilot/Profile";
import FleetGuide from "./pages/pilot/FleetGuide";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPilots from "./pages/admin/AdminPilots";
import Applications from "./pages/admin/Applications";
import AdminFleet from "./pages/admin/AdminFleet";
import AdminRoutes from "./pages/admin/AdminRoutes";
import AdminPIREPs from "./pages/admin/AdminPIREPs";
import DiscordLogs from "./pages/admin/DiscordLogs";

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes with navbar + footer */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/fleet" element={<PublicLayout><FleetPage /></PublicLayout>} />
          <Route path="/routes" element={<PublicLayout><RoutesPage /></PublicLayout>} />
          <Route path="/apply" element={<PublicLayout><Apply /></PublicLayout>} />
          <Route path="/login" element={<Login />} />

          {/* Pilot portal */}
          <Route path="/pilot" element={<><Navbar /><PilotLayout /></>}>
            <Route index element={<PilotDashboard />} />
            <Route path="pirep" element={<FilePIREP />} />
            <Route path="logbook" element={<Logbook />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="fleet" element={<FleetGuide />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Admin panel */}
          <Route path="/admin" element={<><Navbar /><AdminLayout /></>}>
            <Route index element={<AdminDashboard />} />
            <Route path="pilots" element={<AdminPilots />} />
            <Route path="applications" element={<Applications />} />
            <Route path="fleet" element={<AdminFleet />} />
            <Route path="routes" element={<AdminRoutes />} />
            <Route path="pireps" element={<AdminPIREPs />} />
            <Route path="discord" element={<DiscordLogs />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
