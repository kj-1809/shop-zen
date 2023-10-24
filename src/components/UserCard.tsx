"use client";
import { UserRole } from "@prisma/client";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import axios, { AxiosError } from "axios";
import Link from "next/link";
interface UserCardProps {
  profileImageUrl: string | null;
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
import { useMutation } from "@tanstack/react-query";
import { DeleteUserApiRequest } from "@/lib/validators/api-request";
import toast from "react-hot-toast";
import { AiOutlineLoading } from "react-icons/ai";
import { startTransition } from "react";
import { useRouter } from "next/navigation";

export const UserCard = ({ user }: { user: UserCardProps }) => {
  const router = useRouter()

  const { isLoading, mutate: handleDelete } = useMutation({
    mutationFn: async () => {
      const payload: DeleteUserApiRequest = {
        userId: user.id,
      };
      return await axios.post("/api/users/delete", payload);
    },
    onSuccess: () => {
      toast.success("Successfully deleted user !");
      startTransition(() => {
        router.refresh();
      });
    },
    onError: (e: AxiosError) => {
      console.log(e)
      if (e.response?.status === 401) {
        // this will never get triggered
        toast.error("You are not authorized to delete the user!");
      } else {
        toast.error("Some error occured");
      }
    },
  });

  return (
    <div className="p-2 rounded-md shadow-md grid grid-cols-10 m-2">
      <div className="col-span-10 lg:col-span-3 lg:flex lg:items-center">
        <Image
          src={user.profileImageUrl || ""}
          alt="user-profile-img"
          height={42}
          width={42}
          className="rounded-full mr-2"
        />
        <h1>{user.id}</h1>
      </div>
      <div className="col-span-10 lg:col-span-2 flex items-center">
        <h1>{user.name}</h1>
      </div>
      <div className="col-span-10 lg:col-span-3 flex items-center">
        <h1>{user.email}</h1>
      </div>
      <div className="col-span-10 lg:col-span-1 flex items-center">
        <h1>{user.role}</h1>
      </div>
      <div className="col-span-10 lg:col-span-1 flex items-center lg:justify-center">
        <button
          onClick={() => {
            handleDelete();
          }}
        >
          {isLoading && <AiOutlineLoading className="animate-spin mr-2" />}
          {!isLoading && <Trash2 color="red" />}
        </button>
        <Link href={`/dashboard/users/${user.id}/edit`}>
          <button className="px-3 py-1 border-blue-600 rounded-md border-2 hover:bg-blue-300 duration-200 ml-3 ">
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
};
