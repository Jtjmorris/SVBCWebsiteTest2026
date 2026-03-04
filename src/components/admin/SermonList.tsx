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
import { Plus, Trash2, Edit, Loader2, Video } from "lucide-react"
import { createSermon, deleteSermon, updateSermon } from "@/lib/sermons"
import { toast } from "sonner"
import { ImageSelect } from "./ImageSelect"

interface Sermon {
    id: string
    title: string
    speaker: string
    series: string
    date: Date | string
    videoUrl: string | null
    thumbnail: string
    scripture: string
    description: string | null
}

export function SermonList({ initialSermons }: { initialSermons: Sermon[] }) {
    const [sermons, setSermons] = useState<Sermon[]>(initialSermons)
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [editingSermon, setEditingSermon] = useState<Sermon | null>(null)
    const [newSermon, setNewSermon] = useState({
        title: "",
        speaker: "",
        series: "",
        date: new Date().toISOString().split('T')[0],
        videoUrl: "",
        thumbnail: "",
        scripture: "",
        description: ""
    })

    const resetForm = () => {
        setNewSermon({
            title: "",
            speaker: "",
            series: "",
            date: new Date().toISOString().split('T')[0],
            videoUrl: "",
            thumbnail: "",
            scripture: "",
            description: ""
        })
        setEditingSermon(null)
    }

    const openEdit = (sermon: Sermon) => {
        setEditingSermon(sermon)
        setNewSermon({
            title: sermon.title,
            speaker: sermon.speaker,
            series: sermon.series,
            date: new Date(sermon.date).toISOString().split('T')[0],
            videoUrl: sermon.videoUrl || "",
            thumbnail: sermon.thumbnail || "",
            scripture: sermon.scripture || "",
            description: sermon.description || ""
        })
        setIsOpen(true)
    }

    const handleSave = async () => {
        setIsLoading(true)
        const formData = new FormData()
        Object.entries(newSermon).forEach(([key, value]) => {
            formData.append(key, value)
        })

        let result
        if (editingSermon) {
            result = await updateSermon(editingSermon.id, formData)
        } else {
            result = await createSermon(formData)
        }

        if (result.success) {
            toast.success(editingSermon ? "Sermon updated successfully" : "Sermon added successfully")
            setIsOpen(false)
            resetForm()
            window.location.reload()
        } else {
            toast.error(result.error || "Failed to save sermon")
        }
        setIsLoading(false)
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return
        setIsLoading(true)
        const result = await deleteSermon(id)
        if (result.success) {
            toast.success("Sermon deleted successfully")
            setSermons(sermons.filter(s => s.id !== id))
        } else {
            toast.error(result.error || "Failed to delete sermon")
        }
        setIsLoading(false)
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Sermon Archive</h2>
                <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Sermon
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl sm:max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>{editingSermon ? "Edit Sermon" : "Add New Sermon"}</DialogTitle>
                            <DialogDescription>
                                Add a new sermon recording to the archive.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={newSermon.title}
                                    onChange={e => setNewSermon({ ...newSermon, title: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="speaker">Speaker</Label>
                                <Input
                                    id="speaker"
                                    value={newSermon.speaker}
                                    onChange={e => setNewSermon({ ...newSermon, speaker: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="series">Series</Label>
                                <Input
                                    id="series"
                                    value={newSermon.series}
                                    onChange={e => setNewSermon({ ...newSermon, series: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="date">Date</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={newSermon.date}
                                    onChange={e => setNewSermon({ ...newSermon, date: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <Label htmlFor="videoUrl">Video URL (YouTube/Vimeo)</Label>
                                <Input
                                    id="videoUrl"
                                    value={newSermon.videoUrl}
                                    onChange={e => setNewSermon({ ...newSermon, videoUrl: e.target.value })}
                                    placeholder="https://youtube.com/..."
                                />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <Label htmlFor="thumbnail">Sermon Thumbnail</Label>
                                <ImageSelect
                                    value={newSermon.thumbnail}
                                    onChange={(url) => setNewSermon({ ...newSermon, thumbnail: url })}
                                />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <Label htmlFor="scripture">Scripture Reference</Label>
                                <Input
                                    id="scripture"
                                    value={newSermon.scripture}
                                    onChange={e => setNewSermon({ ...newSermon, scripture: e.target.value })}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleSave} disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {editingSermon ? "Update Sermon" : "Add Sermon"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="space-y-4">
                {sermons.map((sermon) => (
                    <Card key={sermon.id} className="flex flex-row overflow-hidden h-32 items-center">
                        <div className="w-48 bg-slate-900 h-full relative shrink-0">
                            {sermon.thumbnail ? (
                                <img src={sermon.thumbnail} alt={sermon.title} className="object-cover w-full h-full opacity-80" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-slate-500">
                                    <Video className="h-8 w-8" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-lg">{sermon.title}</h3>
                                    <p className="text-sm text-muted-foreground">{sermon.speaker} • {new Date(sermon.date).toLocaleDateString()}</p>
                                    <p className="text-xs bg-slate-100 text-slate-600 inline-block px-2 py-0.5 rounded mt-1">{sermon.series}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => openEdit(sermon)}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDelete(sermon.id)}
                                        className="text-red-500"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
