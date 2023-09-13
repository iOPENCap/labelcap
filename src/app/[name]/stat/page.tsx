"use client";

import { FC, SetStateAction, useEffect, useState, Dispatch } from "react";
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
import { Label } from "@radix-ui/react-label";


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

/**
 * @brief 从浏览器缓存中获取 remainDays
 * @returns 
 */
const PAGE_KEY = 'stat';
const useRemainDays = () => {
    const [remainDays, setRemainDays] = useState<number>(60);

    useEffect(() => {
        const storedPage = localStorage.getItem(PAGE_KEY);
        if (storedPage) {
            setRemainDays(Number(storedPage));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(PAGE_KEY, remainDays.toString());
    }, [remainDays]);

    return [remainDays, setRemainDays];
}

const Stat = () => {
    const [statInfo, setStatInfo] = useState<StatInfo>();
    const [remainDays, setRemainDays] = useRemainDays();

    useEffect(() => {
        getStat().then(
            (data) => {
                setStatInfo(data);
            }
        );
    }, []);

    return (
        <div className="py-12 min-h-screen">
            <div className="px-12 flex justify-between space-y-4 flex-col md:flex-row md:space-y-0">
                <div className="md:w-1/4 bg-gray-100 md:mx-6 p-8 rounded-xl flex-col shadow-md">
                    <p className="text-6xl font-bold">{statInfo ? statInfo.labeled_num : 'NaN'}</p>
                    <p className="mt-14 text-lg text-neutral-500">已检验标注数</p>
                </div>

                <div className="md:w-1/4 bg-gray-100 md:mx-6 p-8 rounded-xl flex-col shadow-md">
                    <p className="text-6xl font-bold">{statInfo ? statInfo.last_week_labeled_num : 'NaN'}</p>
                    <p className="mt-14 text-lg text-neutral-500">近7天检验标注数</p>
                </div>

                <div className="md:w-1/4 bg-gray-100 md:mx-6 p-8 rounded-xl flex-col shadow-md">
                    <p className="text-6xl font-bold">{statInfo ? (31500 - statInfo.labeled_num) : 'NaN'}</p>
                    <p className="mt-14 text-lg text-neutral-500">剩余标注数</p>
                </div>

                <div className="md:w-1/4 bg-gray-100 md:mx-6 p-8 rounded-xl flex-col shadow-md">
                    <p className="text-6xl font-bold">
                        {statInfo ? Math.ceil(statInfo.labeled_num) : 'NaN'}/
                        {statInfo ? Math.ceil((31500 - statInfo.labeled_num) / (remainDays as number) / 7) : 'NaN'}
                    </p>
                    <p className="mt-14 text-lg text-neutral-500">本周任务完成情况</p>
                </div>
            </div>

            <p className="px-12 text-2xl mt-20 font-bold">Users</p>
            <div className="bg-gray-100 p-12 mt-8">
                <Table className="mt-8">
                    <TableHeader>
                        <TableRow className=" text-gray-500 font-bold text-lg">
                            <TableHead className="w-[100px]">用户</TableHead>
                            <TableHead>总标注</TableHead>
                            <TableHead>近7天标注</TableHead>
                            <TableHead>剩余标注</TableHead>
                            <TableHead className="text-right">本周任务完成情况</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {statInfo && Object.entries(statInfo.user_stat).map(
                            ([username, stat], index) => (
                                <TableRow key={index} className="text-lg">
                                    <TableCell className="font-medium">{username}</TableCell>
                                    <TableCell>{stat.labeled_num}</TableCell>
                                    <TableCell>{stat.last_week_labeled_num}</TableCell>
                                    <TableCell>{3938 - stat.labeled_num}</TableCell>
                                    <TableCell className="text-right">
                                        {stat.labeled_num}/
                                        {Math.ceil((31500 - statInfo.labeled_num) / (remainDays as number) / 7 / Object.keys(statInfo.user_stat).length)}
                                    </TableCell>
                                </TableRow>
                            )
                        )}

                    </TableBody>
                </Table>
            </div>

            <p className="px-12 text-2xl mt-20 font-bold">Settings</p>
            <div className="bg-gray-100 p-12 mt-8 ">
                <Label>计划剩余时间（天）：</Label>
                <input type="number" className='form-input rounded-lg text-sm w-24' value={(remainDays as number)} onChange={(e) => (setRemainDays as Dispatch<SetStateAction<number>>)(parseInt(e.target.value))} />
            </div>

        </div>
    )
}

export default Stat