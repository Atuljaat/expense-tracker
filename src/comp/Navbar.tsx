"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
// import { UserStore } from '@/store/userStore'
import { Menu, X } from "lucide-react"

function Navbar() {
    const navItems = [
        { name: "Home", href: "/" },
        { name: "Add Expense", href: "/expenses" },
        { name: "Report", href: "/reports" }
    ]

    // const { toggleMode } = UserStore()
    const [mobileOpen, setMobileOpen] = useState(false)

    return (
        <div className="sticky robotoFont top-0 z-50 w-full p-4 pb-5 bg-pink-300">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="font-bold text-lg">
                    Expense Tracker
                </div>

                <div className="hidden sm:flex font-medium items-center gap-6">
                    {navItems.map((item) => (
                        <Link key={item.name} href={item.href}>
                            {item.name}
                        </Link>
                    ))}
                    {/* <Button onClick={toggleMode}>
                        Change Theme
                    </Button> */}
                </div>

                <div className="sm:hidden">
                    <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)}>
                        {mobileOpen ? <X /> : <Menu />}
                    </Button>
                </div>
            </div>



            {mobileOpen && (
                <div className="sm:hidden mt-3 space-y-3 px-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="block"
                            onClick={() => setMobileOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Navbar
