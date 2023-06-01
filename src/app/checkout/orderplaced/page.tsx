import Link from "next/link";
import { BsFillCheckCircleFill } from "react-icons/bs";
export default function OrderPlaced() {
	return (
		<div className="h-screen bg-green-500 flex justify-center flex-col items-center">
			<BsFillCheckCircleFill className="text-5xl text-white" />
			<h1 className="font-semibold text-4xl mt-10 text-white">
				Your order has been successfully placed !
			</h1>
			<h1 className="font-medium text-xl mt-3 text-white">Order #1432</h1>

			<Link href="/" className = "mt-10 py-2 px-4 rounded-md text-white border-2 border-white hover:bg-slate-200 duration-200 hover:opacity-50 hover:text-black">Continue Shopping</Link>
		</div>
	);
}
