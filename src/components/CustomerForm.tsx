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
  const [error, setError] = useState<string | null>(null);

  const validateForm = (): string | null => {
    if (!form.name.trim()) return "Name is required";
    if (!form.email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Invalid email format";
    if (!form.companyName.trim()) return "Company name is required";
    return null;
  };

  const submit = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      await onCreate(form);
      setForm({ name: "", email: "", companyName: "", phone: "" });
    } catch (err: any) {
      setError(err.message || "Failed to create customer");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 rounded-lg p-2 text-sm">
          {error}
        </div>
      )}

      <input
        placeholder="Full name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-400"
      />
      <input
        placeholder="Email address"
        type="email"
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
        {submitting ? "Creating..." : "Create Customer"}
      </button>
    </div>
  );
}
