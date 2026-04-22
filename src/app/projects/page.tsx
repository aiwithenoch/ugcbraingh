import DashboardLayout from "../dashboard/layout";
import ProjectsPage from "../dashboard/projects/page";

export default function RootProjectsPage() {
  return (
    <DashboardLayout>
      <ProjectsPage />
    </DashboardLayout>
  );
}
