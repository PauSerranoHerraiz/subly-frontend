import type { Customer } from "../types";

type CustomerStatsProps = {
  customers: Customer[];
};

export default function CustomerStats({ customers }: CustomerStatsProps) {
  const companyCounts = customers.reduce(
    (acc, customer) => {
      const company = customer.companyName || "Unknown";
      acc[company] = (acc[company] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const topCompanies = Object.entries(companyCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <p className="text-sm text-gray-400 mb-2">Total Customers</p>
        <p className="text-4xl font-bold text-lime-400">{customers.length}</p>
        <p className="text-xs text-gray-500 mt-2">All registered customers</p>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <p className="text-sm text-gray-400 mb-2">Companies</p>
        <p className="text-4xl font-bold text-blue-400">{Object.keys(companyCounts).length}</p>
        <p className="text-xs text-gray-500 mt-2">Unique companies</p>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <p className="text-sm text-gray-400 mb-2">Avg per Company</p>
        <p className="text-4xl font-bold text-purple-400">
          {Object.keys(companyCounts).length > 0
            ? (customers.length / Object.keys(companyCounts).length).toFixed(1)
            : "0"}
        </p>
        <p className="text-xs text-gray-500 mt-2">Average per company</p>
      </div>

      {topCompanies.length > 0 && (
        <div className="md:col-span-3 bg-gray-800 border border-gray-700 rounded-xl p-6">
          <p className="text-sm text-gray-400 mb-4">Top Companies</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {topCompanies.map(([company, count]) => (
              <div
                key={company}
                className="bg-gray-900 rounded-lg p-3 border border-gray-700 hover:border-lime-400/30 transition"
              >
                <p className="text-white font-medium text-sm truncate">{company}</p>
                <p className="text-lime-400 text-lg font-bold mt-1">{count}</p>
                <p className="text-xs text-gray-500">customer{count !== 1 ? "s" : ""}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}