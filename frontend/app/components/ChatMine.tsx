import Image from "next/image";

export default function ChatMine() {
    return (
        <div className="flex items-end justify-end gap-2">
            <div className="flex flex-col rounded-s-3xl rounded-tr-3xl py-4 px-5 backdrop-blur-sm bg-emerald-400/30">
                <span className="font-medium text-sm text-gray-500">
                    Ajay Choudhury &middot; 19:45 PM
                </span>
                <span className="">This is a dummy message by me.</span>
            </div>
            <div>
                <Image
                    src="/user.svg"
                    width={42}
                    height={42}
                    alt="User"
                    className="bg-gray-200 rounded-full p-1"
                />
            </div>
        </div>
    );
}
