"use client"

import { useState } from "react"
import { createNavigationItem, deleteNavigationItem } from "@/lib/navigation"
import { NavigationItem } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, GripVertical, Link as LinkIcon, ArrowUp, ArrowDown } from "lucide-react"

export function NavigationManager({ initialItems }: { initialItems: NavigationItem[] }) {
    const [items, setItems] = useState<NavigationItem[]>(initialItems)
    const [newItem, setNewItem] = useState({ label: "", url: "", type: "HEADER" })
    const [loading, setLoading] = useState(false)

    const headerItems = items.filter(i => i.type === "HEADER")
    const footerItems = items.filter(i => i.type === "FOOTER")

    const handleCreate = async (type: string) => {
        setLoading(true)
        const formData = new FormData()
        formData.append("label", newItem.label)
        formData.append("url", newItem.url)
        formData.append("type", type)
        // Auto-increment order
        const currentMaxOrder = items.filter(i => i.type === type).reduce((max, i) => Math.max(max, i.order), -1)
        formData.append("order", String(currentMaxOrder + 1))

        const result = await createNavigationItem(formData)
        if (result.success) {
            setNewItem({ label: "", url: "", type: "HEADER" })
            window.location.reload()
        } else {
            alert(result.error)
        }
        setLoading(false)
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return
        const result = await deleteNavigationItem(id)
        if (result.success) {
            setItems(items.filter(i => i.id !== id))
        } else {
            alert("Failed to delete")
        }
    }

    return (
        <div className="grid gap-8 md:grid-cols-2">
            {/* Header Navigation */}
            <Card>
                <CardHeader>
                    <CardTitle>Header Menu</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        {headerItems.map((item) => (
                            <div key={item.id} className="flex items-center gap-2 p-2 bg-muted rounded-md group">
                                <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                                <div className="flex-1">
                                    <p className="font-medium text-sm">{item.label}</p>
                                    <p className="text-xs text-muted-foreground">{item.url}</p>
                                </div>
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleDelete(item.id)}>
                                    <Trash2 className="h-3 w-3" />
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-4 space-y-3">
                        <Label>Add Header Link</Label>
                        <div className="grid grid-cols-2 gap-2">
                            <Input
                                placeholder="Label (e.g. About)"
                                value={newItem.type === "HEADER" ? newItem.label : ""}
                                onChange={e => setNewItem({ ...newItem, label: e.target.value, type: "HEADER" })}
                            />
                            <Input
                                placeholder="URL (e.g. /about)"
                                value={newItem.type === "HEADER" ? newItem.url : ""}
                                onChange={e => setNewItem({ ...newItem, url: e.target.value, type: "HEADER" })}
                            />
                        </div>
                        <Button
                            className="w-full"
                            size="sm"
                            disabled={loading || newItem.type !== "HEADER" || !newItem.label}
                            onClick={() => handleCreate("HEADER")}
                        >
                            <Plus className="h-4 w-4 mr-2" /> Add to Header
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Footer Navigation */}
            <Card>
                <CardHeader>
                    <CardTitle>Footer Menu</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        {footerItems.map((item) => (
                            <div key={item.id} className="flex items-center gap-2 p-2 bg-muted rounded-md group">
                                <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                                <div className="flex-1">
                                    <p className="font-medium text-sm">{item.label}</p>
                                    <p className="text-xs text-muted-foreground">{item.url}</p>
                                </div>
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleDelete(item.id)}>
                                    <Trash2 className="h-3 w-3" />
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-4 space-y-3">
                        <Label>Add Footer Link</Label>
                        <div className="grid grid-cols-2 gap-2">
                            <Input
                                placeholder="Label (e.g. Contact)"
                                value={newItem.type === "FOOTER" ? newItem.label : ""}
                                onChange={e => setNewItem({ ...newItem, label: e.target.value, type: "FOOTER" })}
                            />
                            <Input
                                placeholder="URL (e.g. /contact)"
                                value={newItem.type === "FOOTER" ? newItem.url : ""}
                                onChange={e => setNewItem({ ...newItem, url: e.target.value, type: "FOOTER" })}
                            />
                        </div>
                        <Button
                            className="w-full"
                            size="sm"
                            disabled={loading || newItem.type !== "FOOTER" || !newItem.label}
                            onClick={() => handleCreate("FOOTER")}
                        >
                            <Plus className="h-4 w-4 mr-2" /> Add to Footer
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
