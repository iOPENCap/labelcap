"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation';

interface TopbarProps {
    children: React.ReactNode;
    className?: string;
}

const Topbar: React.FC<TopbarProps> = ({
    children,
    className,
}) => {
    const pathname = usePathname();

    const routes = useMemo(() => [
        { name: 'Label', href: '/main', active: pathname === '/main' },
        { name: 'Stat', href: '/main/stat', active: pathname === '/main/stat' },
        { name: 'History', href: '/main/history', active: pathname === '/main/history' },
    ], [pathname])
    const router = useRouter();

    return (
        <div className="top-0 w-full bg-gray-100 p-4 z-50">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Label Captions</h1>
                <div className="flex space-x-8">
                    {routes.map(route => (
                        <a key={route.href} href={route.href} className="text-gray-600 hover:text-gray-800">{route.name}</a>
                    ))}
                    <button className="text-gray-600 hover:text-gray-800"
                        onClick={() => { signOut(); }}>
                        Logout
                    </button>
                </div>
            </div>
            {children}
        </div>
    )
}

export default Topbar;