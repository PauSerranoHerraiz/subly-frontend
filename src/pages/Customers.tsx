import { useEffect, useState } from "react";
import { getCustomers, createCustomer, deleteCustomer } from "../api/customers";
import { getSubscriptions } from "../api/subscriptions";
import CustomerList from "../components/CustomerList";
import CustomerForm from "../components/CustomerForm";
import CustomerStats from "../components/CustomerStats";
import ConfirmModal from "../components/ConfirmModal";
import { useToast } from "../components/ToastProvider";
import type { Customer, Subscription } from "../types";

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; customerId: string | null }>({
    isOpen: false,
    customerId: null,
  });
  const { addToast } = useToast();

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const [customersData, subscriptionsData] = await Promise.all([
        getCustomers(),
        getSubscriptions(),
      ]);
      setCustomers(customersData);
      setSubscriptions(subscriptionsData);
    } catch (err: any) {
      setError(err.message || "Failed to load customers");
      addToast("Failed to load customers", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (data: {
    name: string;
    email: string;
    companyName: string;
    phone: string;
  }) => {
    try {
      await createCustomer(data);
      addToast("Customer created successfully", "success");
      await load();
    } catch (err: any) {
      addToast(err.message || "Failed to create customer", "error");
      throw err;
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteModal({ isOpen: true, customerId: id });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.customerId) return;

    try {
      await deleteCustomer(deleteModal.customerId);
      addToast("Customer deleted successfully", "success");
      await load();
    } catch (err: any) {
      addToast(err.message || "Failed to delete customer", "error");
    } finally {
      setDeleteModal({ isOpen: false, customerId: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, customerId: null });
  };

  const subscriptionCounts: Record<string, number> = {};
  subscriptions.forEach((sub) => {
    subscriptionCounts[sub.customerId] = (subscriptionCounts[sub.customerId] || 0) + 1;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading customers…
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold text-white">Customers</h1>
          <span className="text-sm text-gray-400">{customers.length} total</span>
        </div>

        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500 text-red-400 rounded-lg p-4">
            {error}
          </div>
        )}

        <CustomerStats customers={customers} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Add Customer</h3>
            <CustomerForm onCreate={handleCreate} />
          </div>

          <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">All Customers</h3>
            <CustomerList
              customers={customers}
              subscriptionCounts={subscriptionCounts}
              onDelete={handleDeleteClick}
            />
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete Customer"
        message="Are you sure you want to delete this customer? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        variant="danger"
      />
    </>
  );
}
