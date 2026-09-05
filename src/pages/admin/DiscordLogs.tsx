import { useState, useEffect } from "react";

interface Log {
  title: string;
  color: number;
  fields?: { name: string; value: string; inline?: boolean }[];
  footer?: { text: string };
  timestamp: string;
  sentAt: string;
}

function colorToHex(color: number) {
  return `#${color.toString(16).padStart(6, "0")}`;
}

export default function DiscordLogs() {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("discord_logs") || "[]");
    setLogs(stored);
  }, []);

  const clearLogs = () => {
    localStorage.removeItem("discord_logs");
    setLogs([]);
  };

  return (
    <div className="p-8 page-enter">
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="text-[#E81932] font-bold text-sm uppercase tracking-wider mb-1">Integration</div>
          <h1 className="text-3xl font-black text-[#0D1B2A]">Discord Logs</h1>
          <p className="text-gray-500 mt-1">All Discord embed notifications sent from this session.</p>
        </div>
        {logs.length > 0 && (
          <button onClick={clearLogs} className="ta-btn-secondary text-sm">Clear Logs</button>
        )}
      </div>

      {/* Config banner */}
      <div className="bg-[#5865F2]/10 border border-[#5865F2]/30 rounded-2xl p-5 mb-8">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💬</span>
          <div>
            <h3 className="font-bold text-[#0D1B2A] mb-1">Discord Webhook Configuration</h3>
            <p className="text-gray-500 text-sm mb-3">
              In production, replace the webhook URL in <code className="bg-gray-100 px-1 rounded font-mono text-xs">src/utils/discord.ts</code> with your actual Discord webhook to enable live notifications.
            </p>
            <div className="flex gap-3">
              <code className="bg-[#0D1B2A] text-green-400 text-xs px-4 py-2 rounded-lg font-mono">
                const WEBHOOK_URL = "https://discord.com/api/webhooks/YOUR_ID/YOUR_TOKEN";
              </code>
            </div>
            <div className="mt-3 text-sm text-gray-500">
              Events that trigger Discord notifications:
              <span className="ml-2 gap-2 inline-flex flex-wrap">
                {["PIREP Filed", "PIREP Reviewed", "Application Submitted", "Application Decision", "Portal Login", "Fleet Change"].map((e) => (
                  <span key={e} className="bg-[#5865F2]/20 text-[#5865F2] text-xs font-bold px-2 py-0.5 rounded-full">{e}</span>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>

      {logs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center shadow-sm">
          <div className="text-5xl mb-4">💬</div>
          <h3 className="font-bold text-[#0D1B2A] text-xl mb-2">No logs yet</h3>
          <p className="text-gray-500 text-sm">Discord embed logs will appear here after actions are performed (PIREP filing, applications, etc.)</p>
        </div>
      ) : (
        <div className="space-y-4">
          {logs.map((log, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex">
              {/* Discord embed left bar */}
              <div className="w-1 flex-shrink-0" style={{ background: colorToHex(log.color) }} />
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-[#0D1B2A]">{log.title}</h4>
                  <div className="text-xs text-gray-400 font-mono">{new Date(log.sentAt).toLocaleString()}</div>
                </div>
                {log.fields && log.fields.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {log.fields.map((field, fi) => (
                      <div key={fi} className={field.inline === false ? "col-span-2 md:col-span-3" : ""}>
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">{field.name}</div>
                        <div className="text-sm text-gray-800 mt-0.5">{field.value}</div>
                      </div>
                    ))}
                  </div>
                )}
                {log.footer && (
                  <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400">{log.footer.text}</div>
                )}
              </div>
              <div className="p-4 flex items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: colorToHex(log.color) + "20" }}>
                  <div className="w-3 h-3 rounded-full" style={{ background: colorToHex(log.color) }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
