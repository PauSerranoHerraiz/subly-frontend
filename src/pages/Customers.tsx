import { useEffect, useState } from "react";
import {
  getCustomers,
  createCustomer,
  deleteCustomer,
} from "../api/customers";
import CustomerForm from "../components/CustomerForm";
import CustomerList from "../components/CustomerList";
import { useToast } from "../components/ToastProvider";

export default function Customers() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useToast();

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCustomers();
      setCustomers(data);
    } catch (err: any) {
      console.error("Error loading customers:", err);
      setError(err.response?.data?.message || "Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onCreate = async (data: any) => {
    try {
      await createCustomer(data);
      addToast("Customer created");
      load();
    } catch (err: any) {
      addToast("Failed to create customer", "error");
    }
  };

  const onDelete = async (id: string) => {
    try {
      await deleteCustomer(id);
      setCustomers((prev) => prev.filter((c) => c.id !== id));
      addToast("Customer deleted", "info");
    } catch (err: any) {
      addToast("Failed to delete customer", "error");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Customers</h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage your customers
          </p>
        </div>

        <span className="text-sm text-lime-400 bg-lime-500/10 border border-lime-400/20 px-3 py-1 rounded-full">
          {customers.length} total
        </span>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20 text-gray-400">
          Loading customers…
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              New customer
            </h2>
            <CustomerForm onCreate={onCreate} />
          </div>

          <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              Customer list
            </h2>

            <CustomerList
              customers={customers}
              onDelete={onDelete}
            />
          </div>
        </div>
      )}
    </div>
  );
}
