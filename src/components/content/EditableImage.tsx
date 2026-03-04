"use client"

import { useState } from "react"
import { useAdmin } from "@/components/admin/AdminProvider"
import { updateContent } from "@/app/actions/content"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MediaLibrary } from "@/components/admin/MediaLibrary"
import { Button } from "@/components/ui/button"
import { ImageIcon, Loader2 } from "lucide-react"

interface EditableImageProps {
    pageSlug: string
    sectionId: string
    contentKey: string
    defaultValue: string
    className?: string
    alt?: string
}

export function EditableImage({
    pageSlug,
    sectionId,
    contentKey,
    defaultValue,
    className = "",
    alt = "Image"
}: EditableImageProps) {
    const { isEditing, canEdit } = useAdmin()
    const [imageUrl, setImageUrl] = useState(defaultValue)
    const [isSaving, setIsSaving] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const handleSelect = async (url: string) => {
        if (url === imageUrl) {
            setIsOpen(false)
            return
        }

        setIsSaving(true)
        try {
            await updateContent(pageSlug, sectionId, contentKey, url, "image")
            setImageUrl(url)
            setIsOpen(false)
        } catch (error) {
            console.error(error)
            alert("Failed to save image")
        } finally {
            setIsSaving(false)
        }
    }

    if (!canEdit || !isEditing) {
        return (
            <img
                src={imageUrl}
                alt={alt}
                className={className}
            />
        )
    }

    return (
        <div className={`relative group w-full h-full ${isSaving ? "opacity-50" : ""}`}>
            <img
                src={imageUrl}
                alt={alt}
                className={className}
            />

            {/* Edit overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-12 backdrop-blur-sm z-20">
                <Button
                    variant="secondary"
                    className="gap-2"
                    onClick={() => setIsOpen(true)}
                    disabled={isSaving}
                >
                    {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageIcon className="h-4 w-4" />}
                    Change Image
                </Button>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto z-[100]">
                    <DialogHeader>
                        <DialogTitle>Media Library</DialogTitle>
                    </DialogHeader>
                    <MediaLibrary
                        isModal={true}
                        onSelect={handleSelect}
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}
