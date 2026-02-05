import { useState } from "react";

export default function DashboardTable({ subscriptions, onDelete, onUpdate }: any) {
  const [editing, setEditing] = useState<any>(null);

  const startEdit = (sub: any) => setEditing(sub);
  const closeEdit = () => setEditing(null);

  const saveEdit = async (sub: any) => {
    try {
      const response = await fetch(`http://localhost:8080/api/subscriptions/${sub.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: sub.status,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update subscription');
      }

      closeEdit();
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error updating subscription:', error);
      alert('Failed to update subscription');
    }
  };

  const statusColors: Record<string, string> = {
    ACTIVE: "bg-lime-500/20 text-lime-400",
    PAUSED: "bg-yellow-500/20 text-yellow-400",
    CANCELLED: "bg-red-500/20 text-red-400",
  };

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              {["Customer", "Plan", "Status", "Actions"].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {subscriptions.map((s: any) => (
              <tr key={s.id} className="hover:bg-gray-700">
                <td className="px-6 py-4 text-sm text-gray-300">{s.customer.name}</td>
                <td className="px-6 py-4 text-sm text-gray-300">{s.plan.name}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full font-semibold ${statusColors[s.status]}`}>
                    {s.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded transition"
                    onClick={() => startEdit(s)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white text-sm rounded transition"
                    onClick={() => onDelete(s.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-2xl w-96 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4">Edit Subscription</h2>

            <label className="block text-sm text-gray-300 mb-2">Status</label>
            <select
              value={editing.status}
              onChange={(e) => setEditing({ ...editing, status: e.target.value })}
              className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400"
            >
              {["ACTIVE", "PAUSED", "CANCELLED"].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition"
                onClick={closeEdit}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-lime-500 text-gray-900 rounded hover:bg-lime-400 transition"
                onClick={() => saveEdit(editing)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
