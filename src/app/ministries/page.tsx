import { getContent } from "@/app/actions/content"
import { prisma } from "@/lib/db"
import { MinistryCard } from "@/components/ui/MinistryCard"
import { Section } from "@/components/ui/Section"
import { EditableText } from "@/components/content/EditableText"

export const dynamic = 'force-dynamic'

export default async function MinistriesPage() {
    const content = await getContent("ministries")
    const ministries = await prisma.ministry.findMany()

    return (
        <div className="flex flex-col min-h-screen">
            <Section background="primary" className="text-center py-20">
                <EditableText
                    pageSlug="ministries"
                    sectionId="hero"
                    contentKey="title"
                    defaultValue={content.hero?.title || "Ministries at SVBC"}
                    as="h1"
                    className="text-4xl font-bold mb-4"
                />
                <EditableText
                    pageSlug="ministries"
                    sectionId="hero"
                    contentKey="description"
                    defaultValue={content.hero?.description || "There is a place for everyone here. Find a group to connect with, serve alongside, and grow in your faith."}
                    as="p"
                    className="text-xl opacity-90 max-w-2xl mx-auto"
                    multiline
                />
            </Section>

            <Section>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {ministries.map((ministry) => (
                        <MinistryCard
                            key={ministry.id}
                            title={ministry.title}
                            description={ministry.description}
                            image={ministry.image || undefined}
                            slug={ministry.slug}
                        />
                    ))}
                </div>
                {ministries.length === 0 && (
                    <div className="text-center py-10 text-muted-foreground p-8 border rounded-lg bg-muted/20">
                        <p>No ministries found in the database.</p>
                    </div>
                )}
            </Section>
        </div>
    )
}
