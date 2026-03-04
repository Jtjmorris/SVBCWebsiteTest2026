"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function getSermons() {
    try {
        const sermons = await prisma.sermon.findMany({
            orderBy: { date: 'desc' }
        })
        return { success: true, data: sermons }
    } catch (error) {
        console.error("Failed to fetch sermons:", error)
        return { success: false, error: "Failed to fetch sermons" }
    }
}

export async function createSermon(formData: FormData) {
    const title = formData.get("title") as string
    const speaker = formData.get("speaker") as string
    const series = formData.get("series") as string
    const dateStr = formData.get("date") as string
    const videoUrl = formData.get("videoUrl") as string
    const thumbnail = formData.get("thumbnail") as string
    const scripture = formData.get("scripture") as string

    if (!title || !dateStr) {
        return { success: false, error: "Title and Date are required" }
    }

    try {
        await prisma.sermon.create({
            data: {
                title,
                speaker: speaker || "Guest Speaker",
                series: series || "Sunday Service",
                date: new Date(dateStr),
                videoUrl: videoUrl || null,
                thumbnail: thumbnail || "",
                scripture: scripture || "",
            }
        })

        revalidatePath("/admin/dashboard/sermons")
        revalidatePath("/sermons")
        return { success: true }
    } catch (error) {
        console.error("Failed to create sermon:", error)
        return { success: false, error: "Failed to create sermon" }
    }
}

export async function updateSermon(id: string, formData: FormData) {
    const title = formData.get("title") as string
    const speaker = formData.get("speaker") as string
    const series = formData.get("series") as string
    const dateStr = formData.get("date") as string
    const videoUrl = formData.get("videoUrl") as string
    const thumbnail = formData.get("thumbnail") as string
    const scripture = formData.get("scripture") as string

    if (!title || !dateStr) {
        return { success: false, error: "Title and Date are required" }
    }

    try {
        await prisma.sermon.update({
            where: { id },
            data: {
                title,
                speaker: speaker || "Guest Speaker",
                series: series || "Sunday Service",
                date: new Date(dateStr),
                videoUrl: videoUrl || null,
                thumbnail: thumbnail || "",
                scripture: scripture || "",
            }
        })

        revalidatePath("/admin/dashboard/sermons")
        revalidatePath("/sermons")
        return { success: true }
    } catch (error) {
        console.error("Failed to update sermon:", error)
        return { success: false, error: "Failed to update sermon" }
    }
}

export async function deleteSermon(id: string) {
    try {
        await prisma.sermon.delete({ where: { id } })
        revalidatePath("/admin/dashboard/sermons")
        revalidatePath("/sermons")
        return { success: true }
    } catch (error) {
        console.error("Failed to delete sermon:", error)
        return { success: false, error: "Failed to delete sermon" }
    }
}
