'use client'

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { sidebarLinks } from '../../../constants'
import { cn } from '../../lib/utils'
import { usePathname } from 'next/navigation'
import Footer from './Footer'
import PlaidLink from './PlaidLink'

const SideBar = (
    { user }: SiderbarProps
    // user: {[key:string]:string}
) => {

    const pathName = usePathname()
    return (
        <section className='sidebar'>
            <nav className="flex flex-col gap-4">
                <Link
                    href='/'
                    className="mb-12 cursor-pointer flex items-center gap-2">
                    <Image className='size-[24] max-size:size-14'
                        src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt="LOGO" />
                    <h1 className="sidebar-logo">Hexagon</h1>
                </Link>
                {sidebarLinks.map(item => {
                    const isActive = pathName === item.route || pathName.startsWith(`${item.route}/`)
                    return (
                        <Link
                            className={cn("sidebar-link", {
                                "bg-bank-gradient": isActive
                            })}
                            href={item.route}
                            key={item.label}>

                            <div className="relative size-6">
                                <Image src={item.imgURL}
                                    alt={item.label}
                                    fill
                                    className={cn({ 'brightness-[3] inverted-0': isActive })} />
                            </div>
                            <p className={cn('sidebar-label', { '!text-white': isActive })}>
                                {item.label}
                            </p>
                        </Link>)
                })}
                <PlaidLink user={user} />
            </nav>
            <Footer user={user} />
        </section>
    )
}

export default SideBar