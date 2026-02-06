import type { Plan, SubscriptionWithRelations } from "../types";

interface TopPlansProps {
  plans: Plan[];
  subscriptions: SubscriptionWithRelations[];
}

export default function TopPlans({ plans, subscriptions }: TopPlansProps) {
  const planStats = plans.map((plan) => {
    const count = subscriptions.filter((s) => s.planId === plan.id).length;
    const revenue = subscriptions
      .filter((s) => s.planId === plan.id && s.status === "ACTIVE")
      .reduce((sum, s) => sum + ((s.plan.priceMonthly || 0) / 100), 0);

    return { ...plan, count, revenue };
  });

  const topPlans = planStats.sort((a, b) => b.count - a.count).slice(0, 5);

  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
      <h3 className="text-lg font-bold text-white mb-4">Top Plans</h3>

      <div className="space-y-3">
        {topPlans.length === 0 ? (
          <p className="text-gray-400 text-center py-6">No plans yet</p>
        ) : (
          topPlans.map((plan, idx) => (
            <div
              key={plan.id}
              className="bg-gray-900/50 rounded-lg p-3 flex items-center justify-between hover:bg-gray-800/50 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-lime-500/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-lime-400">#{idx + 1}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{plan.name}</p>
                  <p className="text-xs text-gray-500">${(plan.priceMonthly / 100).toFixed(2)}/month</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-lime-400">{plan.count}</p>
                <p className="text-xs text-gray-500">${plan.revenue.toFixed(2)}/mo</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}