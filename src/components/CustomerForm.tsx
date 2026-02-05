import { useState } from "react";

type CustomerFormProps = {
  onCreate: (data: { name: string; email: string; companyName: string; phone: string }) => Promise<void>;
};

export default function CustomerForm({ onCreate }: CustomerFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    companyName: "",
    phone: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (!form.name || !form.email || !form.companyName) return;
    setSubmitting(true);
    try {
      await onCreate(form);
      setForm({ name: "", email: "", companyName: "", phone: "" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        placeholder="Full name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-400"
      />
      <input
        placeholder="Email address"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-400"
      />
      <input
        placeholder="Company name"
        value={form.companyName}
        onChange={e => setForm({ ...form, companyName: e.target.value })}
        className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-400"
      />
      <input
        placeholder="Phone (optional)"
        value={form.phone}
        onChange={e => setForm({ ...form, phone: e.target.value })}
        className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-400"
      />

      <button
        onClick={submit}
        disabled={submitting}
        className="mt-2 w-full py-3 bg-lime-500 text-gray-900 font-semibold rounded-lg hover:bg-lime-400 transition disabled:opacity-60"
      >
        {submitting ? "Creating..." : "Create"}
      </button>
    </div>
  );
}
