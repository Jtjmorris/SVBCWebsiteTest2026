"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Calendar, BookOpen, Menu, Heart, Users } from "lucide-react"

const mobileNavItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Events", href: "/events", icon: Calendar },
    { name: "Groups", href: "/groups", icon: Users },
    { name: "Give", href: "/give", icon: Heart },
    { name: "Sermons", href: "/sermons", icon: BookOpen },
    { name: "More", href: "/about", icon: Menu },
]

export function MobileNav() {
    const pathname = usePathname()

    return (
        <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t flex items-center justify-around px-4 pb-1">
            {mobileNavItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex flex-col items-center justify-center space-y-1 w-full h-full",
                            isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                        )}
                    >
                        <Icon className="h-5 w-5" />
                        <span className="text-[10px] font-medium">{item.name}</span>
                    </Link>
                )
            })}
        </div>
    )
}
