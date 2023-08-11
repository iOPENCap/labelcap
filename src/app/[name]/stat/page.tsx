"use client";

import { FC, useEffect, useState } from "react";
import { StatInfo } from '@/types';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


/**
 * @brief 获取统计信息
 * @returns statInfo: statInfo
 */
const getStat = async () => {
    try {
        const res: Response = await fetch(`/api/get-stat`, {
            method: 'GET',
            headers: new Headers({ 'Content-Type': 'application/json' }),
        })

        if (!res.ok) {
            console.log('error when fetching history');
            throw new Error(res.statusText);
        }

        const data = await res.json();
        return data.statInfo;

    } catch (error) {
        console.log(error);
        return ['error'];
    }
}

const Stat = () => {
    const [statInfo, setStatInfo] = useState<StatInfo>();

    useEffect(() => {
        getStat().then(
            (data) => {
                setStatInfo(data);
            }
        );
    }, []);

    return (
        <div className="py-12 min-h-screen">
            <div className="px-12 h-56 flex justify-between">
                <div className="w-1/4 bg-gray-100 mx-6 p-8 rounded-xl flex-col shadow-md">
                    <p className="text-6xl font-bold">{statInfo ? statInfo.labeled_num : 'NaN'}</p>
                    <p className="mt-14 text-lg text-neutral-500">已检验标注数</p>
                </div>

                <div className="w-1/4 bg-gray-100 mx-6 p-8 rounded-xl flex-col shadow-md">
                    <p className="text-6xl font-bold">{statInfo ? statInfo.last_week_labeled_num : 'NaN'}</p>
                    <p className="mt-14 text-lg text-neutral-500">近一周检验标注数</p>
                </div>

                <div className="w-1/4 bg-gray-100 mx-6 p-8 rounded-xl flex-col shadow-md">
                    <p className="text-6xl font-bold">{statInfo ? (30800 - statInfo.labeled_num) : 'NaN'}</p>
                    <p className="mt-14 text-lg text-neutral-500">剩余标注数</p>
                </div>

                <div className="w-1/4 bg-gray-100 mx-6 p-8 rounded-xl flex-col shadow-md">
                    <p className="text-6xl font-bold">{statInfo ? (30800 - statInfo.labeled_num) / statInfo.last_week_labeled_num : 'NaN'}</p>
                    <p className="mt-14 text-lg text-neutral-500">剩余周数</p>
                </div>
            </div>

            <p className="px-12 text-2xl mt-20 font-bold">Users</p>
            <div className="bg-gray-100 p-12 mt-8">
                <Table className="mt-8">
                    <TableHeader>
                        <TableRow className=" text-gray-500 font-bold text-lg">
                            <TableHead className="w-[100px]">用户</TableHead>
                            <TableHead>总标注</TableHead>
                            <TableHead>上周标注</TableHead>
                            <TableHead>剩余标注</TableHead>
                            <TableHead className="text-right">剩余周数</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {statInfo && Object.entries(statInfo.user_stat).map(
                            ([username, stat], index) => (
                                <TableRow key={index} className="text-lg">
                                    <TableCell className="font-medium">{username}</TableCell>
                                    <TableCell>{stat.labeled_num}</TableCell>
                                    <TableCell>{stat.last_week_labeled_num}</TableCell>
                                    <TableCell>{4400 - stat.labeled_num}</TableCell>
                                    <TableCell className="text-right">{(4400 - stat.labeled_num) / stat.last_week_labeled_num}</TableCell>
                                </TableRow>
                            )
                        )}

                    </TableBody>
                </Table>
            </div>
            <div>

            </div>
        </div>
    )
}

export default Stat