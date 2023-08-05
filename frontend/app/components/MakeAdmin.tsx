import axios from "axios";
import { useState } from "react";

const baseUrl = "http://localhost:3000";

export default function MakeAdmin(props: { currGrp: number }) {
    const [groupId, setGroupId] = useState("");
    const [userId, setUserId] = useState("");

    // function to make one user admin
    const makeAdmin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let myGrp = {
            grpId: groupId,
            userId: userId,
        };
        // send request to the server
        let url = baseUrl + `/group/${props.currGrp}/make-admin`;
        const token = localStorage.getItem("token");
        try {
            await axios.post(url, myGrp, {
                headers: { Authorization: token },
            });
            setGroupId("");
            setUserId("");
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="bg-gray-700 p-4 rounded-xl">
            <h3 className="text-white pb-2 text-center font-medium border-b border-gray-500 mb-3">
                Appoint an Admin
            </h3>
            <form onSubmit={makeAdmin} className="flex items-center gap-2">
                <input
                    type="number"
                    className="text-sm bg-gray-800 placeholder:text-gray-400 p-2 rounded-xl block w-full focus:outline-none"
                    placeholder="Group Id"
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
                    Appoint
                </button>
            </form>
        </div>
    );
}
