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
            
            
        </div>
    );
}
