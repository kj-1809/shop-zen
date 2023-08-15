import { UserCard } from "@/components/UserCard";
import prisma from "@/lib/utils/prisma";
export default async function Users() {
  const users = await prisma.user.findMany();
  return (
    <div className="flex flex-col">
      <h1 className="ml-2 text-4xl font-semibold mt-8 mb-8">Users</h1>
      {users.map((user) => {
        return (
          <UserCard user={user} key={user.id}/>
        );
      })}
    </div>
  );
}
