import Navbar from "@/components/Navbar";
import "./globals.css";
import { Montserrat, Covered_By_Your_Grace } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";
import { HomepageLoading } from "@/components/HomepageLoading";
import Providers from "@/components/Providers";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
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
      <html lang='en'>
        <body
          className={`${montserrat.variable} ${coveredByYourGrace.variable} font-montserrat`}
        >
          <Providers>
            <Toaster position='bottom-center' />
            <Suspense
              fallback={<div className='h-16 bg-gray-200 animate-pulse'></div>}
            >
              {/* @ts-expect-error Server Component */}
              <Navbar />
            </Suspense>
            <Suspense fallback={<HomepageLoading />}>{children}</Suspense>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
