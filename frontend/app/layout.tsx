import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ChatBox | Group Chat App",
    description: "Group chat app built using Node.js and Next.js.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-gray-900 text-white`}>
                <Navbar />
                <main className="h-[calc(100vh-87px)]">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
