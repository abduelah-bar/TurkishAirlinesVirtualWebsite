// Discord webhook utility - sends rich embeds for all site activity
// In production, replace WEBHOOK_URL with your actual Discord webhook

const WEBHOOK_URL = "https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN";

export interface DiscordEmbed {
  title: string;
  description?: string;
  color: number;
  fields?: { name: string; value: string; inline?: boolean }[];
  footer?: { text: string };
  timestamp?: string;
  thumbnail?: { url: string };
}

export async function sendDiscordEmbed(embed: DiscordEmbed): Promise<void> {
  // Log to console in demo mode
  console.log("[Discord Webhook]", embed);

  // In production, uncomment:
  // await fetch(WEBHOOK_URL, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ embeds: [embed] }),
  // });

  // Store locally for demo purposes
  const logs = JSON.parse(localStorage.getItem("discord_logs") || "[]");
  logs.unshift({ ...embed, sentAt: new Date().toISOString() });
  if (logs.length > 100) logs.pop();
  localStorage.setItem("discord_logs", JSON.stringify(logs));
}

// Color palette
export const COLORS = {
  red: 0xe81932,
  green: 0x22c55e,
  yellow: 0xf59e0b,
  blue: 0x3b82f6,
  purple: 0x8b5cf6,
  gray: 0x6b7280,
};

export function pirepEmbed(data: {
  pilot: string;
  cid: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  aircraft: string;
  duration: string;
  distance: string;
  landingRate: string;
  status: string;
}) {
  return sendDiscordEmbed({
    title: `✈️ New PIREP Filed — ${data.flightNumber}`,
    color: COLORS.blue,
    fields: [
      { name: "Pilot", value: `${data.pilot} (${data.cid})`, inline: true },
      { name: "Route", value: `${data.departure} → ${data.arrival}`, inline: true },
      { name: "Aircraft", value: data.aircraft, inline: true },
      { name: "Flight Time", value: data.duration, inline: true },
      { name: "Distance", value: `${data.distance} nm`, inline: true },
      { name: "Landing Rate", value: `${data.landingRate} fpm`, inline: true },
      { name: "Status", value: data.status, inline: true },
    ],
    footer: { text: "Turkish Airlines Virtual • PIREP System" },
    timestamp: new Date().toISOString(),
  });
}

export function applicationEmbed(data: {
  name: string;
  cid: string;
  email: string;
  hours: string;
  hub: string;
}) {
  return sendDiscordEmbed({
    title: "📋 New Pilot Application",
    color: COLORS.yellow,
    fields: [
      { name: "Applicant", value: data.name, inline: true },
      { name: "VATSIM CID", value: data.cid, inline: true },
      { name: "Email", value: data.email, inline: true },
      { name: "VATSIM Hours", value: data.hours, inline: true },
      { name: "Preferred Hub", value: data.hub, inline: true },
    ],
    footer: { text: "Turkish Airlines Virtual • Applications" },
    timestamp: new Date().toISOString(),
  });
}

export function applicationStatusEmbed(data: {
  name: string;
  cid: string;
  status: "approved" | "rejected";
  reason?: string;
}) {
  return sendDiscordEmbed({
    title: data.status === "approved" ? "✅ Application Approved" : "❌ Application Rejected",
    color: data.status === "approved" ? COLORS.green : COLORS.red,
    fields: [
      { name: "Applicant", value: data.name, inline: true },
      { name: "VATSIM CID", value: data.cid, inline: true },
      ...(data.reason ? [{ name: "Reason", value: data.reason, inline: false }] : []),
    ],
    footer: { text: "Turkish Airlines Virtual • HR Department" },
    timestamp: new Date().toISOString(),
  });
}

export function loginEmbed(data: { name: string; cid: string; role: string }) {
  return sendDiscordEmbed({
    title: "🔑 Portal Login",
    color: COLORS.gray,
    fields: [
      { name: "User", value: `${data.name} (${data.cid})`, inline: true },
      { name: "Role", value: data.role, inline: true },
    ],
    footer: { text: "Turkish Airlines Virtual • Security Log" },
    timestamp: new Date().toISOString(),
  });
}

export function fleetUpdateEmbed(data: {
  action: string;
  aircraft: string;
  admin: string;
}) {
  return sendDiscordEmbed({
    title: `🛫 Fleet ${data.action}`,
    color: COLORS.purple,
    fields: [
      { name: "Aircraft", value: data.aircraft, inline: true },
      { name: "Updated By", value: data.admin, inline: true },
    ],
    footer: { text: "Turkish Airlines Virtual • Fleet Management" },
    timestamp: new Date().toISOString(),
  });
}
