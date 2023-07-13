import { DashboardNavbar } from "@/components/DashboardNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <DashboardNavbar />
      {children}
    </div>
  );
}
