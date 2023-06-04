import { FaRegUserCircle } from "react-icons/fa";

interface Props {
	username: string;
	reviewText: string;
}

export const Review: React.FC<Props> = ({ username, reviewText }) => {
	return (
		<div className="p-2 shadow-md rounded-md">
			<div className="flex items-center m-2">
				<FaRegUserCircle className="text-2xl" />
				<h1 className="ml-3 font-medium">{username}</h1>
			</div>
			<p className="m-2">
				{reviewText}
			</p>
		</div>
	);
};
