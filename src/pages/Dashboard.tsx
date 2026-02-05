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
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { Customer, Plan, SubscriptionWithRelations } from "../types";

export default function Dashboard() {
  const [data, setData] = useState<{
    customers: Customer[];
    plans: Plan[];
    subscriptions: SubscriptionWithRelations[];
  } | null>(null);

  useEffect(() => {
    getDashboardData().then(setData);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading dashboard…
      </div>
    );
  }

  const activeSubs = data.subscriptions.filter((s) => s.status === "ACTIVE")
    .length;
  const pausedSubs = data.subscriptions.filter((s) => s.status === "PAUSED")
    .length;
  const cancelledSubs = data.subscriptions.filter((s) => s.status === "CANCELLED")
    .length;

  // Datos para gráficos
  const statusData = [
    { name: "Active", value: activeSubs },
    { name: "Paused", value: pausedSubs },
    { name: "Cancelled", value: cancelledSubs },
  ];

  const planData = data.plans.map((plan) => ({
    name: plan.name,
    count: data.subscriptions.filter((s) => s.planId === plan.id).length,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <span className="text-sm text-gray-400">Overview</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <p className="text-sm text-gray-400 mb-1">Total Customers</p>
          <p className="text-4xl font-bold text-lime-400">{data.customers.length}</p>
        </div>

        <div className="bg-gray-800 border border-lime-400/30 rounded-xl p-6 shadow-[0_0_20px_rgba(163,230,53,0.15)]">
          <p className="text-sm text-gray-400 mb-1">Active Subscriptions</p>
          <p className="text-4xl font-bold text-lime-400">{activeSubs}</p>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <p className="text-sm text-gray-400 mb-1">Total Plans</p>
          <p className="text-4xl font-bold text-white">{data.plans.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Subscriptions by Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #444" }}
                cursor={{ fill: "rgba(255,255,255,0.04)" }}
              />
              <Bar dataKey="value" fill="#22c55e" activeBar={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Subscriptions by Plan</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={planData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #444" }}
              />
              <Line type="monotone" dataKey="count" stroke="#22c55e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Customer</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Plan</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {data.subscriptions.map((sub, idx) => (
              <tr
                key={sub.id}
                className={`transition ${idx % 2 === 0 ? "bg-gray-800/40" : "bg-gray-800/10"} hover:bg-gray-700/40`}
              >
                <td className="px-6 py-4 text-sm text-white">{sub.customer.name}</td>
                <td className="px-6 py-4 text-sm text-gray-300">{sub.plan.name}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                      ${sub.status === "ACTIVE"
                        ? "bg-lime-500/20 text-lime-400 border border-lime-400/30"
                        : "bg-gray-600/20 text-gray-400 border border-gray-600/30"
                      }`}
                  >
                    {sub.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
