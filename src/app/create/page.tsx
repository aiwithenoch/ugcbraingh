import DashboardLayout from "../dashboard/layout";
import CreateFlow from "@/components/create/CreateFlow";

export default function RootCreatePage() {
  return (
    <DashboardLayout>
      <div className="relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-[#c4ff00]/5 blur-[120px] pointer-events-none -z-10" />
        <CreateFlow />
      </div>
    </DashboardLayout>
  );
}
