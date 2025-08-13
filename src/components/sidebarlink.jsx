"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";

export default function SidebarLink({href, children})
{
    const pathname = usePathname();
    const active = pathname === href

    return (
        <Link href={href} className={`block px-4 py-2 rounded hover:bg-gray-200 ${active ? "bg-gray-300 font-bold" : ""}`}>
            {children}
        </Link>
    )
}