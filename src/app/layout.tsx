import Navbar from "@/components/Navbar";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const montserrat = Montserrat({ subsets: ["latin"] });

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
		<ClerkProvider>
			<html lang="en">
				<body className={montserrat.className}>
					<Navbar />
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
