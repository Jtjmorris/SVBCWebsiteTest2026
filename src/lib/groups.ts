"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { Group } from "@prisma/client"

export async function getGroups() {
    try {
        const groups = await prisma.group.findMany({
            orderBy: { name: 'asc' }
        })
        return { success: true, data: groups }
    } catch (error) {
        return { success: false, error: "Failed to fetch groups" }
    }
}

export async function createGroup(formData: FormData) {
    const name = formData.get("name") as string
    const type = formData.get("type") as string
    const day = formData.get("day") as string
    const time = formData.get("time") as string
    const leader = formData.get("leader") as string
    const location = formData.get("location") as string
    const description = formData.get("description") as string
    const image = formData.get("image") as string

    if (!name || !type) {
        return { success: false, error: "Name and Type are required" }
    }

    try {
        await prisma.group.create({
            data: {
                name,
                type,
                day: day || null,
                time: time || null,
                leader: leader || null,
                location: location || null,
                description: description || "",
                image: image || null,
            }
        })

        revalidatePath("/admin/dashboard/groups")
        revalidatePath("/groups")
        return { success: true }
    } catch (error) {
        console.error("Error creating group:", error)
        return { success: false, error: "Failed to create group" }
    }
}

export async function updateGroup(id: string, formData: FormData) {
    const name = formData.get("name") as string
    const type = formData.get("type") as string
    const day = formData.get("day") as string
    const time = formData.get("time") as string
    const leader = formData.get("leader") as string
    const location = formData.get("location") as string
    const description = formData.get("description") as string
    const image = formData.get("image") as string

    if (!name || !type) {
        return { success: false, error: "Name and Type are required" }
    }

    try {
        await prisma.group.update({
            where: { id },
            data: {
                name,
                type,
                day: day || null,
                time: time || null,
                leader: leader || null,
                location: location || null,
                description: description || "",
                image: image || null,
            }
        })

        revalidatePath("/admin/dashboard/groups")
        revalidatePath("/groups")
        return { success: true }
    } catch (error) {
        console.error("Error updating group:", error)
        return { success: false, error: "Failed to update group" }
    }
}

export async function deleteGroup(id: string) {
    try {
        await prisma.group.delete({
            where: { id }
        })

        revalidatePath("/admin/dashboard/groups")
        revalidatePath("/groups")
        return { success: true }
    } catch (error) {
        return { success: false, error: "Failed to delete group" }
    }
}
