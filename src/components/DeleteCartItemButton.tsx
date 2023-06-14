"use client"
import { RiDeleteBin5Line } from "react-icons/ri";
export const DeleteCartItemButton = () => {

  function handleDelete(){
    console.log("delete triggered !")
  }

	return (
		<button onClick={handleDelete}>
			<RiDeleteBin5Line className="cursor-pointer text-red-400 text-2xl" />
		</button>
	);
};
