"use client"

import { useState, useEffect, useRef } from "react"
import { getMedia, deleteMedia } from "@/lib/media"
import { Button } from "@/components/ui/button"
import { Loader2, Upload, Trash2, Check, Copy } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Cropper from "react-easy-crop"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const ASPECT_RATIOS = {
    "free": undefined,
    "16:9": 16 / 9,
    "1:1": 1,
    "4:3": 4 / 3,
}

// Helper to create the cropped blob
const createImage = (url: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image()
        image.addEventListener("load", () => resolve(image))
        image.addEventListener("error", (error) => reject(error))
        image.setAttribute("crossOrigin", "anonymous")
        image.src = url
    })

async function getCroppedImg(
    imageSrc: string,
    pixelCrop: { x: number; y: number; width: number; height: number }
): Promise<Blob | null> {
    const image = await createImage(imageSrc)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (!ctx) return null

    // set canvas size to match the bounding box
    canvas.width = image.width
    canvas.height = image.height

    // draw image to canvas
    ctx.drawImage(image, 0, 0)

    // extract the cropped image
    const croppedCanvas = document.createElement("canvas")
    const croppedCtx = croppedCanvas.getContext("2d")

    if (!croppedCtx) return null

    croppedCanvas.width = pixelCrop.width
    croppedCanvas.height = pixelCrop.height

    croppedCtx.drawImage(
        canvas,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    )

    return new Promise((resolve, reject) => {
        croppedCanvas.toBlob((file) => {
            resolve(file)
        }, "image/jpeg")
    })
}

interface MediaItem {
    id: string
    filename: string
    url: string
}

interface MediaLibraryProps {
    onSelect?: (url: string) => void
    isModal?: boolean
}

export function MediaLibrary({ onSelect, isModal = false }: MediaLibraryProps) {
    const [media, setMedia] = useState<MediaItem[]>([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Crop State
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [imageSrc, setImageSrc] = useState<string | null>(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [aspect, setAspect] = useState<number | undefined>(ASPECT_RATIOS["16:9"])
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)

    const fetchMedia = async () => {
        setLoading(true)
        const result = await getMedia()
        if (result.success && result.data) {
            setMedia(result.data)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchMedia()
    }, [])

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Open the cropper modal instead of uploading immediately
        setSelectedFile(file)
        const reader = new FileReader()
        reader.addEventListener("load", () => setImageSrc(reader.result?.toString() || null))
        reader.readAsDataURL(file)

        // Reset file input so selecting the same file again triggers onChange
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }

    const handleConfirmCrop = async () => {
        if (!imageSrc || !croppedAreaPixels || !selectedFile) return

        setUploading(true)
        try {
            const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels)
            if (!croppedBlob) throw new Error("Cropping failed")

            // Create a new File from the blob to upload
            const croppedFile = new File([croppedBlob], selectedFile.name, { type: "image/jpeg" })

            const formData = new FormData()
            formData.append("file", croppedFile)

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData
            })
            const data = await res.json()
            if (data.success) {
                await fetchMedia()
                handleCancelCrop()
            } else {
                alert("Upload failed: " + data.error)
            }
        } catch (error) {
            console.error(error)
            alert("Upload error")
        } finally {
            setUploading(false)
        }
    }

    const handleCancelCrop = () => {
        setSelectedFile(null)
        setImageSrc(null)
        setCrop({ x: 0, y: 0 })
        setZoom(1)
    }

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation()
        if (!confirm("Are you sure you want to delete this file?")) return
        const result = await deleteMedia(id)
        if (result.success) {
            setMedia(media.filter(m => m.id !== id))
        } else {
            alert("Delete failed")
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{isModal ? "Select Global Media" : "Media Library"}</h2>
                <div className="relative inline-block overflow-hidden rounded-md">
                    <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        onChange={handleUpload}
                        disabled={uploading}
                        title="Upload Image"
                    />
                    <Button type="button" disabled={uploading} variant="default" className="pointer-events-none w-full">
                        {uploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                        Upload Image
                    </Button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center p-12">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            ) : media.length === 0 ? (
                <div className="text-center p-12 border-2 border-dashed rounded-lg bg-muted/50">
                    <p className="text-muted-foreground">No media files found. Upload your first image!</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {media.map((item) => (
                        <div
                            key={item.id}
                            className={`group relative aspect-square rounded-lg border bg-muted overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all`}
                            onClick={() => onSelect && onSelect(item.url)}
                        >
                            <img
                                src={item.url}
                                alt={item.filename}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                            {isModal ? (
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="gap-2"
                                        onClick={() => onSelect?.(item.url)}
                                    >
                                        <Check className="h-4 w-4" /> Select
                                    </Button>
                                </div>
                            ) : (
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="gap-2"
                                        onClick={() => {
                                            navigator.clipboard.writeText(item.url)
                                            alert("URL copied to clipboard!")
                                        }}
                                    >
                                        <Copy className="h-4 w-4" /> Copy URL
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="gap-2"
                                        onClick={(e) => handleDelete(item.id, e)}
                                    >
                                        <Trash2 className="h-4 w-4" /> Delete
                                    </Button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Crop Modal */}
            <Dialog open={!!imageSrc} onOpenChange={(open) => { if (!open) handleCancelCrop() }}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Crop Image</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <Label>Aspect Ratio</Label>
                            <Select
                                value={Object.entries(ASPECT_RATIOS).find(([_, val]) => val === aspect)?.[0] || "free"}
                                onValueChange={(val) => setAspect(ASPECT_RATIOS[val as keyof typeof ASPECT_RATIOS])}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="16:9">16:9 (Events/Pages)</SelectItem>
                                    <SelectItem value="1:1">1:1 (Profiles/Square)</SelectItem>
                                    <SelectItem value="4:3">4:3 (Standard)</SelectItem>
                                    <SelectItem value="free">Free Roam (No lock)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="relative w-full h-[500px] bg-neutral-900 rounded-md overflow-hidden">
                            {imageSrc && (
                                <Cropper
                                    image={imageSrc}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={aspect}
                                    onCropChange={setCrop}
                                    onCropComplete={onCropComplete}
                                    onZoomChange={setZoom}
                                />
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={handleCancelCrop} disabled={uploading}>
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmCrop} disabled={uploading}>
                            {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Confirm Crop & Upload
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
