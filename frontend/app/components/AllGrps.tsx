import Image from "next/image";

export default function AllGrps(props: {
    name: string;
    desc: string;
    id: number;
    handleExpandGrp: Function;
    customSetGrpId: Function;
}) {
    return (
        <div
            className="p-3 flex items-center justify-between gap-2 bg-gray-700 rounded-xl cursor-pointer"
            onClick={() => {
                props
                    .customSetGrpId(props.id)
                    .then(() => {
                        props.handleExpandGrp();
                    })
                    .catch((err: any) => console.log(err));
            }}
        >
            <div className="flex items-center gap-2">
                <Image
                    src="/user.svg"
                    width={42}
                    height={42}
                    alt="User"
                    className="bg-gray-400 rounded-full p-1"
                />
                <div className="flex flex-col">
                    <span className="font-medium">{props.name}</span>
                    <span className="text-xs mt-[-3px] text-gray-300">
                        {props.desc}
                    </span>
                </div>
            </div>
            <div className="py-0.5 px-2 bg-black text-xs text-white rounded-xl">
                ID : {props.id}
            </div>
        </div>
    );
}
