import { getGroups } from "@/lib/groups"
import { GroupFinder } from "@/components/groups/GroupFinder"
import { Section } from "@/components/ui/Section"

export const dynamic = "force-dynamic"

export default async function GroupsPage() {
    const { data: rawGroups } = await getGroups()

    // Serialize dates
    const groups = rawGroups?.map(group => ({
        ...group,
        createdAt: group.createdAt.toISOString(),
        updatedAt: group.updatedAt.toISOString()
    })) || []

    return (
        <div className="flex flex-col min-h-screen">
            <div className="bg-primary py-20 text-center text-primary-foreground">
                <div className="container px-4">
                    <h1 className="text-4xl font-bold mb-4">Find Your People</h1>
                    <p className="text-xl max-w-2xl mx-auto opacity-90">
                        Life is better together. Join a small group to grow in your faith and build lasting friendships.
                    </p>
                </div>
            </div>

            <Section className="py-12">
                <GroupFinder groups={groups as any} />
            </Section>
        </div>
    )
}
