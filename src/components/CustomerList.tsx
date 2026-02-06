import { useState } from "react";
import type { Customer } from "../types";

type CustomerListProps = {
  customers: Customer[];
  subscriptionCounts?: Record<string, number>; 
  onDelete: (id: string) => void;
};

export default function CustomerList({
  customers,
  subscriptionCounts = {},
  onDelete,
}: CustomerListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      {customers.map((c) => {
        const subCount = subscriptionCounts[c.id] || 0;
        const isExpanded = expandedId === c.id;

        return (
          <div
            key={c.id}
            className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 transition"
          >
        
            <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-800/50 transition">
              <div
                className="flex-1 min-w-0 flex items-center gap-4"
                onClick={() => setExpandedId(isExpanded ? null : c.id)}
              >
                {/* Expand Icon */}
                <div className="flex-shrink-0">
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      isExpanded ? "rotate-90" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>

  
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{c.name}</p>
                  <p className="text-sm text-gray-400">{c.email}</p>
                </div>

                <div className="hidden md:flex flex-col items-end text-right">
                  <p className="text-xs text-gray-500">{c.companyName}</p>
                  {c.phone && <p className="text-xs text-gray-500">{c.phone}</p>}
                </div>
              </div>

    
              <div className="ml-4 flex items-center gap-3 flex-shrink-0">
                <div className="bg-lime-500/20 px-3 py-1 rounded-full border border-lime-400/30">
                  <p className="text-sm font-semibold text-lime-400">{subCount}</p>
                  <p className="text-xs text-lime-300">sub{subCount !== 1 ? "s" : ""}</p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(c.id);
                  }}
                  className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded-lg transition text-sm flex-shrink-0"
                >
                  Delete
                </button>
              </div>
            </div>

            {isExpanded && (
              <div className="bg-gray-800/50 border-t border-gray-700 px-4 py-3 flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Email</p>
                    <p className="text-sm text-white">{c.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Company</p>
                    <p className="text-sm text-white">{c.companyName}</p>
                  </div>
                  {c.phone && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Phone</p>
                      <p className="text-sm text-white">{c.phone}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Subscriptions</p>
                    <p className="text-sm text-lime-400 font-semibold">{subCount} active</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Customer ID</p>
                    <p className="text-xs text-gray-400 font-mono">{c.id}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
      {customers.length === 0 && (
        <p className="text-gray-400 p-4 text-center">No customers found.</p>
      )}
    </div>
  );
}
