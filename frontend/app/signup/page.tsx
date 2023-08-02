import React from "react";

export default function page() {
    return (
        <main className="text-black">
            <form action="/" method="post">
                <input
                    type="text"
                    name="username"
                    className="border"
                    placeholder="Name"
                />
                <input
                    type="email"
                    name="email"
                    className="border"
                    placeholder="Email"
                />
                <input
                    type="tel"
                    name="phone"
                    className="border"
                    placeholder="Phone"
                />
                <input
                    type="password"
                    name="password"
                    className="border"
                    placeholder="Password"
                />
                <button type="submit" className="border">
                    Submit
                </button>
            </form>
        </main>
    );
}
