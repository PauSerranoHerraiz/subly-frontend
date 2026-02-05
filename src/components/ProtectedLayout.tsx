import Navbar from "./Navbar";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="bg-gray-900 min-h-screen">
        {children}
      </div>
    </>
  );
}