"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SimpleEditor } from "./SimpleEditor"
import { AdvancedEditor } from "./AdvancedEditor"
import { PageContentMap } from "@/lib/content"

interface EditorWrapperProps {
    slug: string
    initialContent: PageContentMap
}

export default function EditorWrapper({ slug, initialContent }: EditorWrapperProps) {
    const [content, setContent] = useState(initialContent)

    // Function to refresh local state after updates
    const handleUpdate = (sectionId: string, key: string, value: string) => {
        setContent(prev => ({
            ...prev,
            [sectionId]: {
                ...prev[sectionId],
                [key]: value
            }
        }))
    }

    return (
        <Tabs defaultValue="simple" className="space-y-4">
            <TabsList>
                <TabsTrigger value="simple">Simple Editor</TabsTrigger>
                <TabsTrigger value="advanced">Advanced Editor</TabsTrigger>
            </TabsList>

            <TabsContent value="simple">
                <SimpleEditor slug={slug} content={content} onUpdate={handleUpdate} />
            </TabsContent>

            <TabsContent value="advanced">
                <AdvancedEditor slug={slug} content={content} onUpdate={handleUpdate} />
            </TabsContent>
        </Tabs>
    )
}
