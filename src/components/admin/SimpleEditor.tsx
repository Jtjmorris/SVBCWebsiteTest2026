"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MediaLibrary } from "@/components/admin/MediaLibrary"
import { updateSectionContent, PageContentMap } from "@/lib/content"
import { Loader2, Save, Image as ImageIcon } from "lucide-react"

interface SimpleEditorProps {
    slug: string
    content: PageContentMap
    onUpdate: (sectionId: string, key: string, value: string) => void
}

// Define the order of sections and fields for the Home page
const SECTION_ORDER = ["hero", "welcome", "features", "location"]
const FIELD_ORDER: Record<string, string[]> = {
    hero: ["title", "subtitle", "primaryCtaText", "primaryCtaLink", "secondaryCtaText", "secondaryCtaLink"],
    welcome: ["title", "description", "linkText", "linkUrl"],
    features: ["eventsTitle", "eventsDescription", "sermonsTitle", "sermonsDescription", "ministriesTitle", "ministriesDescription"],
    location: ["title", "time", "address", "description"]
}

// Define friendly descriptions for fields
const FIELD_DESCRIPTIONS: Record<string, string> = {
    "hero.backgroundImage": "The large image displayed at the very top of the home page. Recommended size: 1920x1080px.",
    "hero.primaryCtaLink": "Where the main button should link to (e.g., /visit).",
    "welcome.description": "A short paragraph introducing the church.",
    "location.mapEmbedUrl": "The Google Maps embed URL for the location map."
}

export function SimpleEditor({ slug, content, onUpdate }: SimpleEditorProps) {
    const [saving, setSaving] = useState<Record<string, boolean>>({})
    const [localContent, setLocalContent] = useState<PageContentMap>(content)
    const [mediaModalOpen, setMediaModalOpen] = useState<Record<string, boolean>>({})

    const handleChange = (sectionId: string, key: string, value: string) => {
        setLocalContent(prev => ({
            ...prev,
            [sectionId]: {
                ...prev[sectionId],
                [key]: value
            }
        }))
    }

    const handleSaveSection = async (sectionId: string) => {
        setSaving(prev => ({ ...prev, [sectionId]: true }))

        try {
            const sectionData = localContent[sectionId] || {}
            await updateSectionContent(slug, sectionId, sectionData)

            // Show feedback (could use sonner/toast here, defaulting to alert for now as requested fallback)
            alert(`Saved changes to ${sectionId} section!`)

        } catch (error) {
            console.error(error)
            alert("Failed to save changes.")
        } finally {
            setSaving(prev => ({ ...prev, [sectionId]: false }))
        }
    }

    // Sort sections: defined ones first, then others alphabetically
    const sortedSections = Object.keys(content).sort((a, b) => {
        const indexA = SECTION_ORDER.indexOf(a)
        const indexB = SECTION_ORDER.indexOf(b)
        if (indexA !== -1 && indexB !== -1) return indexA - indexB
        if (indexA !== -1) return -1
        if (indexB !== -1) return 1
        return a.localeCompare(b)
    })

    return (
        <div className="space-y-6">
            {sortedSections.map((sectionId) => {
                const items = localContent[sectionId] || {}

                // Sort fields: defined ones first, then others alphabetically
                const definedFields = FIELD_ORDER[sectionId] || []
                const sortedKeys = Object.keys(items).sort((a, b) => {
                    const indexA = definedFields.indexOf(a)
                    const indexB = definedFields.indexOf(b)
                    if (indexA !== -1 && indexB !== -1) return indexA - indexB
                    if (indexA !== -1) return -1
                    if (indexB !== -1) return 1
                    return a.localeCompare(b)
                })

                return (
                    <Card key={sectionId}>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="capitalize">{sectionId} Section</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {sortedKeys.map((key) => {
                                if (key === "backgroundImage") return null

                                const value = items[key]
                                const isLongText = value.length > 60 || key.toLowerCase().includes("description") || key === "subtitle"
                                const isImage = key.toLowerCase().includes("image") || key.toLowerCase().includes("thumbnail") || key.toLowerCase().includes("photo")
                                const description = FIELD_DESCRIPTIONS[`${sectionId}.${key}`]

                                return (
                                    <div key={key} className="space-y-2">
                                        <Label htmlFor={`${sectionId}-${key}`} className="capitalize">
                                            {key.replace(/([A-Z])/g, " $1").trim()}
                                        </Label>
                                        <div className="flex flex-col gap-2">
                                            {isLongText ? (
                                                <Textarea
                                                    id={`${sectionId}-${key}`}
                                                    value={value}
                                                    onChange={(e) => handleChange(sectionId, key, e.target.value)}
                                                    className="min-h-[100px]"
                                                />
                                            ) : isImage ? (
                                                <div className="space-y-2">
                                                    {value && (
                                                        <div className="relative aspect-video w-full max-w-sm rounded-md border bg-muted overflow-hidden group">
                                                            <img
                                                                src={value}
                                                                alt="Preview"
                                                                className="object-cover w-full h-full transition-opacity group-hover:opacity-90"
                                                                onError={(e) => (e.currentTarget.style.display = 'none')}
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="flex gap-2">
                                                        <Input
                                                            id={`${sectionId}-${key}`}
                                                            value={value}
                                                            onChange={(e) => handleChange(sectionId, key, e.target.value)}
                                                            placeholder="https://..."
                                                        />
                                                        <Dialog
                                                            open={mediaModalOpen[`${sectionId}-${key}`]}
                                                            onOpenChange={(open) => setMediaModalOpen(prev => ({ ...prev, [`${sectionId}-${key}`]: open }))}
                                                        >
                                                            <DialogTrigger asChild>
                                                                <Button variant="outline" type="button">
                                                                    <ImageIcon className="h-4 w-4 mr-2" />
                                                                    Browse
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent className="max-w-4xl sm:max-w-4xl max-h-[85vh] overflow-y-auto w-[90vw]">
                                                                <MediaLibrary
                                                                    isModal
                                                                    onSelect={(url) => {
                                                                        handleChange(sectionId, key, url);
                                                                        setMediaModalOpen(prev => ({ ...prev, [`${sectionId}-${key}`]: false }))
                                                                    }}
                                                                />
                                                            </DialogContent>
                                                        </Dialog>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">Enter an Image URL or Browse your Media Library.</p>
                                                </div>
                                            ) : (
                                                <Input
                                                    id={`${sectionId}-${key}`}
                                                    value={value}
                                                    onChange={(e) => handleChange(sectionId, key, e.target.value)}
                                                />
                                            )}
                                            {description && (
                                                <p className="text-[0.8rem] text-muted-foreground">{description}</p>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </CardContent>
                        <CardFooter className="justify-end border-t pt-4">
                            <Button
                                onClick={() => handleSaveSection(sectionId)}
                                disabled={saving[sectionId]}
                            >
                                {saving[sectionId] && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {!saving[sectionId] && <Save className="mr-2 h-4 w-4" />}
                                Save {sectionId} Changes
                            </Button>
                        </CardFooter>
                    </Card>
                )
            })}
        </div>
    )
}
