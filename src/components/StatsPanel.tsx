import type { Subscription } from "../types";

export default function StatsPanel({ subscriptions }: { subscriptions: Subscription[] }) {
  const total = subscriptions.length;
  const active = subscriptions.filter(s => s.status === "ACTIVE").length;
  const paused = subscriptions.filter(s => s.status === "PAUSED").length;
  const cancelled = subscriptions.filter(s => s.status === "CANCELLED").length;

  const stats = [
    { label: "Total", value: total, color: "bg-gray-700 text-white" },
    { label: "Active", value: active, color: "bg-lime-500/20 text-lime-400" },
    { label: "Paused", value: paused, color: "bg-yellow-500/20 text-yellow-400" },
    { label: "Cancelled", value: cancelled, color: "bg-red-500/20 text-red-400" },
  ];

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`flex-1 min-w-[120px] p-4 rounded-lg flex flex-col items-center justify-center ${stat.color} shadow-md`}
        >
          <div className="text-sm font-medium">{stat.label}</div>
          <div className="text-2xl font-bold mt-1">{stat.value}</div>
        </div>
      ))}
    </div>
  );
}
