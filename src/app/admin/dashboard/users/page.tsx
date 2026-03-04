import { getUsers } from "@/lib/users"
import { UserList } from "@/components/admin/UserList"

export default async function UsersPage() {
    const { data: users } = await getUsers()

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
                <p className="text-muted-foreground">Manage system access and roles.</p>
            </div>

            <UserList initialUsers={users || []} />
        </div>
    )
}
