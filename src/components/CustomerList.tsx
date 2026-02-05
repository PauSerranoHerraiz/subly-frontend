type CustomerListProps = {
  customers: { id: string; name: string; companyName: string; email?: string; phone?: string }[];
  onDelete: (id: string) => void;
};

export default function CustomerList({ customers, onDelete }: CustomerListProps) {
  return (
    <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <ul className="divide-y divide-gray-700">
        {customers.map((c) => (
          <li
            key={c.id}
            className="flex justify-between items-center px-6 py-4 hover:bg-gray-700 transition"
          >
            <div className="flex flex-col">
              <span className="text-white font-semibold">{c.name}</span>
              <span className="text-gray-400 text-sm">{c.companyName}</span>
            </div>
            <button
              onClick={() => onDelete(c.id)}
              className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded-lg transition text-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {customers.length === 0 && (
        <p className="text-gray-400 p-4 text-center">No customers found.</p>
      )}
    </div>
  );
}
