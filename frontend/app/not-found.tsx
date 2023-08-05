import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
    return (
        <div className="px-2 md:px-4 h-full">
            <div className="max-w-8xl mx-auto h-full">
                <div className="flex flex-col items-center gap-4 justify-center h-full">
                    <Image src="/404.svg" height={55} width={55} alt="404" />
                    <h1 className="text-xl font-medium">404: Page not found</h1>
                    <Link
                        href="/"
                        className="bg-green-800 py-2 px-4 rounded-xl"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
