type SubscriptionFiltersProps = {
  plans: { id: string; name: string }[];
  filterPlan: string;
  setFilterPlan: (value: string) => void;
  filterStatus: string;
  setFilterStatus: (value: string) => void;
};

export default function SubscriptionFilters({
  plans,
  filterPlan,
  setFilterPlan,
  filterStatus,
  setFilterStatus,
}: SubscriptionFiltersProps) {
  return (
    <div className="bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-400 text-sm mb-1">
            Plan
          </label>
          <select
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value)}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
          >
            <option value="">All plans</option>
            {plans.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">
            Status
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
          >
            <option value="">All statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="PAUSED">Paused</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>
    </div>
  );
}
