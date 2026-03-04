import { getSermons } from "@/lib/sermons"
import { SermonList } from "@/components/admin/SermonList"

export const dynamic = 'force-dynamic'

export default async function SermonsAdmin() {
    const { data: rawSermons } = await getSermons()

    // Serialize dates
    const sermons = rawSermons?.map(s => ({
        ...s,
        date: s.date.toISOString(),
        duration: s.duration || null,
        videoUrl: s.videoUrl || null,
        description: s.description || null
    })) || []

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Sermon Management</h1>
                <p className="text-muted-foreground">Manage the sermon archive and recordings.</p>
            </div>

            <SermonList initialSermons={sermons as any} />
        </div>
    )
}
