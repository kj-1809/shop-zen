import prisma from "@/lib/utils/prisma";
import { Trash2 } from "lucide-react";
import Image from "next/image";
export default async function Users() {
  const users = await prisma.user.findMany();
  return (
    <div className='flex flex-col'>
      <h1 className='ml-2 text-4xl font-semibold mt-8 mb-8'>Users</h1>

      {users.map((user) => {
        return (
          <div className='p-2 rounded-md shadow-md grid grid-cols-10 m-2'>
            <div className='col-span-3 flex items-center'>
              <Image
                src={user.profileImageUrl || ""}
                alt='user-profile-img'
                height={42}
                width={42}
                className='rounded-full mr-2'
              />
              <h1>{user.id}</h1>
            </div>
            <div className='col-span-2 flex items-center'>
              <h1>{user.name}</h1>
            </div>
            <div className='col-span-3 flex items-center'>
              <h1>{user.email}</h1>
            </div>
            <div className='col-span-1 flex items-center'>
              <h1>{user.role}</h1>
            </div>
            <div className='col-span-1 flex items-center justify-center'>
              <Trash2 color='red' />
              <button className='px-3 py-1 border-blue-600 rounded-md border-2 hover:bg-blue-300 duration-200 ml-3 '>
                View
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
