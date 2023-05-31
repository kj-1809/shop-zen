"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

export const Carousel = () => {
	const slides = [
		{
			title: "Some title mate",
			description: "Some description",
			imgUrl:
				"https://uploadthing.com/f/02c4ee2e-618c-4223-9668-5f40b8f6a8b5_pexels-thorsten-technoman-338504.jpg",
		},
		{
			title: "Some other title mate",
			description: "Some description",
			imgUrl:
				"https://uploadthing.com/f/23db9644-b217-426a-bf62-8518eb763992_pexels-freemockupsorg-775219.jpg",
		},
		{
			title: "Some other other title mate",
			description: "Some description",
			imgUrl:
				"https://uploadthing.com/f/1fde90fe-98e1-4662-9825-7b9e10139f51_pexels-pixabay-262047.jpg",
		},
	];
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			console.log("hey there");
			setIndex((prev) => (prev + 1) % slides.length);
		}, 9000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	function handleNext() {
		setIndex((prev) => (prev + 1) % slides.length);
	}

	function handleBack() {
		if (index <= 0) {
			setIndex((prev) => slides.length - 1);
		} else {
			setIndex((prev) => prev - 1);
		}
	}

	return (
		<div className="h-[70vh] relative">
			<Image
				src={`${slides[index].imgUrl}`}
				alt="carousel-img"
				fill
				style={{ objectFit: "cover" }}
			/>

			<div
				onClick={handleBack}
				className="absolute top-[50%] left-2 bg-slate-500 rounded-full text-4xl opacity-50 cursor-pointer"
			>
				<AiOutlineArrowLeft />
			</div>
			<div
				onClick={handleNext}
				className="absolute top-[50%] right-2 bg-slate-500 rounded-full text-4xl opacity-50 cursor-pointer"
			>
				<AiOutlineArrowRight />
			</div>

			<div className="absolute bottom-4 left-4">
				<h1 className="font-bold text-4xl text-white shadow-md">
					{slides[index].title}
				</h1>
				<h1 className="font-semibold text-2xl text-white shadow-md">
					{slides[index].description}
				</h1>
			</div>
		</div>
	);
};
