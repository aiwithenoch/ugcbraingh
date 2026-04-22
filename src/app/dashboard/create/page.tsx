import CreateFlow from "@/components/create/CreateFlow";

export default function CreatePage() {
  return (
    <div className="relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary/5 blur-[120px] pointer-events-none -z-10" />
      
      <CreateFlow />
    </div>
  );
}
