import { useEffect, useState } from "react";
import { getCustomers } from "../api/customers";
import { getPlans } from "../api/plans";

type Option = { id: string; name: string; email?: string; priceMonthly?: number };

export default function SubscriptionForm({ onCreate }: { onCreate: (data: { customerId: string; planId: string }) => Promise<void> }) {
  const [customers, setCustomers] = useState<Option[]>([]);
  const [plans, setPlans] = useState<Option[]>([]);
  const [customerId, setCustomerId] = useState("");
  const [planId, setPlanId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [customersData, plansData] = await Promise.all([
          getCustomers(),
          getPlans(),
        ]);

        setCustomers(customersData);
        setPlans(plansData);

        if (customersData.length > 0) setCustomerId(customersData[0].id);
        if (plansData.length > 0) setPlanId(plansData[0].id);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const submit = async () => {
    if (!customerId || !planId) return;
    setSubmitting(true);
    try {
      await onCreate({ customerId, planId });
      setCustomerId(customers[0]?.id || "");
      setPlanId(plans[0]?.id || "");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-gray-400">
        Loading subscription data…
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500 text-red-400 rounded-lg p-4">
        {error}
      </div>
    );
  }

  if (customers.length === 0 || plans.length === 0) {
    return (
      <div>
        <p className="text-gray-400">
          {customers.length === 0
            ? "You need at least one customer before creating subscriptions."
            : "You need at least one plan before creating subscriptions."}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-gray-400 text-sm mb-1">Customer</label>
          <select
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
          >
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} {c.email && `— ${c.email}`}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">Plan</label>
          <select
            value={planId}
            onChange={(e) => setPlanId(e.target.value)}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
          >
            {plans.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — €{((p.priceMonthly || 0) / 100).toFixed(2)}/mo
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={submit}
          disabled={submitting}
          className="w-full bg-lime-500 hover:bg-lime-400 text-gray-900 font-semibold py-2 rounded-lg transition disabled:opacity-60"
        >
          {submitting ? "Creating..." : "Create subscription"}
        </button>
      </div>
    </div>
  );
}
