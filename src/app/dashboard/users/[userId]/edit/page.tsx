"use client";
import { useState } from "react";
import { UserRole } from "@prisma/client";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { AiOutlineLoading } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { UpdateUserApiRequest } from "@/lib/validators/api-request";

export default function EditUser({ params }: { params: { userId: string } }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { data: userData, isLoading } = useQuery({
    queryKey: ["fetch-user"],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/fetch-user?userId=${params.userId}`
      );
      return data;
    },
    onSuccess: (data) => {
      setName(data.user.name);
      setEmail(data.user.email);
      setRole(data.user.role);
    },
    onError: (e: AxiosError) => {
      console.log(e.response?.data);
    },
  });

  const { isLoading: isPosting, mutate: handleSubmit } = useMutation({
    mutationKey: ["update-user"],
    mutationFn: async () => {
      const payload : UpdateUserApiRequest = { userId: params.userId, name, role };
      const {data} = await axios.post("/api/update-user", payload);
      return data; 
    },
    onSuccess: (_) => {
      toast.success("Updated user details successfully");
    },
    onError : (err : AxiosError) => {
      if(err.response?.status === 401){
        toast.error("You are not authorized to update the user !")
      }else if(err.response?.status === 500){
        toast.error("Some internal server error occured !")
      }
    }
  });

  if (isLoading) {
    return <h1>Loading..</h1>;
  }

  return (
    <div className="p-2">
      <h1 className="text-3xl font-semibold mt-10 text-center">Edit User</h1>
      <div className="flex flex-col items-center">
        <div className="w-full md:w-1/2">
          <div className="mt-10">
            <h1>Name</h1>
            <input
              placeholder="name"
              className="px-4 py-2 rounded-sm border-2 outline-none w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <h1>Email</h1>
            <input
              placeholder="email"
              className="px-4 py-2 rounded-sm border-2 outline-none w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />
          </div>
          <div className="mt-2">
            <h1>Role</h1>
            <select
              onChange={(e) => {
                setRole(e.target.value);
              }}
            >
              {Object.keys(UserRole).map((currentRole) => (
                <option key={currentRole} selected = {role === currentRole}>{currentRole}</option>
              ))}
            </select>
          </div>
          <button
            className="rounded-md px-4 py-2 bg-yellow-400 w-full mt-5"
            onClick={() => {
              handleSubmit();
            }}
          >
            <div className="flex justify-center items-center">
              {isPosting && <AiOutlineLoading className="animate-spin mr-2" />}
              Confirm
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
