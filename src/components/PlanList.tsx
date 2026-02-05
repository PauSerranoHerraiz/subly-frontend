import { useState } from "react";

type Plan = {
  id: string;
  name: string;
  priceMonthly: number;
};

type PlanListProps = {
  plans: Plan[];
  onUpdate: (id: string, data: Partial<Plan>) => void;
  onDelete: (id: string) => void;
};

export default function PlanList({ plans, onUpdate, onDelete }: PlanListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <PlanCard
          key={plan.id}
          plan={plan}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

function PlanCard({ plan, onUpdate, onDelete }: any) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(plan.name);
  const [price, setPrice] = useState(plan.priceMonthly / 100);

  const save = () => {
    onUpdate(plan.id, {
      name,
      priceMonthly: Math.round(price * 100),
    });
    setEditing(false);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition">
      {editing ? (
        <>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-3 bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
          />

          <div className="relative mb-4">
            <span className="absolute left-3 top-2.5 text-gray-400 text-sm">€</span>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full bg-gray-700 text-white pl-8 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
            <span className="absolute right-3 top-2.5 text-gray-400 text-sm">/mo</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={save}
              className="flex-1 bg-lime-500 hover:bg-lime-400 text-gray-900 font-semibold py-2 rounded-lg transition"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-white text-lg font-semibold mb-1">
            {plan.name}
          </h3>
          <p className="text-gray-400 mb-6">
            <span className="text-2xl text-white font-bold">
              €{(plan.priceMonthly / 100).toFixed(2)}
            </span>
            <span className="text-sm"> / month</span>
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setEditing(true)}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(plan.id)}
              className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2 rounded-lg transition"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
