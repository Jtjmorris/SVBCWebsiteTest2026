import { getMinistries } from "@/lib/ministries"
import { MinistryList } from "@/components/admin/MinistryList"

export const dynamic = 'force-dynamic'

export default async function MinistriesAdmin() {
    const { data: ministries } = await getMinistries()

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Ministry Management</h1>
                <p className="text-muted-foreground">Manage the ministries displayed on the "Ministries" page.</p>
            </div>

            <MinistryList initialMinistries={ministries || []} />
        </div>
    )
}
