"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"
import { CaptionItem } from "@/types";
import Image from "next/image"
import { FC, useEffect, useState } from "react";
import Box from "@/components/Box";

const getHistory = async (user: string) => {
    try {
        const res: Response = await fetch(`/api/get-history`, {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            // TODO: change user
            body: JSON.stringify({ user: user }),
        });

        if (!res.ok) {
            console.log('error when fetching history');
            throw new Error(res.statusText);
        }

        const data = await res.json();
        return data.itemList;

    } catch (error) {
        console.log(error);
        return ['error'];
    }
}

const postCaptions = async (captionItem: CaptionItem, user: string) => {
    try {
        const res: Response = await fetch(`/api/post-captions`, {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            body: JSON.stringify({ captionItem: captionItem, user: user }),
        });

        if (!await res.ok) {
            console.log('error when posting caption');
            throw new Error(res.statusText);
        }

    } catch (error) {
        console.log(error);
    }
}

interface HistoryProps {
    params: { name: string }
}

const Hisroty: FC<HistoryProps> = ({ params }) => {
    const [history, setHistory] = useState<CaptionItem[]>([]);
    const { name } = params;
    console.log(name);

    useEffect(() => {
        const fetchHistory = async () => {
            getHistory('gcx').then(
                (data) => {
                    setHistory(data);
                    console.log(data);
                    console.log(history);
                }
            );
        };
        fetchHistory();
    }, []);

    const onSubmit = async (captionItem: CaptionItem, index: number) => {
        // 发送验证后的caption
        postCaptions(captionItem, name).then(
            () => {
                // 更新caption
                const newCaptions = [...history];
                newCaptions[index] = captionItem;
                setHistory(newCaptions);
            }
        )
    }

    return (
        <div className="min-h-screen p-12">
            <Accordion type="single" collapsible>

                {history.length > 0 && history.map((item, index) => (
                    <AccordionItem value={`item${index}`} key={index}>
                        <AccordionTrigger className="text-lg font-bold">
                            {item.title}
                        </AccordionTrigger>
                        <AccordionContent key={index}>
                            <Box key={index} title={item.title}
                                id={index}
                                image_src={item.image_src}
                                image_id={item.image_id}
                                caption_en={item.caption_en}
                                caption_zh={item.caption_zh}
                                category={item.title.substring(0, item.title.lastIndexOf('_'))}
                                onSubmit={(captionItem) => onSubmit(captionItem, index)} />
                        </AccordionContent>
                    </AccordionItem>
                ))}

            </Accordion>
        </div>
    )
}

export default Hisroty;