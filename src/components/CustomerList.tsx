type CustomerListProps = {
  customers: { 
    id: string; 
    name: string; 
    email: string;
    companyName: string; 
    phone?: string;
  }[];
  onDelete: (id: string) => void;
};

export default function CustomerList({ customers, onDelete }: CustomerListProps) {
  return (
    <div className="space-y-2">
      {customers.map((c) => (
        <div
          key={c.id}
          className="bg-gray-900 border border-gray-700 rounded-lg p-4 flex items-center justify-between hover:border-gray-600 transition"
        >
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium truncate">{c.name}</p>
            <p className="text-sm text-gray-400">{c.email}</p>
            <p className="text-xs text-gray-500">{c.companyName}</p>
            {c.phone && <p className="text-xs text-gray-500">{c.phone}</p>}
          </div>
          <button
            onClick={() => onDelete(c.id)}
            className="ml-4 px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded-lg transition text-sm flex-shrink-0"
          >
            Delete
          </button>
        </div>
      ))}
      {customers.length === 0 && (
        <p className="text-gray-400 p-4 text-center">No customers found.</p>
      )}
    </div>
  );
}
