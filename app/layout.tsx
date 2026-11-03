import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";

import "./globals.css";
import { QueryProvider } from "@/components/QueryProvider";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "FlowVest · Investment Portfolio",
	description: "Manage your investment portfolio with ease.",
};

export const viewport: Viewport = {
	themeColor: "#0b0c0a",
};

/**
 * Applies the saved theme before React hydrates so there is no flash of the
 * wrong theme. Dark is the default; only "light" needs a class.
 */
const themeScript = `try{if(localStorage.getItem("theme")==="light")document.documentElement.classList.add("light")}catch(e){}`;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
				<QueryProvider>{children}</QueryProvider>

				<ToastContainer position="top-right" theme="dark" />
			</body>
		</html>
	);
}
