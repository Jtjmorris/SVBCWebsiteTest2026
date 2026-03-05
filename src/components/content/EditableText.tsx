"use client"

import { useState, useEffect, useRef } from "react"
import { useAdmin } from "@/components/admin/AdminProvider"
import { updateContent } from "@/app/actions/content"

interface EditableTextProps {
    pageSlug: string
    sectionId: string
    contentKey: string
    defaultValue: string
    className?: string
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
    multiline?: boolean
}

export function EditableText({
    pageSlug,
    sectionId,
    contentKey,
    defaultValue,
    className = "",
    as: Component = "p",
    multiline = false
}: EditableTextProps) {
    const { isEditing, canEdit } = useAdmin()
    const [content, setContent] = useState(defaultValue)
    const [isSaving, setIsSaving] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null)

    // Handle initial server-side value update if needed ??
    // Actually we will pass the DB value as defaultValue.

    const handleBlur = async () => {
        if (!contentRef.current) return

        const newValue = contentRef.current.innerHTML
        if (newValue === content) return // No change

        setIsSaving(true)
        try {
            await updateContent(pageSlug, sectionId, contentKey, newValue)
            setContent(newValue)
            // Optional: Show success indicator
        } catch (error) {
            console.error(error)
            // Revert on error?
            if (contentRef.current) {
                contentRef.current.innerHTML = content
            }
            alert("Failed to save changes")
        } finally {
            setIsSaving(false)
        }
    }

    if (!canEdit) {
        return <Component className={className} dangerouslySetInnerHTML={{ __html: content }} />
    }

    return (
        <Component
            ref={contentRef}
            contentEditable={isEditing}
            onBlur={handleBlur}
            suppressContentEditableWarning
            className={`${className} ${isEditing
                ? "outline-dashed outline-2 outline-primary/50 p-1 rounded hover:bg-muted/50 transition-all cursor-text"
                : ""
                } ${isSaving ? "opacity-50" : ""}`}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    )
}
