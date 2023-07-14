import React from "react";
import logo from "../../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { auth } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { LayoutDashboard, LogOut, Package, Plus, User2 } from "lucide-react";
import { LogoutButton } from "./LogoutButton";
import prisma from "@/lib/utils/prisma";

const Navbar = async () => {
  const { userId } = auth();

  const fetchUserData = async () => {
    if (userId) {
      const data = await prisma.user.findFirst({
        where: {
          id: userId,
        },
        select: {
          profileImageUrl: true,
          role: true,
          name: true,
        },
      });
      return data;
    }
    return null;
  };

  const userData = await fetchUserData();

  return (
    <nav className='bg-white w-full h-16 flex justify-between shadow-gray-100 shadow-md'>
      <Link href='/'>
        <div className='h-full flex justify-center items-center w-44 p-4'>
          <Image src={logo} alt='logo' />
        </div>
      </Link>
      <div className='flex items-center mr-2'>
        <Link href='/cart'>
          <div className='m-1 sm:m-2 rounded-md py-2 px-4 hover:bg-slate-100 duration-100 font-medium flex items-center'>
            <AiOutlineShoppingCart className='text-xl' />
            <h1 className='ml-2'>Cart</h1>
          </div>
        </Link>

        {/* User is logged in */}
        {userId && (
          <div className='mr-2 sm:mr-4 m-1'>
            <DropdownMenu>
              <DropdownMenuTrigger className='flex items-center justify-center'>
                <h1>
                  <Image
                    src={userData?.profileImageUrl || ""}
                    alt='profile-img'
                    height={36}
                    width={36}
                    className='rounded-full'
                  />
                </h1>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Welcome, {userData?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <Link href='/myorders'>
                  <DropdownMenuItem>
                    <Package className='mr-2' />
                    My Orders
                  </DropdownMenuItem>
                </Link>

                <DropdownMenuItem>
                  <User2 className='mr-2' />
                  My Account
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <LogOut className='mr-2' />
                  <LogoutButton />
                </DropdownMenuItem>

                {userData && userData.role === "ADMIN" && (
                  <>
                    <DropdownMenuSeparator />

                    <Link href='/products/add'>
                      <DropdownMenuItem>
                        <Plus className='mr-2' />
                        Add New Product
                      </DropdownMenuItem>
                    </Link>

                    <Link href='/dashboard'>
                      <DropdownMenuItem>
                        <LayoutDashboard className='mr-2' />
                        Dashboard
                      </DropdownMenuItem>
                    </Link>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* User is not logged in */}
        {!userId && (
          <Link href='/sign-in'>
            <h1 className='sm:mr-4 mr-2 m-1 sm:m-2 rounded-md py-2 px-4 hover:bg-slate-100 duration-100 font-medium'>
              Login
            </h1>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
