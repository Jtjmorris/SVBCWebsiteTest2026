"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Trash2, Edit, Loader2, Image as ImageIcon, Eye, EyeOff } from "lucide-react"
import { createMinistry, deleteMinistry, updateMinistry } from "@/lib/ministries"
import { toast } from "sonner"
import { ImageSelect } from "./ImageSelect"
import { MinistryCard } from "@/components/ui/MinistryCard"
import { RichTextEditor } from "@/components/admin/RichTextEditor"

interface Ministry {
    id: string
    title: string
    description: string
    image: string | null
    slug: string
}

export function MinistryList({ initialMinistries }: { initialMinistries: Ministry[] }) {
    const [ministries, setMinistries] = useState<Ministry[]>(initialMinistries)
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [previewMode, setPreviewMode] = useState(false)
    const [editingMinistry, setEditingMinistry] = useState<Ministry | null>(null)
    const [newMinistry, setNewMinistry] = useState({ title: "", description: "", image: "", slug: "" })

    const resetForm = () => {
        setNewMinistry({ title: "", description: "", image: "", slug: "" })
        setEditingMinistry(null)
        setPreviewMode(false)
    }

    const openEdit = (ministry: Ministry) => {
        setEditingMinistry(ministry)
        setNewMinistry({
            title: ministry.title,
            description: ministry.description,
            image: ministry.image || "",
            slug: ministry.slug
        })
        setIsOpen(true)
    }

    const handleSave = async () => {
        setIsLoading(true)
        const formData = new FormData()
        formData.append("title", newMinistry.title)
        formData.append("description", newMinistry.description)
        formData.append("image", newMinistry.image)
        formData.append("slug", newMinistry.slug || newMinistry.title.toLowerCase().replace(/ /g, "-"))

        let result
        if (editingMinistry) {
            result = await updateMinistry(editingMinistry.id, formData)
        } else {
            result = await createMinistry(formData)
        }

        if (result.success) {
            toast.success(editingMinistry ? "Ministry updated successfully" : "Ministry created successfully")
            setIsOpen(false)
            resetForm()
            window.location.reload()
        } else {
            toast.error(result.error || "Failed to save ministry")
        }
        setIsLoading(false)
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return
        setIsLoading(true)
        const result = await deleteMinistry(id)
        if (result.success) {
            toast.success("Ministry deleted successfully")
            setMinistries(ministries.filter(m => m.id !== id))
        } else {
            toast.error(result.error || "Failed to delete ministry")
        }
        setIsLoading(false)
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Active Ministries</h2>
                <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Ministry
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl sm:max-w-2xl">
                        <DialogHeader className="flex flex-row items-center justify-between pr-8">
                            <div>
                                <DialogTitle>{editingMinistry ? "Edit Ministry" : "Add New Ministry"}</DialogTitle>
                                <DialogDescription>
                                    Add a new ministry group to the website.
                                </DialogDescription>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPreviewMode(!previewMode)}
                                className="gap-2"
                            >
                                {previewMode ? <><EyeOff className="w-4 h-4" /> Edit</> : <><Eye className="w-4 h-4" /> Preview</>}
                            </Button>
                        </DialogHeader>

                        {previewMode ? (
                            <div className="py-8 flex justify-center bg-muted/20 rounded-md">
                                <div className="w-full max-w-sm">
                                    <MinistryCard
                                        title={newMinistry.title || "Ministry Title"}
                                        description={newMinistry.description || "Description preview goes here..."}
                                        image={newMinistry.image || undefined}
                                        slug={newMinistry.slug || "preview-slug"}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={newMinistry.title}
                                        onChange={e => setNewMinistry({ ...newMinistry, title: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="slug">Slug (URL path)</Label>
                                    <Input
                                        id="slug"
                                        value={newMinistry.slug}
                                        onChange={e => setNewMinistry({ ...newMinistry, slug: e.target.value })}
                                        placeholder="auto-generated-from-title"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="image">Ministry Image</Label>
                                    <ImageSelect
                                        value={newMinistry.image}
                                        onChange={(url) => setNewMinistry({ ...newMinistry, image: url })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description (HTML supported)</Label>
                                    <RichTextEditor
                                        value={newMinistry.description}
                                        onChange={content => setNewMinistry({ ...newMinistry, description: content })}
                                    />
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button onClick={handleSave} disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {editingMinistry ? "Update Ministry" : "Create Ministry"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ministries.map((ministry) => (
                    <Card key={ministry.id} className="overflow-hidden">
                        <div className="aspect-video w-full bg-slate-100 relative">
                            {ministry.image ? (
                                <img src={ministry.image} alt={ministry.title} className="object-cover w-full h-full" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-slate-400">
                                    <ImageIcon className="h-10 w-10" />
                                </div>
                            )}
                        </div>
                        <CardHeader>
                            <CardTitle>{ministry.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-3">{ministry.description}</p>
                        </CardContent>
                        <CardFooter className="justify-end border-t pt-4 gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEdit(ministry)}
                            >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDelete(ministry.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
