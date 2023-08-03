"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import AllGrps from "./components/AllGrps";
import Chat from "./components/Chat";

let grpId = 0;

export default function Home() {
    const [grp, setGrps] = useState([]);
    const [grpFetch, setGrpFetch] = useState(false);
    const [grpName, setGrpName] = useState("");
    const [grpOId, setGrpOId] = useState("");
    const [userId, setUserId] = useState("");

    const [messages, setMessages] = useState([]);

    const [sendMsg, setSendMsg] = useState("");

    let baseUrl = "http://localhost:3000";
    const token = localStorage.getItem("token");

    // only on initial render
    useEffect(() => {
        // update every second
        setInterval(() => {
            handleExpandGrp();
            setGrpFetch(!grpFetch);
        }, 1000);
    }, []);

    // only on initial render
    useEffect(() => {
        let url = baseUrl + "/message";
        axios
            .get(url, {
                headers: { Authorization: token },
            })
            .then((res) => res.data.data)
            .then((data) => {
                setGrps(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [grpFetch]);

    // set grpId
    var customSetGrpId = function (id: number) {
        return new Promise(function (resolve, reject) {
            try {
                grpId = id;
                resolve("Id updated!");
            } catch (err) {
                reject(Error("It broke"));
            }
        });
    };

    // fetch the messages of a particular group
    const handleExpandGrp = () => {
        let url = baseUrl + `/message/${grpId}`;
        axios
            .get(url, {
                headers: { Authorization: token },
            })
            .then((res) => res.data)
            .then((data) => {
                setMessages(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // handle message submission
    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        let url = baseUrl + "/message/add";
        const token = localStorage.getItem("token");
        axios
            .post(
                url,
                { message: sendMsg, grpId: grpId },
                {
                    headers: { Authorization: token },
                }
            )
            .then(() => {
                setSendMsg("");
                handleExpandGrp();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleGrpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let myGrp = {
            grpName: grpName,
            desc: "New Group",
        };

        // for server
        let url = baseUrl + "/group/add";
        try {
            const res = await axios.post(url, myGrp, {
                headers: { Authorization: token },
            });
        } catch (err) {
            console.log(err);
        }
    };
    const handleMemberSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let myGrp = {
            grpId: grpOId,
            userId: userId,
        };

        // for server
        let url = baseUrl + `/group/${grpId}/add-user`;
        try {
            await axios.post(url, myGrp, {
                headers: { Authorization: token },
            });
        } catch (err) {
            console.log(err);
        }
    };
    const revokeMemberSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let myGrp = {
            grpId: grpOId,
            userId: userId,
        };

        // for server
        let url = baseUrl + `/group/${grpId}/remove-user`;
        try {
            await axios.post(url, myGrp, {
                headers: { Authorization: token },
            });
        } catch (err) {
            console.log(err);
        }
    };
    const makeAdmin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let myGrp = {
            grpId: grpOId,
            userId: userId,
        };

        // for server
        let url = baseUrl + `/group/${grpId}/make-admin`;
        try {
            await axios.post(url, myGrp, {
                headers: { Authorization: token },
            });
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <main className="px-2 md:px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-12 gap-4">
                <div className="col-span-4 h-[calc(100vh-87px)] flex flex-col gap-3 py-4 overflow-y-scroll">
                    {grp.map(
                        (grpItem: {
                            id: number;
                            name: string;
                            description: string;
                        }) => (
                            <AllGrps
                                name={grpItem.name}
                                desc={grpItem.description}
                                id={grpItem.id}
                                handleExpandGrp={handleExpandGrp}
                                customSetGrpId={customSetGrpId}
                                key={"grp" + grpItem.id}
                            />
                        )
                    )}
                    <form onSubmit={handleGrpSubmit}>
                        <input
                            type="text"
                            name="grpName"
                            className="border"
                            placeholder="Group Name"
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setGrpName(event.target.value);
                            }}
                        />
                        <button type="submit" className="bg-black text-white">
                            Create
                        </button>
                    </form>

                    {/* add members */}
                    <form onSubmit={handleMemberSubmit}>
                        <input
                            type="text"
                            name="grpName"
                            className="border"
                            placeholder="Group Id"
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setGrpOId(event.target.value);
                            }}
                        />
                        <input
                            type="text"
                            name="grpName"
                            className="border"
                            placeholder="User id"
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setUserId(event.target.value);
                            }}
                        />
                        <button type="submit" className="bg-black text-white">
                            Add
                        </button>
                    </form>

                    {/* remove a user */}
                    <form onSubmit={revokeMemberSubmit}>
                        <h2>To remove a member:</h2>
                        <input
                            type="text"
                            name="grpName"
                            className="border"
                            placeholder="Group Id"
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setGrpOId(event.target.value);
                            }}
                        />
                        <input
                            type="text"
                            name="grpName"
                            className="border"
                            placeholder="User id"
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setUserId(event.target.value);
                            }}
                        />
                        <button type="submit" className="bg-black text-white">
                            Remove
                        </button>
                    </form>

                    {/* make admin */}
                    <form onSubmit={makeAdmin}>
                        <h2>To make a member admin:</h2>
                        <input
                            type="text"
                            name="grpName"
                            className="border"
                            placeholder="Group Id"
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setGrpOId(event.target.value);
                            }}
                        />
                        <input
                            type="text"
                            name="grpName"
                            className="border"
                            placeholder="User id"
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setUserId(event.target.value);
                            }}
                        />
                        <button type="submit" className="bg-black text-white">
                            Make Admin
                        </button>
                    </form>
                </div>
                <div className="col-span-8 py-4 h-[calc(100vh-87px)]">
                    <div className="chat-body rounded-t-xl p-4 relative h-[calc(100%-4.4rem)] flex flex-col-reverse gap-2 overflow-y-scroll">
                        {messages.map(
                            (messItem: {
                                id: number;
                                userId: number;
                                content: string;
                                createdAt: string;
                            }) => {
                                return (
                                    <Chat
                                        message={messItem.content}
                                        userId={messItem.userId}
                                        key={"mess" + messItem.id}
                                    />
                                );
                            }
                        )}
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
                            value={sendMsg}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => setSendMsg(event.target.value)}
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
