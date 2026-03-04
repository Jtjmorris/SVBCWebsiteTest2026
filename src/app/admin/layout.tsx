import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import { LayoutDashboard, Calendar, Users, FileText, Settings, LogOut, Compass, Image } from "lucide-react"
import { MobileNav } from "@/components/admin/MobileNav"

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/auth/login")
    }

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-slate-50 border-r hidden md:flex flex-col">
                <div className="p-6 border-b border-slate-800">
                    <h2 className="text-xl font-bold">SVBC Admin</h2>
                    <p className="text-xs text-slate-400 mt-1">Logged in as {session.user?.name}</p>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <Link href="/admin/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition-colors">
                        <LayoutDashboard className="h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link href="/admin/dashboard/events" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition-colors">
                        <Calendar className="h-5 w-5" />
                        Events
                    </Link>
                    <Link href="/admin/dashboard/sermons" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition-colors">
                        <FileText className="h-5 w-5" />
                        Sermons
                    </Link>
                    <Link href="/admin/dashboard/ministries" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition-colors">
                        <Users className="h-5 w-5" />
                        Ministries
                    </Link>
                    <Link href="/admin/dashboard/groups" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition-colors">
                        <Users className="h-5 w-5" />
                        Groups
                    </Link>
                    <Link href="/admin/dashboard/pages" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition-colors">
                        <FileText className="h-5 w-5" />
                        Pages
                    </Link>
                    <Link href="/admin/dashboard/navigation" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition-colors">
                        <Compass className="h-5 w-5" />
                        Navigation
                    </Link>
                    <Link href="/admin/dashboard/users" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition-colors">
                        <Users className="h-5 w-5" />
                        Users
                    </Link>
                    <Link href="/admin/dashboard/media" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition-colors">
                        <Image className="h-5 w-5" />
                        Media
                    </Link>
                    <Link href="/admin/dashboard/settings" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition-colors">
                        <Settings className="h-5 w-5" />
                        Settings
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-800 mt-auto">
                    <Link href="/api/auth/signout" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-900/50 text-red-200 transition-colors">
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-muted/10 flex flex-col h-screen overflow-hidden">
                <header className="md:hidden flex items-center justify-between p-4 bg-background border-b z-10 sticky top-0">
                    <h1 className="font-semibold text-lg">SVBC Admin</h1>
                    <MobileNav />
                </header>
                <div className="flex-1 p-4 md:p-8 overflow-y-auto w-full max-w-[100vw]">
                    {children}
                </div>
            </main>
        </div>
    )
}
