"use client"

import { useState, useEffect } from "react"
import { PageSection, SectionType } from "@/types/page-sections"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Plus, Trash2, ArrowUp, ArrowDown, Layout, Type, Grid, Image as ImageIcon } from "lucide-react"
import { RichTextEditor } from "@/components/admin/RichTextEditor"

interface PageBuilderProps {
    initialContent: string
    onChange: (content: string) => void
}

export function PageBuilder({ initialContent, onChange }: PageBuilderProps) {
    const [sections, setSections] = useState<PageSection[]>([])

    // Initialize state from JSON string
    useEffect(() => {
        try {
            if (initialContent) {
                const parsed = JSON.parse(initialContent)
                if (Array.isArray(parsed)) {
                    setSections(parsed)
                }
            }
        } catch (e) {
            // If parsing fails (e.g. old HTML content), wrap it in a Text section
            if (initialContent) {
                setSections([{
                    id: crypto.randomUUID(),
                    type: 'TEXT',
                    data: { content: initialContent }
                }])
            }
        }
    }, [])

    // Update parent whenever sections change
    useEffect(() => {
        onChange(JSON.stringify(sections))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sections])

    const addSection = (type: SectionType) => {
        const newSection: PageSection = {
            id: crypto.randomUUID(),
            type,
            data: getDefaultData(type)
        }
        setSections([...sections, newSection])
    }

    const updateSection = (id: string, data: any) => {
        setSections(sections.map(s => s.id === id ? { ...s, data: { ...s.data, ...data } } : s))
    }

    const removeSection = (id: string) => {
        setSections(sections.filter(s => s.id !== id))
    }

    const moveSection = (index: number, direction: 'up' | 'down') => {
        const newSections = [...sections]
        if (direction === 'up' && index > 0) {
            [newSections[index], newSections[index - 1]] = [newSections[index - 1], newSections[index]]
        } else if (direction === 'down' && index < newSections.length - 1) {
            [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]]
        }
        setSections(newSections)
    }

    const getDefaultData = (type: SectionType) => {
        switch (type) {
            case 'HERO': return { title: "New Hero Section", subtitle: "Add a subtitle here", align: 'center', ctaText: "Learn More", ctaLink: "/" }
            case 'TEXT': return { content: "<h2>New Content</h2><p>Start typing...</p>" }
            case 'FEATURES': return { title: "Our Features", columns: 3, items: [{ title: "Feature 1", description: "Description", icon: "Star" }] }
            case 'GALLERY': return { title: "Gallery", images: [], columns: 3 }
            default: return {}
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex gap-2 p-4 bg-muted rounded-lg overflow-x-auto">
                <Button variant="outline" onClick={() => addSection('HERO')} className="gap-2">
                    <Layout className="w-4 h-4" /> Add Hero
                </Button>
                <Button variant="outline" onClick={() => addSection('TEXT')} className="gap-2">
                    <Type className="w-4 h-4" /> Add Text
                </Button>
                <Button variant="outline" onClick={() => addSection('FEATURES')} className="gap-2">
                    <Grid className="w-4 h-4" /> Add Features
                </Button>
                <Button variant="outline" onClick={() => addSection('GALLERY')} className="gap-2" disabled>
                    <ImageIcon className="w-4 h-4" /> Add Gallery (Coming Soon)
                </Button>
            </div>

            <div className="space-y-6">
                {sections.map((section, index) => (
                    <Card key={section.id} className="relative group border-2 hover:border-primary/50 transition-colors">
                        <CardHeader className="bg-muted/50 py-3 flex flex-row items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold bg-primary text-primary-foreground px-2 py-1 rounded">
                                    {section.type}
                                </span>
                                <span className="text-sm text-muted-foreground">Section {index + 1}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon" disabled={index === 0} onClick={() => moveSection(index, 'up')}>
                                    <ArrowUp className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" disabled={index === sections.length - 1} onClick={() => moveSection(index, 'down')}>
                                    <ArrowDown className="w-4 h-4" />
                                </Button>
                                <Separator orientation="vertical" className="h-6 mx-1" />
                                <Button variant="ghost" size="icon" className="text-destructive" onClick={() => removeSection(section.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            {renderEditor(section, (data) => updateSection(section.id, data))}
                        </CardContent>
                    </Card>
                ))}
            </div>

            {sections.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed rounded-lg text-muted-foreground">
                    No sections yet. Add one from the toolbar above.
                </div>
            )}
        </div>
    )
}

function renderEditor(section: PageSection, update: (data: any) => void) {
    const data = section.data
    switch (section.type) {
        case 'HERO':
            return (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Title</Label>
                            <Input value={data.title} onChange={e => update({ title: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <Label>Alignment</Label>
                            <Select value={data.align} onValueChange={v => update({ align: v })}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="left">Left</SelectItem>
                                    <SelectItem value="center">Center</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Subtitle</Label>
                        <Input value={data.subtitle} onChange={e => update({ subtitle: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <Label>Background Image URL</Label>
                        <Input value={data.image || ''} onChange={e => update({ image: e.target.value })} placeholder="https://..." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>CTA Text</Label>
                            <Input value={data.ctaText || ''} onChange={e => update({ ctaText: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <Label>CTA Link</Label>
                            <Input value={data.ctaLink || ''} onChange={e => update({ ctaLink: e.target.value })} />
                        </div>
                    </div>
                </div>
            )
        case 'TEXT':
            return (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Content</Label>
                        <RichTextEditor
                            value={data.content || ''}
                            onChange={content => update({ content })}
                        />
                    </div>
                </div>
            )
        case 'FEATURES':
            return (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Section Title</Label>
                        <Input value={data.title || ''} onChange={e => update({ title: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <Label>Features (JSON List)</Label>
                        <Textarea
                            className="font-mono"
                            value={JSON.stringify(data.items, null, 2)}
                            onChange={e => {
                                try {
                                    update({ items: JSON.parse(e.target.value) })
                                } catch (err) {
                                    // ignore parse errors while typing
                                }
                            }}
                        />
                        <p className="text-xs text-muted-foreground">
                            Edit properties: title, description, icon (Lucide icon name)
                        </p>
                    </div>
                </div>
            )
        default:
            return <div>Unknown section type</div>
    }
}
