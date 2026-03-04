import { getPages } from "@/lib/pages"
import { PageList } from "@/components/admin/PageList"

export const dynamic = "force-dynamic"

export default async function PagesAdmin() {
    const { data: rawPages } = await getPages()

    // Serialize dates
    const pages = rawPages?.map(page => ({
        ...page,
        createdAt: page.createdAt.toISOString(),
        updatedAt: page.updatedAt.toISOString()
    })) || []

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Page Management</h1>
                <p className="text-muted-foreground">Create and manage custom pages for your website.</p>
            </div>

            <PageList initialPages={pages as any} />
        </div>
    )
}
