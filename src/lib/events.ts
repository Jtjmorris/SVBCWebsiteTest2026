"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { Event } from "@prisma/client"



export async function getEvents() {
    try {
        const events = await prisma.event.findMany({
            orderBy: { date: 'asc' }
        })
        return { success: true, data: events }
    } catch (error) {
        return { success: false, error: "Failed to fetch events" }
    }
}

export async function createEvent(formData: FormData) {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const dateStr = formData.get("date") as string
    const startTime = formData.get("startTime") as string
    const endTime = formData.get("endTime") as string
    const location = formData.get("location") as string
    const category = formData.get("category") as string
    const image = formData.get("image") as string // URL for now

    if (!title || !dateStr || !category) {
        return { success: false, error: "Title, Date, and Category are required" }
    }

    try {
        await prisma.event.create({
            data: {
                title,
                description: description || "",
                date: new Date(dateStr),
                startTime: startTime || null,
                endTime: endTime || null,
                location: location || null,
                category,
                image: image || null,
            }
        })

        revalidatePath("/admin/dashboard/events")
        revalidatePath("/events")
        return { success: true }
    } catch (error) {
        console.error("Error creating event:", error)
        return { success: false, error: "Failed to create event" }
    }
}

export async function updateEvent(id: string, formData: FormData) {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const dateStr = formData.get("date") as string
    const startTime = formData.get("startTime") as string
    const endTime = formData.get("endTime") as string
    const location = formData.get("location") as string
    const category = formData.get("category") as string
    const image = formData.get("image") as string

    if (!title || !dateStr || !category) {
        return { success: false, error: "Title, Date, and Category are required" }
    }

    try {
        await prisma.event.update({
            where: { id },
            data: {
                title,
                description: description || "",
                date: new Date(dateStr),
                startTime: startTime || null,
                endTime: endTime || null,
                location: location || null,
                category,
                image: image || null,
            }
        })

        revalidatePath("/admin/dashboard/events")
        revalidatePath("/events")
        return { success: true }
    } catch (error) {
        console.error("Error updating event:", error)
        return { success: false, error: "Failed to update event" }
    }
}

export async function deleteEvent(id: string) {
    try {
        await prisma.event.delete({
            where: { id }
        })

        revalidatePath("/admin/dashboard/events")
        revalidatePath("/events")
        return { success: true }
    } catch (error) {
        return { success: false, error: "Failed to delete event" }
    }
}
