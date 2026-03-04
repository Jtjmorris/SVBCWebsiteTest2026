import { getGroups } from "@/lib/groups"
import { GroupList } from "@/components/admin/GroupList"

export const dynamic = "force-dynamic"

export default async function GroupsAdmin() {
    const { data: rawGroups } = await getGroups()

    // Serialize dates for client component
    const groups = rawGroups?.map(group => ({
        ...group,
        createdAt: group.createdAt.toISOString(),
        updatedAt: group.updatedAt.toISOString()
    })) || []

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Small Groups</h1>
                <p className="text-muted-foreground">Manage small groups and Bible studies.</p>
            </div>

            <GroupList initialGroups={groups as any} />
        </div>
    )
}
