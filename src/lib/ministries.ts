"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function getMinistries() {
    try {
        const ministries = await prisma.ministry.findMany({
            orderBy: { title: 'asc' }
        })
        return { success: true, data: ministries }
    } catch (error) {
        console.error("Failed to fetch ministries:", error)
        return { success: false, error: "Failed to fetch ministries" }
    }
}

export async function createMinistry(formData: FormData) {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const image = formData.get("image") as string
    const slug = formData.get("slug") as string

    if (!title || !slug) {
        return { success: false, error: "Title and Slug are required" }
    }

    try {
        await prisma.ministry.create({
            data: {
                title,
                description: description || "",
                image: image || null,
                slug,
            }
        })

        revalidatePath("/admin/dashboard/ministries")
        revalidatePath("/ministries") // Update public page too
        return { success: true }
    } catch (error) {
        console.error("Failed to create ministry:", error)
        return { success: false, error: "Failed to create ministry" }
    }
}

export async function deleteMinistry(id: string) {
    try {
        await prisma.ministry.delete({ where: { id } })
        revalidatePath("/admin/dashboard/ministries")
        revalidatePath("/ministries")
        return { success: true }
    } catch (error) {
        console.error("Failed to delete ministry:", error)
        return { success: false, error: "Failed to delete ministry" }
    }
}

export async function updateMinistry(id: string, formData: FormData) {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const image = formData.get("image") as string
    const slug = formData.get("slug") as string

    if (!title || !slug) {
        return { success: false, error: "Title and Slug are required" }
    }

    try {
        await prisma.ministry.update({
            where: { id },
            data: {
                title,
                description: description || "",
                image: image || null,
                slug,
            }
        })

        revalidatePath("/admin/dashboard/ministries")
        revalidatePath("/ministries")
        return { success: true }
    } catch (error) {
        console.error("Failed to update ministry:", error)
        return { success: false, error: "Failed to update ministry" }
    }
}
