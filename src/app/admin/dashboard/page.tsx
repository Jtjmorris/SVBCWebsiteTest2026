import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getEditablePages } from "@/lib/content"
import { FileText, Edit } from "lucide-react"

export default async function AdminDashboard() {
    const pages = await getEditablePages()

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Manage your website content and settings.</p>
            </div>

            {/* Quick Start Guide */}
            <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                    <CardTitle className="text-primary flex items-center gap-2">
                        <FileText className="h-5 w-5" /> Quick Start Guide
                    </CardTitle>
                    <CardDescription>Get your site up and running in 3 simple steps.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm">1. Edit Home Page</h3>
                        <p className="text-xs text-muted-foreground">Customize the hero image, welcome text, and feature highlights.</p>
                        <Button variant="outline" size="sm" className="w-full" asChild>
                            <Link href="/admin/editor/home">Edit Home</Link>
                        </Button>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm">2. Add Ministries</h3>
                        <p className="text-xs text-muted-foreground">Create pages for your various ministry groups.</p>
                        <Button variant="outline" size="sm" className="w-full" asChild>
                            <Link href="/admin/dashboard/ministries">Manage Ministries</Link>
                        </Button>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm">3. Create Custom Pages</h3>
                        <p className="text-xs text-muted-foreground">Build new pages using the drag-and-drop builder.</p>
                        <Button variant="outline" size="sm" className="w-full" asChild>
                            <Link href="/admin/dashboard/pages">Page Builder</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Content Editor</CardTitle>
                        <CardDescription>Edit content for website pages.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {pages.length > 0 ? (
                            pages.map((page) => (
                                <Button key={page} variant="outline" className="w-full justify-start" asChild>
                                    <Link href={`/admin/editor/${page}`}>
                                        <FileText className="mr-2 h-4 w-4" />
                                        {page.charAt(0).toUpperCase() + page.slice(1)} Page
                                    </Link>
                                </Button>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground">No editable pages found. Run the seed script.</p>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Media Library</CardTitle>
                        <CardDescription>Manage images and documents.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" className="w-full justify-start" asChild>
                            <Link href="/admin/dashboard/media">
                                <FileText className="mr-2 h-4 w-4" />
                                Manage Media
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
