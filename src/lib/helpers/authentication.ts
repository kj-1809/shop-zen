import prisma from "../utils/prisma";

export const checkIfAdmin = async (userId: string | null) => {
  if (!userId) {
    return false;
  }

  console.log("userd id"  , userId)
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select : {
      role : true
    }
  });


  console.log("user : : " , user)

  if (user?.role !== "ADMIN") {
    return false;
  }

  return true;
};
