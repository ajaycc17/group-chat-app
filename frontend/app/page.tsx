export default function Home() {
    return (
        <main>
            <div className="px-2 md:px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl font-semibold text-center mb-3">
                        Chat App
                    </h1>
                    <div>
                        <div className="py-2 px-4 bg-gray-200 mb-1">
                            <span className="font-semibold">Ajay: </span>
                            <span>Message</span>
                        </div>
                        <div className="py-2 px-4 bg-gray-200 mb-1">
                            <span className="font-semibold">Ajay: </span>
                            <span>Message</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-blue-800 p-4 fixed w-full bottom-0">
                <div className="max-w-4xl mx-auto">
                    <form action="/" method="post" className="flex gap-2">
                        <input
                            type="text"
                            name="message"
                            className="border p-1 w-full"
                            placeholder="Your message"
                        />
                        <button
                            type="submit"
                            className="bg-green-700 text-white px-3 py-1"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
