"use client";

import { useAuth } from "@clerk/nextjs";

export const LogoutButton = () => {
  const { signOut } = useAuth();
  return (
    <div
      onClick={() => {
        signOut();
      }}
      className='cursor-pointer'
    >
      Logout
    </div>
  );
};
