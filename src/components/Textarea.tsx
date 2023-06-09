"use client";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface TextareaProps {
    className?: string,
    content: string,
}

const Textarea: React.FC<TextareaProps> = ({
    className,
    content
}) => {
    const [value, setValue] = useState(content);

    return (
        <textarea className={twMerge("p-4 border border-gray-300 rounded-md", className)} value={value}
            onChange={(event) => setValue(event.target.value)}>

        </textarea>
    )
}

export default Textarea;