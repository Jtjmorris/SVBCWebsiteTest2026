import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

const memberDocuments = [
    { title: "Annual General Meeting Report 2025", date: "Feb 15, 2026", type: "PDF" },
    { title: "Church Budget 2026", date: "Jan 10, 2026", type: "PDF" },
    { title: "Deacons Meeting Minutes - Jan", date: "Jan 28, 2026", type: "PDF" },
    { title: "Pastoral Search Update", date: "Feb 01, 2026", type: "PDF" },
]

export default async function MembersPage() {
    const session = await getServerSession(authOptions)

    // Protect the route
    if (!session) {
        redirect("/auth/login?callbackUrl=/members")
    }

    // Ensure role is at least MEMBER (or higher)
    // In our logic, anyone logged in is at least a member or staff

    return (
        <div className="container px-4 py-16">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Members Area</h1>
                        <p className="text-muted-foreground">Access internal documents and church reports.</p>
                    </div>
                    <div className="bg-muted px-4 py-2 rounded-lg text-sm">
                        Logged in as: <span className="font-semibold">{session.user?.name || "Member"}</span>
                    </div>
                </div>

                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Documents</CardTitle>
                            <CardDescription>Click to download or view.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {memberDocuments.map((doc, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-primary/10 rounded-lg">
                                                <FileText className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium">{doc.title}</p>
                                                <p className="text-sm text-muted-foreground">{doc.date} • {doc.type}</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
                        <CardHeader>
                            <CardTitle className="text-blue-800 dark:text-blue-200">RightNow Media Access</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                                As a member of SVBC, you have free access to the largest library of video Bible study resources.
                            </p>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Access Library</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
