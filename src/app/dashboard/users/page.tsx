import prisma from "@/lib/utils/prisma";
export default async function Users() {
  const users = await prisma.user.findMany();
  return (
    <div className='flex flex-col'>
      <h1 className='ml-2 text-4xl font-semibold mt-8 mb-8'>Users</h1>

      {users.map((user) => (
        <div className='p-2 rounded-md shadow-md'>
          {user.id} : {user.name} : {user.email} : {user.role}{" "}
        </div>
      ))}
    </div>
  );
}
