import { useState } from "react";

type PlanFormProps = {
  onCreate: (data: { name: string; priceMonthly: number }) => Promise<void>;
};

export default function PlanForm({ onCreate }: PlanFormProps) {
  const [name, setName] = useState("");
  const [priceMonthly, setPriceMonthly] = useState<number | "">("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (!name || priceMonthly === "") {
      setError("Name and price are required");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const priceInCents = Math.round(Number(priceMonthly) * 100);
      await onCreate({ name, priceMonthly: priceInCents });
      setName("");
      setPriceMonthly("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <input
          placeholder="Plan name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-700 text-white placeholder-gray-400 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-lime-500"
        />
      </div>

      <div>
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-gray-400 text-sm">€</span>
          <input
            type="number"
            placeholder="Price"
            value={priceMonthly}
            onChange={(e) => setPriceMonthly(Number(e.target.value))}
            step="0.01"
            className="w-full bg-gray-700 text-white placeholder-gray-400 px-8 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
          <span className="absolute right-3 top-2.5 text-gray-400 text-sm">/mo</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">Introduce el precio en euros (p. ej. 9.99)</p>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        onClick={submit}
        disabled={submitting}
        className="bg-lime-500 hover:bg-lime-400 text-gray-900 font-semibold rounded-lg transition px-4 py-2 disabled:opacity-60"
      >
        {submitting ? "Creating..." : "Create plan"}
      </button>
    </div>
  );
}
