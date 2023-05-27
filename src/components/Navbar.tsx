import React from "react";
import logo from "../../public/logo.png";
import Image from "next/image";
import Link from "next/link";

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
					<h1 className="m-2 rounded-md py-2 px-4 hover:bg-slate-100 duration-100 font-medium">
						Cart
					</h1>
				</Link>
				<h1 className="mr-4 m-2 rounded-md py-2 px-4 hover:bg-slate-100 duration-100 font-medium">
					Login
				</h1>
			</div>
		</nav>
	);
};

export default Navbar;
