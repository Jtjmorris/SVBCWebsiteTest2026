"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"

interface NavItem {
    label: string
    url: string
}

export function NavBar({ items, siteTitle = "SVBC" }: { items: NavItem[], siteTitle?: string }) {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = React.useState(false)

    // Fallback if no items provided
    const navItems = items && items.length > 0 ? items : [
        { label: "Home", url: "/" },
        { label: "About", url: "/about" },
        { label: "Ministries", url: "/ministries" },
        { label: "Visit", url: "/visit" },
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-xl font-bold tracking-tight text-primary">{siteTitle}</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.url}
                            href={item.url}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === item.url ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Button asChild variant="default" className="ml-4">
                        <Link href="/visit">Plan Your Visit</Link>
                    </Button>
                </nav>

                {/* Mobile Nav Trigger (Hamburger) - visible only if we decide not to use Bottom Nav, 
            but we can keep it for "More" menu if Bottom Nav covers main items */}
                <div className="md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <div className="flex flex-col space-y-4 mt-8">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.url}
                                        href={item.url}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "text-lg font-medium transition-colors hover:text-primary",
                                            pathname === item.url ? "text-primary" : "text-muted-foreground"
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                                <Button asChild className="mt-4">
                                    <Link href="/visit" onClick={() => setIsOpen(false)}>Plan Your Visit</Link>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
