import Link from "next/link";
export const DashboardNavbar = () => {
  return (
    <nav className='flex items-center space-x-4 lg:space-x-6 rounded-md p-2 bg-gray-100'>
      <Link
        href='/dashboard'
        className='text-sm font-medium transition-colors hover:text-primary bg-gray-200 px-4 py-2 rounded-md'
      >
        Overview
      </Link>
      <Link
        href='/dashboard/users'
        className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
      >
        Users
      </Link>
      <Link
        href='/dashboard/products'
        className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
      >
        Products
      </Link>
      <Link
        href='/dashboard/orders'
        className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary '
      >
        Orders
      </Link>
    </nav>
  );
};
