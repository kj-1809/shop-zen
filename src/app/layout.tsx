import Navbar from "@/components/Navbar";
import "./globals.css";
import { Montserrat, Covered_By_Your_Grace } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const montserrat = Montserrat({ subsets: ["latin"] });
const coveredByYourGrace = Covered_By_Your_Grace({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-grace",
});

export const metadata = {
	title: "Shop Zen",
	description: "Buy immaculate products online !",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body
					className={`${montserrat.className} ${coveredByYourGrace.variable}`}
				>
					<Navbar />
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
