import { getContent } from "@/app/actions/content"
import { prisma } from "@/lib/db"
import { SermonCard } from "@/components/sermons/SermonCard"
import { Section } from "@/components/ui/Section"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { EditableText } from "@/components/content/EditableText"

export const dynamic = 'force-dynamic'

export default async function SermonsPage() {
    let content: any = {}
    let sermons: any[] = []

    try {
        content = await getContent("sermons")
        const sermonsData = await prisma.sermon.findMany({
            orderBy: { date: 'desc' }
        })

        sermons = sermonsData.map(s => ({
            ...s,
            date: s.date.toISOString(),
            duration: s.duration || undefined,
            videoUrl: s.videoUrl || undefined,
        }))
    } catch (e) {
        console.error("Failed to fetch sermons data:", e)
    }

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header Section */}
            <div className="bg-muted/30 border-b">
                <div className="container py-12 px-4 md:px-6">
                    <EditableText
                        pageSlug="sermons"
                        sectionId="header"
                        contentKey="title"
                        defaultValue={content.header?.title || "Sermon Library"}
                        as="h1"
                        className="text-4xl font-bold tracking-tight mb-4"
                    />
                    <EditableText
                        pageSlug="sermons"
                        sectionId="header"
                        contentKey="description"
                        defaultValue={content.header?.description || "Watch and listen to messages from our Sunday services. Search by series, speaker, or topic to find what you're looking for."}
                        as="p"
                        className="text-muted-foreground max-w-2xl text-lg"
                        multiline
                    />
                </div>
            </div>

            {/* Filters & Grid Section */}
            <Section className="py-8 md:py-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div className="text-sm text-muted-foreground">
                        Showing <strong>{sermons.length}</strong> sermons
                    </div>

                    {/* Placeholder for Filters */}
                    <Button variant="outline" size="sm" className="gap-2">
                        <Filter className="w-4 h-4" />
                        Filter Messages
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sermons.map((sermon) => (
                        <SermonCard key={sermon.id} sermon={sermon} />
                    ))}
                </div>

                {sermons.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-lg">
                        <p>No sermons found in the archive.</p>
                    </div>
                )}

                {sermons.length > 0 && (
                    <div className="mt-12 text-center">
                        <Button variant="ghost" size="lg">Load More Messages</Button>
                    </div>
                )}
            </Section>
        </div>
    )
}
