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

        if (res.ok) {
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
    const user = params.name;

    useEffect(() => {
        const fetchHistory = async () => {
            getHistory(user).then(
                (data) => {
                    setHistory(data);
                }
            );
        };
        fetchHistory();
    }, []);

    const onSubmit = async (captionItem: CaptionItem, index: number) => {
        // 发送验证后的caption
        postCaptions(captionItem, user);
    }

    const onCaptionChange = async (caption_en: string[], caption_zh: string[], index: number) => {
        // 更新caption
        const newCaptions = [...history];
        newCaptions[index].caption_en = caption_en;
        newCaptions[index].caption_zh = caption_zh;
        setHistory(newCaptions);
    }

    console.log(history);

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
                                isChinese={item.isZh}
                                category={item.title.substring(0, item.title.lastIndexOf('_'))}
                                onSubmit={() => onSubmit({
                                    title: item.title,
                                    image_id: item.image_id,
                                    image_src: item.image_src,
                                    caption_en: item.caption_en,
                                    caption_zh: item.caption_zh,
                                    isZh: item.isZh,
                                }, index)}
                                onCaptionChange={(caption_en, caption_zh) => onCaptionChange(caption_en, caption_zh, index)}
                            />
                        </AccordionContent>
                    </AccordionItem>
                ))}

            </Accordion>
        </div>
    )
}

export default Hisroty;