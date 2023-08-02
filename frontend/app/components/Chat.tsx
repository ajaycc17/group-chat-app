import Image from "next/image";

export default function Chat(props: { data: string }) {
    return (
        <div className="flex items-end gap-2">
            <div>
                <Image
                    src="/user.svg"
                    width={42}
                    height={42}
                    alt="User"
                    className="bg-gray-200 rounded-full p-1"
                />
            </div>
            <div className="flex flex-col rounded-e-3xl rounded-tl-3xl py-4 px-5 backdrop-blur-sm bg-gray-400/30">
                <span className="font-medium text-sm text-gray-500">
                    Ajay Choudhury &middot; 19:45 PM
                </span>
                <span className="">{props.data}</span>
            </div>
        </div>
    );
}
