import axios from "axios";
import { useState } from "react";

const baseUrl = "http://localhost:3000";

export default function NewGroup() {
    const [newGrpName, setNewGrpName] = useState("");

    // function to create a new group
    const createNewGroup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let myGrp = {
            grpName: newGrpName,
            desc: "New Group",
        };

        // for server
        let url = baseUrl + "/group/add";
        const token = localStorage.getItem("token");
        try {
            await axios.post(url, myGrp, {
                headers: { Authorization: token },
            });
            setNewGrpName("");
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="bg-gray-700 p-4 rounded-xl">
            <h3 className="pb-2 text-center text-white font-medium border-b border-gray-500 mb-3">
                Create a new group
            </h3>
            <form onSubmit={createNewGroup} className="flex items-center gap-2">
                <input
                    type="text"
                    className="text-sm bg-gray-800 placeholder:text-gray-400 p-2 rounded-xl block w-full focus:outline-none"
                    placeholder="New group's name"
                    value={newGrpName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setNewGrpName(event.target.value);
                    }}
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white text-sm font-medium py-2 px-3 rounded-xl"
                >
                    Create
                </button>
            </form>
        </div>
    );
}
