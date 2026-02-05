import { useEffect, useState } from "react";
import {
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
} from "../api/plans";
import PlanForm from "../components/PlanForm";
import PlanList from "../components/PlanList";
import { useToast } from "../components/ToastProvider";

export default function Plans() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const load = async () => {
    setLoading(true);
    const data = await getPlans();
    setPlans(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const onCreate = async (data: any) => {
    await createPlan(data);
    addToast("Plan created");
    load();
  };

  const onUpdate = async (id: string, data: any) => {
    await updatePlan(id, data);
    addToast("Plan updated");
    load();
  };

  const onDelete = async (id: string) => {
    await deletePlan(id);
    setPlans((prev) => prev.filter((p) => p.id !== id));
    addToast("Plan deleted", "info");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Plans</h1>
          <p className="text-sm text-gray-400 mt-1">
            Define your subscription plans
          </p>
        </div>

        <span className="text-sm text-lime-400 bg-lime-500/10 border border-lime-400/20 px-3 py-1 rounded-full">
          {plans.length} plans
        </span>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20 text-gray-400">
          Loading plans…
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              New plan
            </h2>
            <PlanForm onCreate={onCreate} />
          </div>

          <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              Plan list
            </h2>

            <PlanList
              plans={plans}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          </div>
        </div>
      )}
    </div>
  );
}
