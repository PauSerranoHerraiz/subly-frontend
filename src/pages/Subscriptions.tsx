import { useEffect, useState } from "react";
import {
  getSubscriptions,
  createSubscription,
  updateSubscription,
  deleteSubscription,
} from "../api/subscriptions";
import SubscriptionForm from "../components/SubscriptionForm";
import SubscriptionList from "../components/SubscriptionList";
import { useToast } from "../components/ToastProvider";

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const load = async () => {
    setLoading(true);
    const data = await getSubscriptions();
    setSubscriptions(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const onCreate = async (data: any) => {
    await createSubscription(data);
    addToast("Subscription created");
    load();
  };

  const onUpdate = async (id: string, data: any) => {
    await updateSubscription(id, data);
    addToast("Subscription updated");
    load();
  };

  const onDelete = async (id: string) => {
    await deleteSubscription(id);
    setSubscriptions((prev) => prev.filter((s) => s.id !== id));
    addToast("Subscription deleted", "info");
  };

  const activeCount = subscriptions.filter((s) => s.status === "ACTIVE").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Subscriptions</h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage customer subscriptions
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400 bg-gray-800 border border-gray-700 px-3 py-1 rounded-full">
            {subscriptions.length} total
          </span>
          <span className="text-sm text-lime-400 bg-lime-500/10 border border-lime-400/20 px-3 py-1 rounded-full">
            {activeCount} active
          </span>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20 text-gray-400">
          Loading subscriptions…
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              New subscription
            </h2>
            <SubscriptionForm onCreate={onCreate} />
          </div>

          <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              Subscription list
            </h2>

            {subscriptions.length === 0 ? (
              <div className="text-gray-400 py-10 text-center">
                No subscriptions yet
              </div>
            ) : (
              <div className="max-h-[70vh] overflow-auto pr-1">
                <SubscriptionList
                  subscriptions={subscriptions}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
