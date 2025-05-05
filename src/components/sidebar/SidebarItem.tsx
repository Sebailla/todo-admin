'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

interface Props {
    href: string
    title: string
    icon: React.ReactNode

}

export const SidebarItem = ({ href, title, icon }: Props) => {

    const pahtName = usePathname()

    return (
        <>
            <li>
                <Link
                    href={href}
                    className={
                        `px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group hover:bg-gradient-to-r hover:bg-sky-400 hover:text-white
                        ${pahtName === href ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400" : ""}`
                    }
                >
                    {icon}
                    <span className="group-hover:text-white">{title}</span>
                </Link>
            </li>
        </>
    )
}
