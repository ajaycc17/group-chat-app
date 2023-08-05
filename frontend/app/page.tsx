"use client";
import axios from "axios";
import io from "socket.io-client";
import Image from "next/image";
import { useState, useEffect } from "react";

import AllGrps from "./components/AllGrps";
import MakeAdmin from "./components/MakeAdmin";
import RemoveUser from "./components/RemoveUser";
import AddMember from "./components/AddMember";
import NewGroup from "./components/NewGroup";
import ChatSection from "./components/ChatSection";

let grpId = 0;
let socket: any;

export default function Home() {
    // fetech all groups user is in
    const [grp, setGrps] = useState([]);

    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const [arrivalGrps, setArrivalGrps] = useState([]);

    let baseUrl = "https://api.codeplasma.tech";

    // one time only
    useEffect(() => {
        const token = localStorage.getItem("token");
        socket = io(baseUrl, {
            query: { token },
        });
        // send my user ID
        socket.emit("online", localStorage.getItem("userId"));

        // listen for the group updates
        socket.on("grpData", (grpData: any) => {
            setArrivalGrps(grpData);
        });

        // lissten for incoming mesages in group
        socket.on("room message", (msg: never) => {
            setArrivalMessage(msg);
        });
    }, []);

    // update messages only when new message arrives
    useEffect(() => {
        arrivalMessage &&
            setMessages((prev) => [arrivalMessage, ...prev] as never);
    }, [arrivalMessage]);

    // update groups only when new groups arrives
    useEffect(() => {
        arrivalGrps && setGrps([...arrivalGrps]);
    }, [arrivalGrps]);

    // only on initial render
    useEffect(() => {
        const token = localStorage.getItem("token");
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
    }, []);

    // set grpId
    var customSetGrpId = function (id: number) {
        return new Promise(function (resolve, reject) {
            try {
                grpId = id;
                socket.emit("join", grpId);
                resolve("Id updated!");
            } catch (err) {
                reject(Error("It broke"));
            }
        });
    };

    // fetch the messages of a particular group
    const handleExpandGrp = () => {
        const token = localStorage.getItem("token");
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
    return (
        <main className="px-2 md:px-4">
            <div className="max-w-8xl mx-auto grid grid-cols-12 gap-4">
                {/* show all groups user is in */}
                <div
                    id="groupBar"
                    className="col-span-12 xl:col-span-3 h-[calc(100vh-87px)] hidden xl:flex flex-col gap-3 py-4 overflow-y-scroll"
                >
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
                </div>
                {/* the chat section */}
                <div
                    id="chatBar"
                    className="col-span-12 xl:col-span-6 py-4 h-[calc(100vh-87px)]"
                >
                    {grpId !== 0 ? (
                        <ChatSection
                            messages={messages}
                            handleExpandGrp={handleExpandGrp}
                            grpId={grpId}
                            socket={socket}
                        />
                    ) : (
                        <div className="bg-gray-800 rounded-xl p-4 h-full flex flex-col gap-2 items-center justify-center">
                            <Image
                                src="/no-chat.svg"
                                width={60}
                                height={60}
                                alt="Open a group"
                                className="bg-gray-300 rounded-full p-2"
                            />
                            <h2 className="font-semibold text-xl text-gray-500 text-center">
                                Open a group to send messages
                            </h2>
                        </div>
                    )}
                </div>
                {/* contains some forms for admin */}
                <div
                    id="adminBar"
                    className="col-span-12 xl:col-span-3 h-[calc(100vh-87px)] hidden xl:flex flex-col gap-3 py-4 overflow-y-scroll"
                >
                    <h2 className="text-lg font-semibold pb-1 mb-1 border-b">
                        Admin Actions:
                    </h2>
                    {/* to create new group */}
                    <NewGroup />
                    {/* add members */}
                    <AddMember currGrp={grpId} socket={socket} />
                    {/* remove a user */}
                    <RemoveUser currGrp={grpId} />
                    {/* make admin */}
                    <MakeAdmin currGrp={grpId} />
                </div>
            </div>
        </main>
    );
}
