"use client";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Warning from "../components/Warning";
import { setCookie } from "cookies-next";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [visible, setVisible] = useState(false);
    const [warning, setWarning] = useState("");

    const baseUrl = "http://localhost:3000";
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // login process
        let myUser = {
            email: email,
            password: password,
        };

        // for server
        let url = baseUrl + "/user/login";
        try {
            const res = await axios.post(url, myUser);
            setCookie("token", res.data.token);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.userId);
            router.push("/");
        } catch (err: any) {
            setWarning(err.response.data.message);
            setVisible(true);
            setTimeout(() => {
                setWarning("");
                setVisible(false);
            }, 3000);
        }
    };
    return (
        <div className="min-h-[calc(100vh-116px)] flex items-center px-2 md:px-4">
            <section className="w-full md:max-w-md mx-auto bg-gray-700 p-6 rounded-2xl my-8">
                <h1 className="font-head font-semibold mb-1 text-center text-xl md:text-2xl">
                    Log in to ChatBox
                </h1>
                <p className="text-center pb-3 border-b border-gray-500 text-gray-300">
                    Access the chat app
                </p>

                {visible && <Warning message={warning} />}

                <form
                    id="login-form"
                    className="mt-3 font-medium"
                    onSubmit={handleSubmit}
                >
                    <div className="mb-4">
                        <input
                            type="email"
                            className="bg-gray-800 rounded-xl block w-full p-2.5 focus:outline-none"
                            required
                            placeholder="Your email"
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setEmail(event.target.value);
                            }}
                        />
                    </div>
                    <div className="mb-2">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="bg-gray-800 rounded-xl block w-full p-2.5 focus:outline-none"
                            required
                            placeholder="Password"
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setPassword(event.target.value);
                            }}
                        />
                    </div>
                    <div className="mb-4 text-right">
                        <Link
                            href="/forgot-password"
                            className="text-right text-blue-300"
                        >
                            Forgot password
                        </Link>
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-green-800 focus:outline-none font-medium w-full px-5 py-2.5 text-center rounded-xl mb-3"
                    >
                        Log in
                    </button>
                    <p>
                        Do not have an account?{" "}
                        <Link href="/signup" className="text-blue-300">
                            Sign up
                        </Link>
                        .
                    </p>
                </form>
            </section>
        </div>
    );
}
