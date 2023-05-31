import {FaRegUserCircle} from "react-icons/fa"

export const Review = () => {
	return (
		<div className="p-2 shadow-md rounded-md">
			<div className="flex items-center m-2">
        <FaRegUserCircle className = "text-2xl"/>
				<h1 className = "ml-3 font-medium">username</h1>
			</div>
			<p className = "m-2">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
				voluptatum, doloremque, recusandae iusto aperiam quo eum non cum illo
				consectetur quia nemo et, voluptatibus dignissimos ab consequuntur
				veritatis cupiditate sunt suscipit error. Debitis reprehenderit incidunt
				libero doloribus doloremque voluptatibus officia!
			</p>
		</div>
	);
};
