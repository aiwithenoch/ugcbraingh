import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-white overflow-hidden selection:bg-[#c4ff00] selection:text-black">
      <Sidebar />
      <main className="flex-1 relative overflow-y-auto bg-[#fafafa]">
        {/* Subtle grid pattern for depth */}
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-10 py-12 relative">
          {children}
        </div>
      </main>
    </div>
  );
}
