"use client"
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UserStore } from '@/store/userStore'

function Navbar() {
    const navItems = [
        {
            name : "Home",
            href : "/"
        } ,
        {
            name : "Expenses",
            href : "/expenses"
        } ,
        {
            name : "Reports",
            href : "/reports"
        }
    ]

    const { toggleMode } = UserStore()

return (
    <div className='sticky max-w-8xl p-4 pb-5 bg-pink-300' >
        <div className='flex items-center justify-around' >
            <div className='font-bold' >
                Expense Tracker 
            </div>
            <div className='flex items-center gap-6 ' >
                {
                    navItems.map( (item) => (
                        <Link key={item.name} href={item.href}>
                            {item.name}
                        </Link>            
                    ) )
                }
                <Button onClick={toggleMode} >
                    change Theme
                </Button>
            </div>
        </div>
    </div>
  )
}

export default Navbar