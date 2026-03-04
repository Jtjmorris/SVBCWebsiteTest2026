"use client"

import { useState } from "react"
import { createEvent, deleteEvent, updateEvent } from "@/lib/events"
import { Event } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, Plus, Trash2, Edit } from "lucide-react"
import { toast } from "sonner"
import { ImageSelect } from "./ImageSelect"
import { RichTextEditor } from "@/components/admin/RichTextEditor"

export function EventList({ initialEvents }: { initialEvents: Event[] }) {
    const [events, setEvents] = useState<Event[]>(initialEvents)
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [editingEvent, setEditingEvent] = useState<Event | null>(null)

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        startTime: "",
        endTime: "",
        location: "",
        category: "General",
        image: ""
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            date: "",
            startTime: "",
            endTime: "",
            location: "",
            category: "General",
            image: ""
        })
        setEditingEvent(null)
    }

    const openEdit = (event: Event) => {
        setEditingEvent(event)
        setFormData({
            title: event.title,
            description: event.description || "",
            date: new Date(event.date).toISOString().split('T')[0],
            startTime: event.startTime || "",
            endTime: event.endTime || "",
            location: event.location || "",
            category: event.category,
            image: event.image || ""
        })
        setIsOpen(true)
    }

    const handleSave = async () => {
        setLoading(true)
        const data = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value)
        })

        let result
        if (editingEvent) {
            result = await updateEvent(editingEvent.id, data)
        } else {
            result = await createEvent(data)
        }

        if (result.success) {
            toast.success(editingEvent ? "Event updated successfully!" : "Event created successfully!")
            setIsOpen(false)
            resetForm()
            window.location.reload()
        } else {
            toast.error(result.error || "Failed to save event")
        }
        setLoading(false)
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this event?")) return
        const result = await deleteEvent(id)
        if (result.success) {
            toast.success("Event deleted successfully")
            setEvents(events.filter(e => e.id !== id))
        } else {
            toast.error("Failed to delete event")
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Upcoming Events</h2>
                <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" /> Add Event
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingEvent ? "Edit Event" : "Add New Event"}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Event Title</Label>
                                <Input name="title" value={formData.title} onChange={handleInputChange} placeholder="e.g. Worship Night" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Date</Label>
                                    <Input name="date" type="date" value={formData.date} onChange={handleInputChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Category</Label>
                                    <Select
                                        value={formData.category}
                                        onValueChange={(val) => setFormData({ ...formData, category: val })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="General">General</SelectItem>
                                            <SelectItem value="Youth">Youth</SelectItem>
                                            <SelectItem value="Kids">Kids</SelectItem>
                                            <SelectItem value="Worship">Worship</SelectItem>
                                            <SelectItem value="Outreach">Outreach</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Start Time</Label>
                                    <Input name="startTime" type="time" value={formData.startTime} onChange={handleInputChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label>End Time</Label>
                                    <Input name="endTime" type="time" value={formData.endTime} onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Location</Label>
                                <Input name="location" value={formData.location} onChange={handleInputChange} placeholder="e.g. Main Sanctuary" />
                            </div>

                            <div className="space-y-2">
                                <Label>Image (Optional)</Label>
                                <ImageSelect
                                    value={formData.image}
                                    onChange={(url) => setFormData({ ...formData, image: url })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Description</Label>
                                <RichTextEditor
                                    value={formData.description}
                                    onChange={(content) => setFormData({ ...formData, description: content })}
                                />
                            </div>

                            <Button onClick={handleSave} disabled={loading} className="w-full">
                                {loading ? (editingEvent ? "Updating..." : "Creating...") : (editingEvent ? "Update Event" : "Create Event")}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <Card key={event.id} className="overflow-hidden">
                        {event.image && (
                            <div className="aspect-video relative">
                                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                            </div>
                        )}
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-primary mb-1">{event.category}</p>
                                    <CardTitle className="text-lg">{event.title}</CardTitle>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(event)}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-destructive h-8 w-8" onClick={() => handleDelete(event.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(event.date).toLocaleDateString()}</span>
                            </div>
                            {(event.startTime || event.endTime) && (
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    <span>
                                        {event.startTime} {event.endTime ? `- ${event.endTime}` : ''}
                                    </span>
                                </div>
                            )}
                            {event.location && (
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>{event.location}</span>
                                </div>
                            )}
                            <div
                                className="line-clamp-3 mt-4 prose prose-sm dark:prose-invert max-w-none text-muted-foreground [&>*]:my-1"
                                dangerouslySetInnerHTML={{ __html: event.description || "" }}
                            />
                        </CardContent>
                    </Card>
                ))}

                {events.length === 0 && (
                    <p className="text-muted-foreground col-span-full text-center py-12">No events found. Create one to get started!</p>
                )}
            </div>
        </div>
    )
}
