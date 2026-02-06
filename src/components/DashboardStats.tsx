import type { Customer, SubscriptionWithRelations } from "../types";

interface DashboardStatsProps {
  customers: Customer[];
  subscriptions: SubscriptionWithRelations[];
}

export default function DashboardStats({
  customers,
  subscriptions,
}: DashboardStatsProps) {
  const activeSubs = subscriptions.filter((s) => s.status === "ACTIVE").length;
  const cancelledSubs = subscriptions.filter((s) => s.status === "CANCELLED").length;

  const mrr = subscriptions
    .filter((s) => s.status === "ACTIVE")
    .reduce((sum, s) => sum + ((s.plan.priceMonthly || 0) / 100), 0);

  const churnRate =
    subscriptions.length > 0
      ? ((cancelledSubs / subscriptions.length) * 100).toFixed(1)
      : "0";

  const stats = [
    {
      label: "Total Customers",
      value: customers.length,
      gradient: "from-blue-500/20 to-blue-600/20",
      borderColor: "border-blue-500/50",
    },
    {
      label: "Active Subscriptions",
      value: activeSubs,
      gradient: "from-lime-500/20 to-lime-600/20",
      borderColor: "border-lime-500/50",
      highlight: true,
    },
    {
      label: "Monthly Recurring Revenue",
      value: `$${mrr.toFixed(2)}`,
      gradient: "from-emerald-500/20 to-emerald-600/20",
      borderColor: "border-emerald-500/50",
    },
    {
      label: "Churn Rate",
      value: `${churnRate}%`,
      gradient: "from-orange-500/20 to-orange-600/20",
      borderColor: "border-orange-500/50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`bg-gradient-to-br ${stat.gradient} border ${stat.borderColor} rounded-xl p-6 backdrop-blur-sm hover:border-opacity-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
            stat.highlight ? "lg:col-span-2 md:col-span-2" : ""
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400 mb-2">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.highlight ? "text-lime-400" : "text-white"}`}>
                {stat.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}