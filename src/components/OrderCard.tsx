import Image from "next/image";
interface Props {
	orderId: number;
	total: number;
	paymentStatus: string;
	deliveryStatus: string;
	createdAt: string;
}
export const OrderCard: React.FC<Props> = ({
	orderId,
	total,
	paymentStatus,
	deliveryStatus,
	createdAt,
}) => {
	return (
		<div className="p-2 rounded-md shadow-sm ">
			<div className="grid grid-cols-9">
				<div className="relative col-span-2">
					<Image
						src="https://uploadthing.com/f/02c4ee2e-618c-4223-9668-5f40b8f6a8b5_pexels-thorsten-technoman-338504.jpg"
						fill
						alt="orderImg"
						className="rounded-md"
						style={{ objectFit: "cover" }}
					/>
				</div>
				<div className="col-span-7 grid grid-cols-2 p-2">
					<h1>Order No.</h1>
					<h1>#{orderId}</h1>
					<h1>Date</h1>
					<h1>{createdAt}</h1>
					<h1>Total</h1>
					<h1>Rs. {total / 100}</h1>
					<h1>Payment Status</h1>
					<h1>{paymentStatus}</h1>
					<h1>Delivery Status</h1>
					<h1>{deliveryStatus}</h1>
				</div>
			</div>
		</div>
	);
};
