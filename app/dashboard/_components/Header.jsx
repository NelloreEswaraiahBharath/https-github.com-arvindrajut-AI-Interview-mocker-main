"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {

    const path=usePathname();
    useEffect(()=>{
        console.log(path)
    },[])

  return (
    <div className='flex p-10 items-center justify-between bg-navbar-bg text-slate-70font-semibold text-xl'>
        {/* <Image src={'/logo.svg'} width={160} height={100} alt='logo' /> */}
        <ul className='justify-stretch p-4 bg-black hover:shadow-white  dark:bg-white hidden md:flex gap-6'>
          <Link href={"/dashboard"}>
            <li className={`text-gray-300 opacity-40 hover:opacity-100 hover:text-white hover:shadow-white hover:font-bold hover:text-2xl hover:bg-black transition-all
            cursor-pointer
            ${path=='/dashboard'&&'text-white opacity-100 font-bold'}
            `}
            
            >Dashboard</li>
            </Link>
            
            <li className={`text-gray-300 opacity-40 hover:opacity-100 hover:text-white hover:shadow-white hover:font-bold hover:text-2xl hover:bg-black transition-all
            cursor-pointer
            ${path=='/dashboard/questions'&&'text-white font-bold'}
            `}>Questions</li>
              <Link href={"/dashboard/upgrade"}>
            <li className={`text-gray-300 opacity-40 hover:opacity-100 hover:text-white hover:shadow-white hover:font-bold hover:text-2xl hover:bg-black transition-all
            cursor-pointer
            ${path=='/dashboard/upgrade'&&'text-white font-bold'}
            `}>Upgrade</li>
            </Link>
            <li className={`text-gray-300 opacity-40 hover:opacity-100 hover:text-white hover:shadow-white hover:font-bold hover:text-2xl hover:bg-black transition-all
            cursor-pointer
            ${path=='/'&&'text-white opacity-100 font-bold'}
            `}>How it Works?</li>
        </ul>
        <UserButton/>
    </div>
  )
}


export default Header