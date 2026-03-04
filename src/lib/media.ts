"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function getMedia() {
    try {
        const media = await prisma.media.findMany({
            orderBy: { createdAt: 'desc' }
        })
        return { success: true, data: media }
    } catch (error) {
        return { success: false, error: "Failed to fetch media" }
    }
}

export async function deleteMedia(id: string) {
    try {
        const media = await prisma.media.findUnique({ where: { id } })
        if (!media) return { success: false, error: "Media not found" }

        // Attempt physical delete
        const fs = require('fs')
        const path = require('path')
        try {
            if (media.url) {
                const filepath = path.join(process.cwd(), 'public', media.url.replace(/^\//, ''))
                if (fs.existsSync(filepath)) fs.unlinkSync(filepath)
            }
        } catch (e) {
            console.error("Failed to delete local file:", e)
        }

        await prisma.media.delete({ where: { id } })
        revalidatePath("/admin/dashboard/media")
        return { success: true }
    } catch (error: any) {
        console.error("Failed to delete media record:", error)
        return { success: false, error: error.message || "Failed to delete media" }
    }
}
