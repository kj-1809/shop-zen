import { DashboardNavbar } from "@/components/DashboardNavbar";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/utils/prisma";
import { notFound } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    notFound();
  }

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      role: true,
    },
  });

  if (user?.role !== "ADMIN") {
    // technically show 401 but the user will know that this route exists for the admin so its a flaw
    notFound();
  }
  return (
    <div>
      <DashboardNavbar />
      {children}
    </div>
  );
}
