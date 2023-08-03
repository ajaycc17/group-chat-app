"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import AllGrps from "./components/AllGrps";
import Chat from "./components/Chat";

const dataArr: (string | null)[] = [];

export default function Home() {
    const [message, setMessage] = useState("");
    const [effectLogic, setEffectLogic] = useState(false);
    let lastIdNum = 0;
    if (localStorage.getItem(String(0)) !== null) {
        const theData = JSON.parse(localStorage.getItem(String(0))!);
        lastIdNum = theData.id;
    }
    const [lastId, setLastId] = useState(lastIdNum);
    const [messData, setMessData] = useState([] as (string | null)[]);
    let baseUrl = "http://localhost:3000";

    // only on initial render
    useEffect(() => {
        if (localStorage.getItem(String(0)) !== null) {
            for (let i = 0; i < 10; i++) {
                dataArr.push(JSON.parse(localStorage.getItem(String(i))!));
            }
        }
    }, []);

    // every second check
    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     // get expense and downloadeds data together
    //     let url = baseUrl + `/message?last=${lastId}`;
    //     axios
    //         .get(url, {
    //             headers: { Authorization: token },
    //         })
    //         .then((res) => res.data)
    //         .then((data) => {
    //             const limit = data.length > 10 ? 10 : data.length;
    //             for (let i = 0; i < limit; i++) {
    //                 localStorage.setItem(String(i), JSON.stringify(data[i]));
    //                 dataArr[i] = data[i];
    //             }
    //         })
    //         .catch((err) => console.log(err));
    // }, [effectLogic]);

    // update every second
    setInterval(() => {
        setEffectLogic(!effectLogic);
    }, 1000);

    // handle message submission
    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        let url = baseUrl + "/message/add";
        const token = localStorage.getItem("token");
        axios
            .post(
                url,
                { message: message },
                {
                    headers: { Authorization: token },
                }
            )
            .then(() => {
                setMessage("");
                setEffectLogic(!effectLogic);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <main className="px-2 md:px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-12 gap-4">
                <div className="col-span-4 h-[calc(100vh-87px)] flex flex-col gap-3 py-4">
                    <AllGrps />
                    <AllGrps />
                    <AllGrps />
                </div>
                <div className="col-span-8 py-4 h-[calc(100vh-87px)]">
                    <div className="chat-body rounded-t-xl p-4 relative h-[calc(100%-4.4rem)] flex flex-col-reverse gap-2 overflow-y-scroll">
                        {dataArr.map((messItem: any) => {
                            return <Chat data={messItem.content} />;
                        })}
                    </div>
                    {/* message sending form */}
                    <form
                        className="flex items-center gap-2 backdrop-blur-md bg-gray-300/30 p-4 rounded-b-xl"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            name="message"
                            className="w-full rounded-md text-sm py-2 px-3 border focus:outline-none"
                            placeholder="Your message"
                            value={message}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => setMessage(event.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-green-700 text-white text-sm py-2 px-3 rounded-md"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
