import Image from "next/image";
import Textarea from "@/components/Textarea";
import { twMerge } from "tailwind-merge";

interface BoxProps {
    className?: string,
    image_src: string,
    title: string,
    category: string,
    image_id: number,
    caption_en: string,
    caption_zh: string,
    onSubmit: (value: number) => Promise<void>,
}

const Box: React.FC<BoxProps> = ({
    className,
    image_src,
    title,
    category,
    image_id,
    caption_en,
    caption_zh,
    onSubmit,

}) => {

    return (
        <div className={twMerge('w-full flex-col flex items-start rounded-md border p-4 hover:bg-slate-100 shadow-md hover:shadow-lg',
            className)}>
            <div className="flex flex-row mt-6 ">
                <Image className="hover:brightness-110" src={image_src}
                    alt="commercial_area_001.jpg" width={300} height={300} />
                <div className="pl-8 flex flex-col">
                    <h1 className="text-xl font-bold mb-2">{title}</h1>
                    <p>Image ID: {image_id}</p>
                    <p>Category: {category}</p>
                </div>

            </div>

            <div className="flex w-full md:flex-row md:space-x-8 mt-6
            flex-col space-y-8 md:space-y-0">
                <div className="flex-col w-full space-y-4">
                    <h1 className="text-xl font-bold">English</h1>
                    <Textarea content={caption_en} />
                </div>

                <div className="flex-col w-full space-y-4">
                    <h1 className="text-xl font-bold">Chinese</h1>
                    <Textarea content={caption_zh} />
                </div>
            </div>

            <div className="flex justify-end w-full mt-4 pr-4">
                <button className="bg-green-500 text-white rounded-md w-24 h-10 hover:bg-green-400"
                    onClick={() => onSubmit(1)}>
                    提交
                </button>
            </div>

        </div>
    )
}

export default Box;