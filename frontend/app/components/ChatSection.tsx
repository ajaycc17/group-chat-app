import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Chat from "./Chat";
import ChatMine from "./ChatMine";
import { RiAttachmentLine } from "react-icons/ri";

const baseUrl = "http://localhost:3000";

export default function ChatSection(props: {
    messages: never[];
    handleExpandGrp: Function;
    grpId: number;
    socket: any;
}) {
    const [sendMsg, setSendMsg] = useState("");
    const [sendFile, setSendFile] = useState<File | null>(null);
    const fileInp = useRef<HTMLInputElement | null>(null);

    // to compare my chats with others
    const [myUserId, setMyUserId] = useState("");
    useEffect(() => {
        setMyUserId(localStorage.getItem("userId")!);
    }, []);

    // handle new message submission
    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        const token = localStorage.getItem("token");
        let msgUrl = baseUrl + "/message/add";
        let mediaUrl = baseUrl + "/message/add-media";

        // msg=1 & media=1
        if (sendMsg !== "" && sendFile !== null) {
            // send message
            props.socket.emit(
                "send message",
                {
                    id: props.messages.length + 1,
                    userId: myUserId,
                    content: sendMsg,
                    createdAt: new Date().toISOString(),
                },
                props.grpId
            );
            axios
                .post(
                    msgUrl,
                    { message: sendMsg, grpId: props.grpId },
                    {
                        headers: { Authorization: token },
                    }
                )
                .then(() => {
                    setSendMsg("");
                })
                .catch((err) => {
                    console.log(err);
                });

            // send file
            let fileUrl = "";
            let formData = new FormData();
            formData.append("file", sendFile);
            formData.append("grpId", String(props.grpId));
            setSendFile(null);
            if (fileInp.current != undefined) {
                fileInp.current.value = "";
            }

            axios
                .post(mediaUrl, formData, {
                    headers: {
                        Authorization: token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => res.data)
                .then((data) => {
                    fileUrl = data.fileUrl;
                    props.socket.emit(
                        "send message",
                        {
                            id: props.messages.length + 1,
                            userId: myUserId,
                            content: fileUrl,
                            createdAt: new Date().toISOString(),
                        },
                        props.grpId
                    );
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        // msg=1 & media=0
        else if (sendMsg !== "" && sendFile === null) {
            props.socket.emit(
                "send message",
                {
                    id: props.messages.length + 1,
                    userId: myUserId,
                    content: sendMsg,
                    createdAt: new Date().toISOString(),
                },
                props.grpId
            );
            axios
                .post(
                    msgUrl,
                    { message: sendMsg, grpId: props.grpId },
                    {
                        headers: { Authorization: token },
                    }
                )
                .then(() => {
                    setSendMsg("");
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        // msg=0 & media=1
        else if (sendMsg === "" && sendFile !== null) {
            let fileUrl = "";
            let formData = new FormData();
            formData.append("file", sendFile);
            formData.append("grpId", String(props.grpId));
            setSendFile(null);
            if (fileInp.current != undefined) {
                fileInp.current.value = "";
            }

            axios
                .post(mediaUrl, formData, {
                    headers: {
                        Authorization: token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => res.data)
                .then((data) => {
                    fileUrl = data.fileUrl;
                    props.socket.emit(
                        "send message",
                        {
                            id: props.messages.length + 1,
                            userId: myUserId,
                            content: fileUrl,
                            createdAt: new Date().toISOString(),
                        },
                        props.grpId
                    );
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        // msg=0 & media=0
        else {
            console.log("Cannot send an empty message!");
        }
    };
    return (
        <div>
            <div className="chat-body rounded-t-xl p-4 relative h-[calc(100vh-11.8rem)] flex flex-col-reverse gap-2 overflow-y-scroll">
                {props.messages.map(
                    (
                        messItem: {
                            id: number;
                            userId: number;
                            content: string;
                            createdAt: string;
                        },
                        index
                    ) => {
                        return Number(messItem.userId) !== Number(myUserId) ? (
                            <Chat
                                message={messItem.content}
                                userId={messItem.userId}
                                key={index}
                            />
                        ) : (
                            <ChatMine
                                message={messItem.content}
                                userId={messItem.userId}
                                key={index}
                            />
                        );
                    }
                )}
            </div>
            <form
                className="flex items-center gap-2 bg-gray-700 p-4 rounded-b-xl border-t-2 border-gray-900"
                onSubmit={handleSubmit}
            >
                <div className="flex w-full">
                    <input
                        type="text"
                        className="w-full rounded-s-xl text-sm py-2 px-3 bg-gray-800 placeholder:text-gray-400 focus:outline-none"
                        placeholder="Your message"
                        value={sendMsg}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => setSendMsg(event.target.value)}
                    />
                    <label
                        htmlFor="inpFile"
                        className="rounded-e-xl bg-gray-800 py-2 px-3 text-lg border-s-2 border-gray-700"
                    >
                        <RiAttachmentLine />
                    </label>
                    <input
                        type="file"
                        id="inpFile"
                        name="inpFile"
                        ref={fileInp}
                        className="hidden"
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                            if (event.target.files) {
                                setSendFile(event.target.files[0]);
                            }
                        }}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-green-700 text-white font-medium text-sm py-2 px-3 rounded-xl"
                >
                    Send
                </button>
            </form>
        </div>
    );
}
