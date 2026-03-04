
import { getPageContent } from "@/lib/content"
import { notFound } from "next/navigation"
import EditorWrapper from "@/components/admin/EditorWrapper"

interface EditorPageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function EditorPage({ params }: EditorPageProps) {
    const { slug } = await params
    const content = await getPageContent(slug)

    // If no content exists for this slug, we might want to show an empty state or 404
    // For now, let's allow editing even if empty (new page scenario)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight capitalize">{slug} Page Editor</h1>
            </div>

            <EditorWrapper slug={slug} initialContent={content} />
        </div>
    )
}
