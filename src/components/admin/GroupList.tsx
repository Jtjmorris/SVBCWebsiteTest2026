"use client"

import { useState } from "react"
import { createGroup, deleteGroup, updateGroup } from "@/lib/groups" // Import server actions
import { Group } from "@prisma/client" // Import type from prisma
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
import { Calendar, Clock, MapPin, Plus, Trash2, User, Edit } from "lucide-react"
import { toast } from "sonner"
import { ImageSelect } from "./ImageSelect"
import { RichTextEditor } from "@/components/admin/RichTextEditor"

export function GroupList({ initialGroups }: { initialGroups: Group[] }) {
    const [groups, setGroups] = useState<Group[]>(initialGroups)
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [editingGroup, setEditingGroup] = useState<Group | null>(null)

    const [formData, setFormData] = useState({
        name: "",
        type: "Co-ed",
        day: "",
        time: "",
        leader: "",
        location: "",
        description: "",
        image: ""
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const resetForm = () => {
        setFormData({
            name: "",
            type: "Co-ed",
            day: "",
            time: "",
            leader: "",
            location: "",
            description: "",
            image: ""
        })
        setEditingGroup(null)
    }

    const openEdit = (group: Group) => {
        setEditingGroup(group)
        setFormData({
            name: group.name,
            type: group.type,
            day: group.day || "",
            time: group.time || "",
            leader: group.leader || "",
            location: group.location || "",
            description: group.description || "",
            image: group.image || ""
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
        if (editingGroup) {
            result = await updateGroup(editingGroup.id, data)
        } else {
            result = await createGroup(data)
        }

        if (result.success) {
            toast.success(editingGroup ? "Group updated successfully" : "Group created successfully")
            setIsOpen(false)
            resetForm()
            window.location.reload()
        } else {
            toast.error(result.error || "Failed to save group")
        }
        setLoading(false)
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this group?")) return
        const result = await deleteGroup(id)
        if (result.success) {
            toast.success("Group deleted successfully")
            setGroups(groups.filter(g => g.id !== id))
        } else {
            toast.error("Failed to delete group")
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Active Small Groups</h2>
                <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" /> Add Group
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingGroup ? "Edit Group" : "Add New Group"}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Group Name</Label>
                                <Input name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. Young Adults" />
                            </div>

                            <div className="space-y-2">
                                <Label>Type</Label>
                                <Select
                                    value={formData.type}
                                    onValueChange={(val) => setFormData({ ...formData, type: val })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Men">Men</SelectItem>
                                        <SelectItem value="Women">Women</SelectItem>
                                        <SelectItem value="Co-ed">Co-ed</SelectItem>
                                        <SelectItem value="Young Adults">Young Adults</SelectItem>
                                        <SelectItem value="Seniors">Seniors</SelectItem>
                                        <SelectItem value="Youth">Youth</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Day</Label>
                                    <Select
                                        value={formData.day}
                                        onValueChange={(val) => setFormData({ ...formData, day: val })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Day" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Sunday">Sunday</SelectItem>
                                            <SelectItem value="Monday">Monday</SelectItem>
                                            <SelectItem value="Tuesday">Tuesday</SelectItem>
                                            <SelectItem value="Wednesday">Wednesday</SelectItem>
                                            <SelectItem value="Thursday">Thursday</SelectItem>
                                            <SelectItem value="Friday">Friday</SelectItem>
                                            <SelectItem value="Saturday">Saturday</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Time</Label>
                                    <Input name="time" value={formData.time} onChange={handleInputChange} placeholder="e.g. 7:00 PM" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Leader(s)</Label>
                                <Input name="leader" value={formData.leader} onChange={handleInputChange} placeholder="e.g. John & Jane Doe" />
                            </div>

                            <div className="space-y-2">
                                <Label>Location</Label>
                                <Input name="location" value={formData.location} onChange={handleInputChange} placeholder="e.g. SVBC Fireside Room" />
                            </div>

                            <div className="space-y-2">
                                <Label>Description</Label>
                                <RichTextEditor
                                    value={formData.description}
                                    onChange={(content) => setFormData({ ...formData, description: content })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Group Image (Optional)</Label>
                                <ImageSelect
                                    value={formData.image}
                                    onChange={(url) => setFormData({ ...formData, image: url })}
                                />
                            </div>

                            <Button onClick={handleSave} disabled={loading} className="w-full">
                                {loading ? (editingGroup ? "Updating..." : "Creating...") : (editingGroup ? "Update Group" : "Create Group")}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.map((group) => (
                    <Card key={group.id} className="overflow-hidden">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-primary mb-1">{group.type}</p>
                                    <CardTitle className="text-lg">{group.name}</CardTitle>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(group)}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-destructive h-8 w-8" onClick={() => handleDelete(group.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm text-muted-foreground">
                            {(group.day || group.time) && (
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    <span>{group.day}s @ {group.time}</span>
                                </div>
                            )}
                            {group.leader && (
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    <span>{group.leader}</span>
                                </div>
                            )}
                            {group.location && (
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>{group.location}</span>
                                </div>
                            )}
                            <p className="line-clamp-3 mt-2">{group.description}</p>
                        </CardContent>
                    </Card>
                ))}

                {groups.length === 0 && (
                    <p className="text-muted-foreground col-span-full text-center py-12">No groups found. Add one to get started!</p>
                )}
            </div>
        </div>
    )
}
