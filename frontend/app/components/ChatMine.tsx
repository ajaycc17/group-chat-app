import Image from "next/image";
import Link from "next/link";
import { RiAttachmentLine } from "react-icons/ri";

export default function ChatMine(props: { message: string; userId: number }) {
    let fileDown;
    let messg = String(props.message);
    if (messg.includes("amazonaws.com")) {
        fileDown = (
            <div className="flex items-center gap-2">
                <RiAttachmentLine className="text-yellow-500 w-6 h-6 bg-gray-700 p-1 rounded-full" />
                <Link
                    href={props.message}
                    target="_blank"
                    className="text-blue-300"
                >
                    Download attachment
                </Link>
            </div>
        );
    } else {
        fileDown = props.message;
    }
    return (
        <div className="flex items-end justify-end gap-2">
            <div className="flex flex-col rounded-s-3xl rounded-tr-3xl py-4 px-5 bg-gray-900">
                <span className="font-medium text-sm text-gray-500">
                    {props.userId} &middot; 19:45 PM
                </span>
                <span className="">{fileDown}</span>
            </div>
            <div>
                <Image
                    src="/user.svg"
                    width={30}
                    height={30}
                    alt="User"
                    className="bg-gray-400 rounded-full p-1"
                />
            </div>
        </div>
    );
}
