import axios from "axios";
import { useState } from "react";

const baseUrl = "https://api.codeplasma.tech";

export default function AddMember(props: { currGrp: number; socket: any }) {
    const [groupId, setGroupId] = useState("");
    const [userId, setUserId] = useState("");

    // function to add members to group
    const handleMemberSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let myGrp = {
            grpId: groupId,
            userId: userId,
        };

        // for server
        let url = baseUrl + `/group/${props.currGrp}/add-user`;
        const token = localStorage.getItem("token");
        try {
            await axios.post(url, myGrp, {
                headers: { Authorization: token },
            });
            props.socket.emit("add member", userId);
            setGroupId("");
            setUserId("");
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="bg-gray-700 p-4 rounded-xl">
            <h3 className="text-white pb-2 text-center font-medium border-b border-gray-500 mb-3">
                Add members to group
            </h3>
            <form
                onSubmit={handleMemberSubmit}
                className="flex items-center gap-2"
            >
                <input
                    type="number"
                    className="text-sm bg-gray-800 placeholder:text-gray-400 p-2 rounded-xl block w-full focus:outline-none"
                    placeholder="Group id"
                    value={groupId}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setGroupId(event.target.value);
                    }}
                />
                <input
                    type="number"
                    className="text-sm bg-gray-800 placeholder:text-gray-400 p-2 rounded-xl block w-full focus:outline-none"
                    placeholder="User id"
                    value={userId}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setUserId(event.target.value);
                    }}
                />
                <button
                    type="submit"
                    className="bg-green-700 text-white text-sm font-medium py-2 px-3 rounded-xl"
                >
                    Add
                </button>
            </form>
        </div>
    );
}
