import { useState } from "react";

export default function SubscriptionList({ subscriptions, onUpdate, onDelete }: any) {
  return (
    <div className="space-y-3">
      {subscriptions.map((s: any) => (
        <SubscriptionItem
          key={s.id}
          subscription={s}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

function SubscriptionItem({ subscription, onUpdate, onDelete }: any) {
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState(subscription.status);
  const [loading, setLoading] = useState(false);

  const save = async () => {
    setLoading(true);
    try {
      await onUpdate(subscription.id, { status });
      setEditing(false);
    } catch (err) {
      console.error("Error updating:", err);
    } finally {
      setLoading(false);
    }
  };

  const statusColors: Record<string, string> = {
    ACTIVE: "text-lime-400 bg-lime-500/10 border-lime-400/30",
    PAUSED: "text-yellow-400 bg-yellow-500/10 border-yellow-400/30",
    CANCELLED: "text-red-400 bg-red-500/10 border-red-400/30",
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 flex items-center justify-between hover:border-gray-600 transition">
      <div className="flex-1">
        <p className="text-white font-medium">{subscription.customer.name}</p>
        <p className="text-sm text-gray-400">{subscription.plan.name}</p>
      </div>

      {editing ? (
        <div className="flex items-center gap-2">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
          >
            <option value="ACTIVE">Active</option>
            <option value="PAUSED">Paused</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          <button
            onClick={save}
            disabled={loading}
            className="px-3 py-1 bg-lime-600 hover:bg-lime-500 text-white text-sm rounded transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            onClick={() => setEditing(false)}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[subscription.status]}`}>
            {subscription.status}
          </span>
          <button
            onClick={() => setEditing(true)}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(subscription.id)}
            className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white text-sm rounded transition"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
