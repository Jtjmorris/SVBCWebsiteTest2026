import { getPageBySlug } from "@/lib/pages"
import { notFound } from "next/navigation"
import { HeroSection } from "@/components/sections/HeroSection"
import { TextSection } from "@/components/sections/TextSection"
import { FeaturesSection } from "@/components/sections/FeaturesSection"
import { PageSection } from "@/types/page-sections"
import { Section } from "@/components/ui/Section"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { data: page } = await getPageBySlug(params.slug)

    if (!page || !page.isPublished) {
        return { title: "Not Found" }
    }

    return {
        title: page.metaTitle || page.title,
        description: page.metaDescription,
    }
}

export default async function CustomPage({ params }: { params: { slug: string } }) {
    const { data: page } = await getPageBySlug(params.slug)

    if (!page || !page.isPublished) {
        notFound()
    }

    let sections: PageSection[] = []
    try {
        sections = JSON.parse(page.content)
        // Validate it's actually an array
        if (!Array.isArray(sections)) throw new Error("Not an array")
    } catch (e) {
        // Fallback for legacy HTML content
        sections = [{
            id: 'legacy',
            type: 'TEXT',
            data: { content: page.content }
        }]
    }

    return (
        <div className="flex flex-col min-h-screen">
            {sections.map((section) => {
                switch (section.type) {
                    case 'HERO': return <HeroSection key={section.id} data={section.data} />
                    case 'TEXT': return <TextSection key={section.id} data={section.data} />
                    case 'FEATURES': return <FeaturesSection key={section.id} data={section.data} />
                    default: return null
                }
            })}
        </div>
    )
}
