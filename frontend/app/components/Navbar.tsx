import Image from "next/image";

export default function Navbar() {
    return (
        <header className="px-2 md:px-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between py-2 border-b">
                <div className="flex items-center">
                    <Image
                        src="./logo.svg"
                        width={45}
                        height={45}
                        alt="ChatBox"
                    />
                    <span className="font-medium text-lg">ChatBox</span>
                </div>
                <div className="flex items-center gap-2">
                    <Image
                        src="./user.svg"
                        width={35}
                        height={35}
                        alt="ChatBox"
                        className="bg-gray-200 rounded-full"
                    />
                </div>
            </div>
        </header>
    );
}
