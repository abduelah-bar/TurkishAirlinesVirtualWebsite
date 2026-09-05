import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "pilot" | "admin" | "guest";

export interface User {
  id: string;
  vatsimCid: string;
  name: string;
  email: string;
  role: UserRole;
  rank: string;
  joinDate: string;
  totalHours: number;
  totalFlights: number;
  avatar?: string;
  hub: string;
  status: "active" | "inactive" | "probation";
  discordId?: string;
}

interface AuthContextType {
  user: User | null;
  login: (vatsimCid: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock users for demo
const MOCK_USERS: Record<string, User & { password: string }> = {
  "1234567": {
    id: "PLT001",
    vatsimCid: "1234567",
    password: "pilot123",
    name: "Ahmet Yilmaz",
    email: "ahmet@example.com",
    role: "pilot",
    rank: "Senior First Officer",
    joinDate: "2023-03-15",
    totalHours: 847.5,
    totalFlights: 312,
    hub: "Istanbul (IST)",
    status: "active",
    discordId: "ahmet#1234",
  },
  "9999999": {
    id: "ADM001",
    vatsimCid: "9999999",
    password: "admin123",
    name: "Mehmet Admin",
    email: "admin@turkishvirtual.com",
    role: "admin",
    rank: "Chief Operations Officer",
    joinDate: "2022-01-01",
    totalHours: 2400,
    totalFlights: 890,
    hub: "Istanbul (IST)",
    status: "active",
    discordId: "mehmet#9999",
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (vatsimCid: string, password: string) => {
    await new Promise((r) => setTimeout(r, 1200)); // Simulate VATSIM OAuth
    const found = MOCK_USERS[vatsimCid];
    if (found && found.password === password) {
      const { password: _, ...userWithoutPassword } = found;
      setUser(userWithoutPassword);
      return { success: true };
    }
    return { success: false, error: "Invalid VATSIM CID or password. Demo: CID 1234567 / pilot123" };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
