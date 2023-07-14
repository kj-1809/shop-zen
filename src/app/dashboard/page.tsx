import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Overview } from "@/components/Overview";
import { RecentSales } from "@/components/RecentSales";
import prisma from "@/lib/utils/prisma";
import moment from "moment";

const Dashboard = async () => {
  const ordersQuery = prisma.order.aggregate({
    _sum: {
      total: true,
    },
    _count: {
      id: true,
    },
    _avg: {
      total: true,
    },
    where: {
      createdAt: {
        gte: new Date(
          new Date().getTime() - new Date().getDate() * 24 * 60 * 60 * 1000
        ),
      },
    },
  });
  const usersQuery = prisma.user.aggregate({
    _count: {
      id: true,
    },
  });

  const ordersDataQuery = prisma.order.findMany({
    where: {
      createdAt: {
        gte: moment().startOf("year").toDate(),
      },
    },
  });

  const [orders, users, ordersData] = await prisma.$transaction([
    ordersQuery,
    usersQuery,
    ordersDataQuery,
  ]);

  let graphData = [];
  let cur = 0;

  for (let month = 0; month < 12; ++month) {
    if (cur >= ordersData.length) {
      break;
    }

    let curTotal = 0;
    while (
      cur < ordersData.length &&
      ordersData[cur].createdAt >=
        moment()
          .set("year", new Date().getFullYear())
          .set("month", month)
          .startOf("month")
          .toDate() &&
      ordersData[cur].createdAt <=
        moment()
          .set("year", new Date().getFullYear())
          .set("month", month)
          .endOf("month")
          .toDate()
    ) {
      curTotal += ordersData[cur].total;
      cur += 1;
    }

    // based on the month generate the data
    if (curTotal !== 0 || new Date().getMonth() >= month) {
      graphData[month] = {
        name: moment().set("month", month).format("MMM"),
        total: curTotal,
      };
    }
  }

  return (
    <div className='p-4'>
      <div className='mt-8 ml-2'>
        <h1 className='text-4xl font-semibold'>Dashboard</h1>
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'
            >
              <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
            </svg>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              Rs. {orders._sum.total?.toLocaleString("en-US") || 0}
            </div>
            <p className='text-xs text-muted-foreground'>
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Users</CardTitle>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'
            >
              <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
              <circle cx='9' cy='7' r='4' />
              <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
            </svg>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              +{users._count.id.toLocaleString("en-US")}
            </div>
            <p className='text-xs text-muted-foreground'>
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Sales</CardTitle>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'
            >
              <rect width='20' height='14' x='2' y='5' rx='2' />
              <path d='M2 10h20' />
            </svg>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              +{orders._count.id.toLocaleString("en-US")}
            </div>
            <p className='text-xs text-muted-foreground'>
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Average Order Value
            </CardTitle>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'
            >
              <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
            </svg>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              +{orders._avg.total?.toLocaleString("en-US") || 0}
            </div>
            <p className='text-xs text-muted-foreground'>
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4'>
        <Card className='col-span-4'>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className='pl-2'>
            {/* @ts-expect-error Server Component */}
            <Overview data={graphData} />
          </CardContent>
        </Card>
        <Card className='col-span-3'>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>
              You made {orders._count.id} sales this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* @ts-expect-error Server Component */}
            <RecentSales />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
