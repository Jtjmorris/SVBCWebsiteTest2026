"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MediaLibrary } from "./MediaLibrary"
import { ImageIcon, X } from "lucide-react"

interface ImageSelectProps {
    value: string
    onChange: (url: string) => void
}

export function ImageSelect({ value, onChange }: ImageSelectProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="space-y-4">
            {value ? (
                <div className="relative aspect-video rounded-lg overflow-hidden border max-w-sm">
                    <img src={value} alt="Selected" className="object-cover w-full h-full" />
                    <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8"
                        onClick={() => onChange("")}
                        type="button"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            ) : null}
            <div className="flex gap-2">
                <Input
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder="Enter Image URL or select from library..."
                    className="flex-1"
                />
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="secondary" className="shrink-0 gap-2" type="button">
                            <ImageIcon className="h-4 w-4" /> Select Media
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl sm:max-w-4xl max-h-[90vh] overflow-y-auto w-[90vw]">
                        <DialogHeader>
                            <DialogTitle>Media Library</DialogTitle>
                        </DialogHeader>
                        <MediaLibrary
                            isModal={true}
                            onSelect={(url) => {
                                onChange(url)
                                setIsOpen(false)
                            }}
                        />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
