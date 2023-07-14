import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import prisma from "@/lib/utils/prisma";

export async function RecentSales() {
  const recentSales = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          email: true,
          name: true,
        },
      },
    },
    take: 5,
  });

  return (
    <div className='space-y-8'>
      {recentSales.map((recentSale) => {
        return (
          <div className='flex items-center'>
            <Avatar className='h-9 w-9'>
              <AvatarImage src='/avatars/01.png' alt='Avatar' />
              <AvatarFallback>
                {recentSale.user.name[0].toUpperCase()}
                {recentSale.user.name.split(" ")[1][0].toUpperCase() ||
                  recentSale.user.name[1].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className='ml-4 space-y-1'>
              <p className='text-sm font-medium leading-none'>
                {recentSale.user.name}
              </p>
              <p className='text-sm text-muted-foreground'>
                {recentSale.user.email}
              </p>
            </div>
            <div className='ml-auto font-medium'>
              +Rs. {recentSale.total.toLocaleString("en-US")}
            </div>
          </div>
        );
      })}
    </div>
  );
}
