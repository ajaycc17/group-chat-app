"use client";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import Warning from "../components/Warning";
import { useRouter } from "next/navigation";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const [visible, setVisible] = useState(false);
    const [warning, setWarning] = useState("");

    const baseUrl = "http://localhost:3000";
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // signup process
        let myUser = {
            name: name,
            email: email,
            phone: phone,
            password: password,
        };

        // for server
        let url = baseUrl + "/user/signup";
        try {
            const res = await axios.post(url, myUser);
            if (res.status !== 201) {
                setWarning(res.data.message);
                setVisible(true);
                setTimeout(() => {
                    setWarning("");
                    setVisible(false);
                }, 3000);
            } else {
                router.push("/login");
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="min-h-[calc(100vh-116px)] flex items-center px-2 md:px-4">
            <section className="w-full md:max-w-md mx-auto my-8 bg-gray-700 p-6 rounded-2xl">
                <h1 className="font-head font-semibold mb-1 text-center text-xl md:text-2xl">
                    Create your account
                </h1>
                <p className="text-center pb-3 border-b border-gray-500 text-gray-300">
                    Access the chat app
                </p>

                {visible && <Warning message={warning} />}

                <form className="mt-3 font-medium" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="bg-gray-800 rounded-xl block w-full p-2.5 focus:outline-none"
                            required
                            placeholder="Your name"
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setName(event.target.value);
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="email"
                            id="email"
                            name="email"
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
                    <div className="mb-4">
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="bg-gray-800 rounded-xl block w-full p-2.5 focus:outline-none"
                            placeholder="Phone"
                            required
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setPhone(event.target.value);
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            id="password1"
                            name="password1"
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
                    <button
                        type="submit"
                        className="text-white bg-green-800 focus:outline-none font-medium w-full px-5 py-2.5 text-center mb-3 rounded-xl"
                    >
                        Sign up
                    </button>
                    <p>
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-300">
                            Log in
                        </Link>
                        .
                    </p>
                </form>
            </section>
        </div>
    );
}
