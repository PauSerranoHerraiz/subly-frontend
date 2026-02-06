import type { SubscriptionWithRelations } from "../types";

interface SubscriptionHealthCheckProps {
  subscriptions: SubscriptionWithRelations[];
}

export default function SubscriptionHealthCheck({
  subscriptions,
}: SubscriptionHealthCheckProps) {
  const active = subscriptions.filter((s) => s.status === "ACTIVE").length;
  const paused = subscriptions.filter((s) => s.status === "PAUSED").length;
  const cancelled = subscriptions.filter((s) => s.status === "CANCELLED").length;

  const total = subscriptions.length || 1;
  const healthScore = Math.round(((active / total) * 100) || 0);
  const getHealthColor = (score: number) => {
    if (score >= 80) return "text-lime-400";
    if (score >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  const statusCards = [
    { status: "ACTIVE", count: active, color: "from-lime-500/20 to-lime-600/20" },
    { status: "PAUSED", count: paused, color: "from-yellow-500/20 to-yellow-600/20" },
    { status: "CANCELLED", count: cancelled, color: "from-red-500/20 to-red-600/20" },
  ];

  return (
    <div className="space-y-4">
      {/* Health Score */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Subscription Health</h3>
          <span className={`text-3xl font-bold ${getHealthColor(healthScore)}`}>
            {healthScore}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-900/50 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              healthScore >= 80
                ? "bg-gradient-to-r from-lime-500 to-lime-400"
                : healthScore >= 50
                ? "bg-gradient-to-r from-yellow-500 to-yellow-400"
                : "bg-gradient-to-r from-red-500 to-red-400"
            }`}
            style={{ width: `${healthScore}%` }}
          />
        </div>

        <p className="text-xs text-gray-500 mt-3">
          {active} active • {paused} paused • {cancelled} cancelled
        </p>
      </div>

      {/* Status Breakdown */}
      <div className="grid grid-cols-3 gap-3">
        {statusCards.map((card) => (
          <div
            key={card.status}
            className={`bg-gradient-to-br ${card.color} border border-gray-700/50 rounded-lg p-4 backdrop-blur-sm text-center hover:border-opacity-100 transition-all`}
          >
          
            <p className="text-2xl font-bold text-white">{card.count}</p>
            <p className="text-xs text-gray-400 mt-1">{card.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}