import { getNavigationItems } from "@/lib/navigation"
import { NavigationManager } from "@/components/admin/NavigationManager"

export const dynamic = "force-dynamic"

export default async function NavigationAdmin() {
    const { data: rawItems } = await getNavigationItems()

    // Serialize dates
    const items = rawItems?.map(item => ({
        ...item,
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString()
    })) || []

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Navigation Management</h1>
                <p className="text-muted-foreground">Manage links in your site header and footer.</p>
            </div>

            <NavigationManager initialItems={items as any} />
        </div>
    )
}
