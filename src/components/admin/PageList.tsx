"use client"

import { useState } from "react"
import { createPage, deletePage, updatePage } from "@/lib/pages"
import { Page } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Plus, Trash2, Globe, Lock, ExternalLink, Edit, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { PageBuilder } from "./PageBuilder"
import { toast } from "sonner"
import { HeroSection } from "@/components/sections/HeroSection"
import { TextSection } from "@/components/sections/TextSection"
import { FeaturesSection } from "@/components/sections/FeaturesSection"
import { PageSection } from "@/types/page-sections"

export function PageList({ initialPages }: { initialPages: Page[] }) {
    const [pages, setPages] = useState<Page[]>(initialPages)
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [editingPage, setEditingPage] = useState<Page | null>(null)
    const [previewMode, setPreviewMode] = useState(false)

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        content: "",
        isPublished: true,
        metaTitle: "",
        metaDescription: ""
    })

    const resetForm = () => {
        setFormData({
            title: "",
            slug: "",
            content: "",
            isPublished: true,
            metaTitle: "",
            metaDescription: ""
        })
        setEditingPage(null)
        setPreviewMode(false)
    }

    const openEdit = (page: Page) => {
        setEditingPage(page)
        setFormData({
            title: page.title,
            slug: page.slug,
            content: page.content,
            isPublished: page.isPublished,
            metaTitle: page.metaTitle || "",
            metaDescription: page.metaDescription || ""
        })
        setPreviewMode(false)
        setIsOpen(true)
    }

    const handleSave = async () => {
        setLoading(true)
        const data = new FormData()
        data.append("title", formData.title)
        data.append("slug", formData.slug)
        data.append("content", formData.content)
        data.append("isPublished", String(formData.isPublished))
        data.append("metaTitle", formData.metaTitle)
        data.append("metaDescription", formData.metaDescription)

        let result
        if (editingPage) {
            result = await updatePage(editingPage.id, data)
        } else {
            result = await createPage(data)
        }

        if (result.success) {
            toast.success(editingPage ? "Page updated successfully" : "Page created successfully")
            setIsOpen(false)
            resetForm()
            window.location.reload()
        } else {
            toast.error(result.error || "Failed to save page")
        }
        setLoading(false)
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this page?")) return
        const result = await deletePage(id)
        if (result.success) {
            toast.success("Page deleted successfully")
            setPages(pages.filter(p => p.id !== id))
        } else {
            toast.error("Failed to delete page")
        }
    }

    const renderPreview = () => {
        let sections: PageSection[] = []
        try {
            sections = JSON.parse(formData.content)
            if (!Array.isArray(sections)) throw new Error("Not an array")
        } catch (e) {
            sections = [{ id: 'legacy', type: 'TEXT', data: { content: formData.content } }]
        }

        return (
            <div className="flex flex-col min-h-[50vh] border rounded-lg overflow-hidden bg-background">
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

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Custom Pages</h2>
                <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" /> Create Page
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl sm:max-w-4xl max-h-[90vh] overflow-y-auto w-[90vw]">
                        <DialogHeader className="flex flex-row items-center justify-between pr-8">
                            <DialogTitle>{editingPage ? "Edit Page" : "Create New Page"}</DialogTitle>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPreviewMode(!previewMode)}
                                className="gap-2"
                            >
                                {previewMode ? <><EyeOff className="w-4 h-4" /> Editing Mode</> : <><Eye className="w-4 h-4" /> Live Preview</>}
                            </Button>
                        </DialogHeader>

                        {previewMode ? (
                            <div className="py-4">
                                {renderPreview()}
                            </div>
                        ) : (
                            <div className="space-y-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Page Title</Label>
                                        <Input
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            placeholder="e.g. Christmas Eve"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Slug (URL)</Label>
                                        <Input
                                            value={formData.slug}
                                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                            placeholder="christmas-eve"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch
                                        checked={formData.isPublished}
                                        onCheckedChange={(checked) => setFormData({ ...formData, isPublished: checked })}
                                    />
                                    <Label>Published (Visible to public)</Label>
                                </div>

                                <div className="space-y-4 border p-4 rounded-md bg-muted/30">
                                    <h3 className="font-semibold text-sm">SEO Controls</h3>
                                    <div className="space-y-2">
                                        <Label>Meta Title (Optional)</Label>
                                        <Input
                                            value={formData.metaTitle}
                                            onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                                            placeholder="Leave blank to use Page Title"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Meta Description (Optional)</Label>
                                        <Textarea
                                            value={formData.metaDescription}
                                            onChange={(e: any) => setFormData({ ...formData, metaDescription: e.target.value })}
                                            placeholder="Search engine description"
                                            rows={2}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Page Content</Label>
                                    <PageBuilder
                                        initialContent={formData.content}
                                        onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                                    />
                                </div>
                            </div>
                        )}

                        <Button onClick={handleSave} disabled={loading} className="w-full mt-4">
                            {loading ? "Saving..." : (editingPage ? "Update Page" : "Create Page")}
                        </Button>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pages.map((page) => (
                    <Card key={page.id} className="overflow-hidden">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        {page.isPublished ? (
                                            <span className="flex items-center text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                                                <Globe className="w-3 h-3 mr-1" /> Published
                                            </span>
                                        ) : (
                                            <span className="flex items-center text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                                                <Lock className="w-3 h-3 mr-1" /> Draft
                                            </span>
                                        )}
                                    </div>
                                    <CardTitle className="text-lg">{page.title}</CardTitle>
                                </div>
                                <div className="flex gap-1">
                                    <Button variant="ghost" size="icon" onClick={() => openEdit(page)}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(page.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm text-muted-foreground">
                            <div className="flex items-center justify-between p-2 bg-muted rounded-md font-mono text-xs">
                                <span>/{page.slug}</span>
                                <Link href={`/${page.slug}`} target="_blank" className="text-primary hover:underline flex items-center gap-1">
                                    View <ExternalLink className="w-3 h-3" />
                                </Link>
                            </div>
                            <p className="line-clamp-3">
                                {page.content.replace(/<[^>]*>?/gm, "")}
                            </p>
                        </CardContent>
                    </Card>
                ))}

                {pages.length === 0 && (
                    <p className="text-muted-foreground col-span-full text-center py-12">No custom pages found.</p>
                )}
            </div>
        </div>
    )
}
