import { useEffect, useState } from "react";
import { getDashboardData } from "../api/dashboard";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import DashboardStats from "../components/DashboardStats";
import RevenueChart from "../components/RevenueChart";
import SubscriptionHealthCheck from "../components/SubscriptionHealthCheck";
import TopPlans from "../components/TopPlans";
import type { Customer, Plan, SubscriptionWithRelations } from "../types";

export default function Dashboard() {
  const [data, setData] = useState<{
    customers: Customer[];
    plans: Plan[];
    subscriptions: SubscriptionWithRelations[];
  } | null>(null);

  const [searchCustomer, setSearchCustomer] = useState("");
  const [filterPlan, setFilterPlan] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    getDashboardData().then(setData);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  const activeSubs = data.subscriptions.filter((s) => s.status === "ACTIVE").length;
  const pausedSubs = data.subscriptions.filter((s) => s.status === "PAUSED").length;
  const cancelledSubs = data.subscriptions.filter((s) => s.status === "CANCELLED").length;

  const statusData = [
    { name: "Active", value: activeSubs, color: "#22c55e" },
    { name: "Paused", value: pausedSubs, color: "#eab308" },
    { name: "Cancelled", value: cancelledSubs, color: "#ef4444" },
  ];

  const planData = data.plans.map((plan) => ({
    name: plan.name,
    count: data.subscriptions.filter((s) => s.planId === plan.id).length,
  }));

  const filteredSubscriptions = data.subscriptions.filter((sub) => {
    const matchesPlan = !filterPlan || sub.planId === filterPlan;
    const matchesStatus = !filterStatus || sub.status === filterStatus;
    const matchesCustomer =
      !searchCustomer ||
      sub.customer.name.toLowerCase().includes(searchCustomer.toLowerCase()) ||
      sub.customer.email.toLowerCase().includes(searchCustomer.toLowerCase());
    return matchesPlan && matchesStatus && matchesCustomer;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-lime-400 to-lime-300 bg-clip-text text-transparent mb-2">
            Dashboard
          </h1>
          <p className="text-gray-400">Welcome back! Here's your business overview.</p>
        </div>

        {/* Stats Cards */}
        <DashboardStats
          customers={data.customers}
          plans={data.plans}
          subscriptions={data.subscriptions}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Revenue Chart - Full Width */}
          <div className="lg:col-span-2">
            <RevenueChart subscriptions={data.subscriptions} />
          </div>

          {/* Subscription Health */}
          <div>
            <SubscriptionHealthCheck subscriptions={data.subscriptions} />
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Subscriptions by Status - Subtle Pie Chart */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-4">Subscriptions by Status</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} opacity={0.8} />
                  ))}
                </Pie>
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #444",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4 text-sm">
              {statusData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-400">
                    {item.name} <span className="font-bold text-white">{item.value}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Subscriptions by Plan - Subtle Bar Chart */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-4">Subscriptions by Plan</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={planData}>
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
                />
                <Bar
                  dataKey="count"
                  fill="#22c55e"
                  radius={[6, 6, 0, 0]}
                  opacity={0.7}
                  activeBar={{ fill: "#22c55e", opacity: 0.9 }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Plans */}
        <div className="mb-10">
          <TopPlans plans={data.plans} subscriptions={data.subscriptions} />
        </div>

        {/* Subscriptions Table */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl overflow-hidden backdrop-blur-sm">
          <div className="bg-gray-900/50 px-6 py-4 border-b border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase">
                  Search Customer
                </label>
                <input
                  type="text"
                  placeholder="Name or email..."
                  value={searchCustomer}
                  onChange={(e) => setSearchCustomer(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-400 placeholder-gray-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase">
                  Filter by Plan
                </label>
                <select
                  value={filterPlan}
                  onChange={(e) => setFilterPlan(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-400"
                >
                  <option value="">All Plans</option>
                  {data.plans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase">
                  Filter by Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-400"
                >
                  <option value="">All Statuses</option>
                  <option value="ACTIVE">Active</option>
                  <option value="PAUSED">Paused</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>

            {(searchCustomer || filterPlan || filterStatus) && (
              <button
                onClick={() => {
                  setSearchCustomer("");
                  setFilterPlan("");
                  setFilterStatus("");
                }}
                className="mt-3 text-xs text-lime-400 hover:text-lime-300 transition font-medium"
              >
                ✕ Clear all filters
              </button>
            )}
          </div>

          <div className="bg-gray-900/50 px-6 py-2 border-b border-gray-700">
            <p className="text-xs text-gray-400">
              Showing <span className="font-semibold text-white">{filteredSubscriptions.length}</span> of{" "}
              <span className="font-semibold text-white">{data.subscriptions.length}</span> subscriptions
            </p>
          </div>

          {filteredSubscriptions.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-400">
                {data.subscriptions.length === 0
                  ? "No subscriptions yet. Create one to get started!"
                  : "No subscriptions match your filters"}
              </p>
            </div>
          ) : (
            <table className="min-w-full">
              <thead className="bg-gray-900/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                    Plan
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredSubscriptions.map((sub) => (
                  <tr
                    key={sub.id}
                    className="hover:bg-gray-700/20 transition"
                  >
                    <td className="px-6 py-4 text-sm text-white">{sub.customer.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{sub.plan.name}</td>
                    <td className="px-6 py-4 text-sm text-lime-400 font-semibold">
                      ${sub.plan.priceMonthly / 100}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                          ${
                            sub.status === "ACTIVE"
                              ? "bg-lime-500/20 text-lime-400 border border-lime-400/30"
                              : sub.status === "PAUSED"
                              ? "bg-yellow-500/20 text-yellow-400 border border-yellow-400/30"
                              : "bg-red-500/20 text-red-400 border border-red-400/30"
                          }`}
                      >
                        {sub.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
