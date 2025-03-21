'use client'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import Image from 'next/image'
import Link from "next/link"
import { sidebarLinks } from "../../../constants"
import { usePathname } from "next/navigation"
import React from "react"
import Footer from "./Footer"

const Mobilenavbar = ({ user }: MobileNavProps) => {
  const pathName = usePathname()
  return (
    <section
      className="w-full max-w-[265px]"
    >
      <Sheet >
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className='cursor-pointer'
          />
        </SheetTrigger>
        <SheetContent side={'left'} className="border-none bg-white ">

          <Link
            href='/'
            className=" cursor-pointer flex items-center gap-1 px-4">
            <Image
              src="/icons/logo.svg"
              width={34}
              height={34}
              alt="LOGO" />
            <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Hexagon</h1>
          </Link>
          <div className="mobilenav-sheet">
            <SheetClose asChild>
              <nav className="flex h-full gap-6 flex-col pt-16 text-white">
                {/* <nav className="flex flex-col gap-1 px-4"> */}
                {sidebarLinks.map(item => {
                  const isActive = pathName === item.route || pathName.startsWith(`${item.route}/`)
                  return (
                    <SheetClose asChild key={item.route}>

                      <Link
                        className={cn("mobilenav-sheet_close w-full", {
                          "bg-bank-gradient": isActive
                        })}
                        href={item.route}
                        key={item.label}>


                        <Image src={item.imgURL}
                          alt={item.label}
                          width={20}
                          height={20}
                          className={cn({ 'brightness-[3] inverted-0': isActive })} />
                        <p className={cn('text-16 font-semibold text-black-2', { 'text-white': isActive })}>
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  )
                })}
                USER
              </nav>
            </SheetClose>
            <Footer user={user} type={"mobile"} />
          </div>
        </SheetContent>
      </Sheet>
    </section>

  )
}

export default Mobilenavbar