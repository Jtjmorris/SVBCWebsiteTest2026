"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, LayoutDashboard, Calendar, Users, FileText, Settings, LogOut, Compass, Image as ImageIcon } from "lucide-react"
import Link from "next/link"

export function MobileNav() {
    const [open, setOpen] = useState(false)

    const navItems = [
        { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { href: "/admin/dashboard/events", icon: Calendar, label: "Events" },
        { href: "/admin/dashboard/sermons", icon: FileText, label: "Sermons" },
        { href: "/admin/dashboard/ministries", icon: Users, label: "Ministries" },
        { href: "/admin/dashboard/groups", icon: Users, label: "Groups" },
        { href: "/admin/dashboard/pages", icon: FileText, label: "Pages" },
        { href: "/admin/dashboard/navigation", icon: Compass, label: "Navigation" },
        { href: "/admin/dashboard/users", icon: Users, label: "Users" },
        { href: "/admin/dashboard/media", icon: ImageIcon, label: "Media" },
        { href: "/admin/dashboard/settings", icon: Settings, label: "Settings" },
    ]

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-slate-900 text-slate-50 p-0 border-r-slate-800 flex flex-col">
                <SheetHeader className="p-6 border-b border-slate-800 text-left">
                    <SheetTitle className="text-xl font-bold text-slate-50">SVBC Admin</SheetTitle>
                </SheetHeader>
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition-colors"
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-slate-800 mt-auto">
                    <Link href="/api/auth/signout" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-900/50 text-red-200 transition-colors">
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </Link>
                </div>
            </SheetContent>
        </Sheet>
    )
}
