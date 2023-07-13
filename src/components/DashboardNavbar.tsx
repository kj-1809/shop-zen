"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export const DashboardNavbar = () => {
  const currentRoute = usePathname();

  return (
    <nav className='flex items-center space-x-4 lg:space-x-6 rounded-md p-2 bg-gray-100'>
      <Link
        href='/dashboard'
        className={`text-sm font-medium transition-colors text-primary px-4 py-2 rounded-md hover:bg-gray-200 duration-200 ${
          currentRoute === "/dashboard" && "bg-gray-200"
        }`}
      >
        Overview
      </Link>
      <Link
        href='/dashboard/users'
        className={`text-sm font-medium transition-colors text-primary px-4 py-2 rounded-md hover:bg-gray-200 duration-200 ${
          currentRoute === "/dashboard/users" && "bg-gray-200"
        }`}
      >
        Users
      </Link>
      <Link
        href='/dashboard/products'
        className={`text-sm font-medium transition-colors text-primary px-4 py-2 rounded-md hover:bg-gray-200 duration-200 ${
          currentRoute === "/dashboard/products" && "bg-gray-200"
        }`}
      >
        Products
      </Link>
      <Link
        href='/dashboard/orders'
        className={`text-sm font-medium transition-colors text-primary px-4 py-2 rounded-md hover:bg-gray-200 duration-200 ${
          currentRoute === "/dashboard/orders" && "bg-gray-200"
        }`}
      >
        Orders
      </Link>
    </nav>
  );
};
