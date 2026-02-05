import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { CSSProperties } from "react";

interface SubscriptionChartProps {
  subscriptions: Array<{ status: string }>;
}

export default function SubscriptionChart({ subscriptions }: SubscriptionChartProps) {
  const active = subscriptions.filter(s => s.status === "ACTIVE").length;
  const paused = subscriptions.filter(s => s.status === "PAUSED").length;
  const cancelled = subscriptions.filter(s => s.status === "CANCELLED").length;
  const total = active + paused + cancelled;

  const data = [
    { name: "Active", value: active },
    { name: "Paused", value: paused },
    { name: "Cancelled", value: cancelled },
  ];

  const colors = {
    Active: "#22c55e",
    Paused: "#facc15",
    Cancelled: "#ef4444",
  };

  const tooltipStyle: CSSProperties = {
    backgroundColor: "#0f172a",
    padding: "8px 12px",
    borderRadius: "8px",
    color: "#f9fafb",
    border: "1px solid #334155",
    fontSize: "0.875rem",
  };

  if (total === 0) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 h-80 flex items-center justify-center">
        <p className="text-gray-400">No subscription data available</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Subscription Status</h3>
        <span className="text-sm text-gray-400">{total} total</span>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={65}
            outerRadius={100}
            paddingAngle={2}
            labelLine={false}
            label={({ name, value }) => (value ? `${name} (${value})` : "")}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={colors[entry.name as keyof typeof colors]} />
            ))}
          </Pie>

          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#f9fafb"
            style={{ fontSize: "18px", fontWeight: 700 }}
          >
            {total}
          </text>

          <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`${value}`, "Count"]} />
          <Legend
            verticalAlign="bottom"
            height={36}
            wrapperStyle={{ color: "#e2e8f0", paddingTop: "12px" } as CSSProperties}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}