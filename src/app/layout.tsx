import Navbar from "@/components/Navbar";
import "./globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({subsets : ["latin"]})

export const metadata = {
	title: "Shop Online",
	description: "Buy immaculate products online !",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={montserrat.className}>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
