"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RichTextEditor } from "@/components/admin/RichTextEditor"
import { MediaLibrary } from "@/components/admin/MediaLibrary"
import { PageContentMap, updatePageContent } from "@/lib/content"
import { Plus, Save, RotateCcw, Image as ImageIcon, Palette, Type, Code } from "lucide-react"

interface AdvancedEditorProps {
    slug: string
    content: PageContentMap
    onUpdate: (sectionId: string, key: string, value: string) => void
}

export function AdvancedEditor({ slug, content, onUpdate }: AdvancedEditorProps) {
    const [items, setItems] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [activeTab, setActiveTab] = useState("visual")
    const [mediaModalOpen, setMediaModalOpen] = useState<Record<string, boolean>>({})

    // Flatten content on load
    useEffect(() => {
        const flattened = []
        for (const [sectionId, sectionItems] of Object.entries(content)) {
            for (const [key, value] of Object.entries(sectionItems)) {
                flattened.push({ sectionId, key, value, originalValue: value, isDirty: false })
            }
        }
        setItems(flattened)
    }, [content])

    // Helper to group items by section
    const sections = items.reduce((acc, item) => {
        if (!acc[item.sectionId]) acc[item.sectionId] = []
        acc[item.sectionId].push(item)
        return acc
    }, {} as Record<string, any[]>)

    const handleValueChange = (index: number, newValue: string) => {
        setItems(prev => prev.map((item, i) =>
            i === index ? { ...item, value: newValue, isDirty: newValue !== item.originalValue } : item
        ))
    }

    const saveItem = async (index: number) => {
        const item = items[index]
        if (!item.isDirty) return

        setLoading(true)
        try {
            await updatePageContent(slug, item.sectionId, item.key, item.value)
            setItems(prev => prev.map((it, i) =>
                i === index ? { ...it, originalValue: it.value, isDirty: false } : it
            ))
            // alert(`Saved ${item.key}`) // Removed alert for smoother UX
        } catch (e) {
            console.error(e)
            alert("Failed to save")
        } finally {
            setLoading(false)
        }
    }

    const inferInputType = (key: string, value: string) => {
        const lowerKey = key.toLowerCase()
        if (lowerKey.includes("color") || lowerKey.includes("bg")) return "color"
        if (lowerKey.includes("image") || lowerKey.includes("img") || lowerKey.includes("photo")) return "image"
        if (value.length > 60 || lowerKey.includes("description") || lowerKey.includes("script")) return "textarea"
        return "text"
    }

    // New item state
    const [newItem, setNewItem] = useState({ sectionId: "", key: "", value: "" })

    const addNewKey = async () => {
        if (!newItem.sectionId || !newItem.key) return
        setLoading(true)
        try {
            await updatePageContent(slug, newItem.sectionId, newItem.key, newItem.value)
            onUpdate(newItem.sectionId, newItem.key, newItem.value)
            // We need to re-trigger the effect or manually add it. 
            // Ideally we just call onUpdate which might trigger parent refresh, 
            // but here we manually update local state for speed.
            setItems(prev => [...prev, { ...newItem, originalValue: newItem.value, isDirty: false }])
            setNewItem({ sectionId: "", key: "", value: "" })
            alert("Added new key!")
        } catch (e) {
            console.error(e)
            alert("Failed to add key")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold">Designer Mode</h2>
                    <p className="text-sm text-muted-foreground">Customize layout, colors, and advanced content.</p>
                </div>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="visual" className="flex items-center gap-2">
                            <Palette className="h-4 w-4" /> Visual
                        </TabsTrigger>
                        <TabsTrigger value="code" className="flex items-center gap-2">
                            <Code className="h-4 w-4" /> Developer
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {activeTab === "visual" ? (
                <div className="grid gap-6">
                    <Accordion type="multiple" defaultValue={Object.keys(sections)} className="w-full space-y-4">
                        {(Object.entries(sections) as [string, any[]][]).map(([sectionId, sectionItems]) => (
                            <AccordionItem key={sectionId} value={sectionId} className="border rounded-lg bg-white shadow-sm px-4">
                                <AccordionTrigger className="hover:no-underline py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold capitalize">
                                            {sectionId.charAt(0)}
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <span className="text-base font-semibold capitalize">{sectionId}</span>
                                            <span className="text-xs font-normal text-muted-foreground">{sectionItems.length} properties</span>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pt-2 pb-6 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {sectionItems.map((item, localIndex) => {
                                            // Find the global index for state updates
                                            const globalIndex = items.findIndex(i => i === item)
                                            const inputType = inferInputType(item.key, item.value)

                                            return (
                                                <div key={item.key} className="space-y-2 p-3 rounded-md hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group relative">
                                                    <div className="flex items-center justify-between">
                                                        <Label className="capitalize text-xs font-medium text-slate-500 flex items-center gap-2">
                                                            {inputType === 'color' && <Palette className="h-3 w-3" />}
                                                            {inputType === 'image' && <ImageIcon className="h-3 w-3" />}
                                                            {inputType === 'text' && <Type className="h-3 w-3" />}
                                                            {item.key.replace(/([A-Z])/g, " $1").trim()}
                                                        </Label>
                                                        {item.isDirty && (
                                                            <Button
                                                                size="sm"
                                                                onClick={() => saveItem(globalIndex)}
                                                                disabled={loading}
                                                                className="h-6 text-xs"
                                                            >
                                                                Save
                                                            </Button>
                                                        )}
                                                    </div>

                                                    {inputType === 'textarea' ? (
                                                        <div className="bg-white rounded-md max-w-full overflow-hidden">
                                                            <RichTextEditor
                                                                value={item.value}
                                                                onChange={(val) => handleValueChange(globalIndex, val)}
                                                            />
                                                        </div>
                                                    ) : inputType === 'color' ? (
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-10 w-10 rounded-full border shadow-sm overflow-hidden shrink-0">
                                                                <input
                                                                    type="color"
                                                                    value={item.value}
                                                                    onChange={(e) => handleValueChange(globalIndex, e.target.value)}
                                                                    className="h-[150%] w-[150%] -translate-x-1/4 -translate-y-1/4 cursor-pointer p-0 border-0"
                                                                />
                                                            </div>
                                                            <Input
                                                                value={item.value}
                                                                onChange={(e) => handleValueChange(globalIndex, e.target.value)}
                                                                className="font-mono"
                                                            />
                                                        </div>
                                                    ) : inputType === 'image' ? (
                                                        <div className="space-y-3">
                                                            {item.value && (
                                                                <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-slate-100">
                                                                    <img src={item.value} alt={item.key} className="object-cover w-full h-full" />
                                                                </div>
                                                            )}
                                                            <div className="flex gap-2">
                                                                <Input
                                                                    value={item.value}
                                                                    onChange={(e) => handleValueChange(globalIndex, e.target.value)}
                                                                    placeholder="Image URL..."
                                                                />
                                                                <Dialog
                                                                    open={mediaModalOpen[`${sectionId}-${item.key}`]}
                                                                    onOpenChange={(open) => setMediaModalOpen(prev => ({ ...prev, [`${sectionId}-${item.key}`]: open }))}
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
                                                                                handleValueChange(globalIndex, url)
                                                                                setMediaModalOpen(prev => ({ ...prev, [`${sectionId}-${item.key}`]: false }))
                                                                            }}
                                                                        />
                                                                    </DialogContent>
                                                                </Dialog>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <Input
                                                            value={item.value}
                                                            onChange={(e) => handleValueChange(globalIndex, e.target.value)}
                                                        />
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <Card className="border-dashed shadow-none bg-transparent">
                        <CardHeader>
                            <CardTitle className="text-sm">Add Custom Design Property</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-4">
                                <Input
                                    placeholder="Section (e.g. hero)"
                                    value={newItem.sectionId}
                                    onChange={e => setNewItem(prev => ({ ...prev, sectionId: e.target.value }))}
                                    className="w-1/4"
                                />
                                <Input
                                    placeholder="Key (e.g. backgroundColor)"
                                    value={newItem.key}
                                    onChange={e => setNewItem(prev => ({ ...prev, key: e.target.value }))}
                                    className="w-1/4"
                                />
                                <Input
                                    placeholder="Value"
                                    value={newItem.value}
                                    onChange={e => setNewItem(prev => ({ ...prev, value: e.target.value }))}
                                    className="flex-1"
                                />
                                <Button onClick={addNewKey} disabled={loading} variant="secondary">
                                    <Plus className="mr-2 h-4 w-4" /> Add
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="bg-slate-950 text-slate-300 p-4 rounded-lg font-mono text-xs overflow-auto max-h-[600px]">
                        <table className="w-full text-left">
                            <thead className="text-slate-500 border-b border-slate-800">
                                <tr>
                                    <th className="py-2">Section</th>
                                    <th className="py-2">Key</th>
                                    <th className="py-2">Value</th>
                                    <th className="py-2 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, i) => (
                                    <tr key={i} className="border-b border-slate-900/50 hover:bg-slate-900">
                                        <td className="py-2 pr-4 text-emerald-400">{item.sectionId}</td>
                                        <td className="py-2 pr-4 text-blue-400">{item.key}</td>
                                        <td className="py-2 pr-4 truncate max-w-xs">{item.value}</td>
                                        <td className="py-2 text-right">
                                            {item.isDirty && <Button size="sm" variant="outline" className="h-6 text-[10px]" onClick={() => saveItem(i)}>Save</Button>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}
