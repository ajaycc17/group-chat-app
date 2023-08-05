"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

export default function Navbar() {
    const [token, setToken] = useState("");
    const router = useRouter();

    useEffect(() => {
        setToken(localStorage.getItem("token")!);
    }, []);

    // to log out
    const logOutFunc = () => {
        setToken("");
        localStorage.removeItem("token");
        deleteCookie("token");
        router.push("/login");
    };
    return (
        <header className="px-2 md:px-4">
            <div className="max-w-8xl mx-auto flex items-center justify-between py-2 border-b border-gray-700">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="./logo.svg"
                        width={40}
                        height={40}
                        alt="ChatBox"
                    />
                    <span className="font-medium text-lg">ChatBox</span>
                </Link>
                <div className="flex items-center gap-2">
                    {token === null ? (
                        <>
                            <Link
                                href="/login"
                                className="bg-green-800 px-4 py-1 font-medium rounded-xl"
                            >
                                Log in
                            </Link>
                            <Link
                                href="/login"
                                className="bg-sky-800 px-4 py-1 font-medium rounded-xl"
                            >
                                Sign up
                            </Link>
                        </>
                    ) : (
                        <>
                            <Image
                                src="./menu.svg"
                                width={35}
                                height={35}
                                alt="Groups"
                                onClick={() => {
                                    const element =
                                        document.getElementById("groupBar");
                                    const chatBar =
                                        document.getElementById("chatBar");
                                    if (element?.classList.contains("hidden")) {
                                        element.classList.add("flex");
                                        element.classList.remove("hidden");
                                        chatBar?.classList.add("hidden");
                                    } else {
                                        element?.classList.remove("flex");
                                        element?.classList.add("hidden");
                                        chatBar?.classList.remove("hidden");
                                    }
                                }}
                            />
                            <Image
                                src="./user.svg"
                                width={35}
                                height={35}
                                alt="Admin"
                                className="bg-gray-400 rounded-full"
                                onClick={() => {
                                    const element =
                                        document.getElementById("adminBar");
                                    const chatBar =
                                        document.getElementById("chatBar");
                                    if (element?.classList.contains("hidden")) {
                                        element.classList.add("flex");
                                        element.classList.remove("hidden");
                                        chatBar?.classList.add("hidden");
                                    } else {
                                        element?.classList.remove("flex");
                                        element?.classList.add("hidden");
                                        chatBar?.classList.remove("hidden");
                                    }
                                }}
                            />
                            <button
                                className="bg-blue-800 px-4 py-1 font-medium rounded-xl"
                                onClick={logOutFunc}
                            >
                                Log out
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
