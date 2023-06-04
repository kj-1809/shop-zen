import React from "react";
import logo from "../../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Navbar = () => {
	return (
		<nav className="bg-white w-full h-16 flex justify-between shadow-gray-100 shadow-md">
			<Link href="/">
				<div className="h-full flex justify-center items-center w-44 p-4">
					<Image src={logo} alt="logo" />
				</div>
			</Link>
			<div className="flex items-center">
				<Link href="/cart">
					<div className="m-1 sm:m-2 rounded-md py-2 px-4 hover:bg-slate-100 duration-100 font-medium flex items-center">
						<AiOutlineShoppingCart className="text-xl"/> 
						<h1 className = "ml-2">Cart</h1>
					</div>
				</Link>
				<SignedIn>
					<div className="mr-2 sm:mr-4 m-1">
						<UserButton />
					</div>
				</SignedIn>
				<SignedOut>
					<Link href="/sign-in">
						<h1 className="sm:mr-4 mr-2 m-1 sm:m-2 rounded-md py-2 px-4 hover:bg-slate-100 duration-100 font-medium">
							Login
						</h1>
					</Link>
				</SignedOut>
			</div>
		</nav>
	);
};

export default Navbar;
