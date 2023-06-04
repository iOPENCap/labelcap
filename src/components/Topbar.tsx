"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

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
        { name: 'Label', href: '/', active: pathname === '/' },
        { name: 'Stat', href: '/stat', active: pathname === '/stat' },
        { name: 'History', href: '/history', active: pathname === '/history' },
    ], [pathname])

    return (
        <div className="top-0 w-full bg-gray-100 p-4 z-50">
            <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">Label Captions</div>
                <div className="flex space-x-8">
                    {routes.map(route => (
                        <a key={route.href} href={route.href} className="text-gray-600 hover:text-gray-800">{route.name}</a>
                    ))}
                </div>
            </div>
            {children}
        </div>
    )
}

export default Topbar;