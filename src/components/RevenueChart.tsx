import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { SubscriptionWithRelations } from "../types";

interface RevenueChartProps {
  subscriptions: SubscriptionWithRelations[];
}

export default function RevenueChart({ subscriptions }: RevenueChartProps) {
  const mrrByPlan = subscriptions
    .filter((s) => s.status === "ACTIVE")
    .reduce(
      (acc, sub) => {
        const existing = acc.find((p) => p.planId === sub.planId);
        const price = (sub.plan.priceMonthly || 0) / 100;

        if (existing) {
          existing.revenue += price;
          existing.count += 1;
        } else {
          acc.push({
            name: sub.plan.name,
            planId: sub.planId,
            revenue: price,
            count: 1,
          });
        }
        return acc;
      },
      [] as Array<{ name: string; planId: string; revenue: number; count: number }>
    )
    .sort((a, b) => b.revenue - a.revenue);

  const totalMRR = mrrByPlan.reduce((sum, p) => sum + p.revenue, 0);
  const totalSubs = mrrByPlan.reduce((sum, p) => sum + p.count, 0);

  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white">MRR by Plan</h3>
          <p className="text-xs text-gray-500 mt-1">
            {totalSubs} active subscriptions
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-emerald-400">
            ${totalMRR.toFixed(2)}
          </p>
          <p className="text-xs text-gray-500">Total MRR</p>
        </div>
      </div>

      {mrrByPlan.length === 0 ? (
        <div className="h-[250px] flex items-center justify-center text-gray-400">
          No active subscriptions yet
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={mrrByPlan}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.3} />
            <XAxis dataKey="name" stroke="#666" style={{ fontSize: "12px" }} />
            <YAxis stroke="#666" style={{ fontSize: "12px" }} />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #444",
                borderRadius: "8px",
              }}
              formatter={(value: any) => `$${value.toFixed(2)}`}
              labelFormatter={(label) => `Plan: ${label}`}
            />
            <Bar
              dataKey="revenue"
              fill="#22c55e"
              radius={[6, 6, 0, 0]}
              opacity={0.8}
              activeBar={{ opacity: 1 }}
            />
          </BarChart>
        </ResponsiveContainer>
      )}

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
        {mrrByPlan.map((plan) => (
          <div
            key={plan.planId}
            className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50"
          >
            <p className="text-xs text-gray-400 truncate">{plan.name}</p>
            <p className="text-lg font-bold text-lime-400">${plan.revenue.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-1">{plan.count} subs</p>
          </div>
        ))}
      </div>
    </div>
  );
}