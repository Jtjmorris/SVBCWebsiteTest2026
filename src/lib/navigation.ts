"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { NavigationItem } from "@prisma/client"

export async function getNavigationItems(): Promise<{ success: boolean, data?: NavigationItem[], error?: string }> {
    try {
        const items = await prisma.navigationItem.findMany({
            orderBy: { order: 'asc' }
        })
        return { success: true, data: items }
    } catch (error) {
        return { success: false, error: "Failed to fetch navigation" }
    }
}

export async function createNavigationItem(formData: FormData) {
    const label = formData.get("label") as string
    const url = formData.get("url") as string
    const type = formData.get("type") as string
    const order = parseInt(formData.get("order") as string) || 0

    if (!label || !url) {
        return { success: false, error: "Label and URL are required" }
    }

    try {
        await prisma.navigationItem.create({
            data: {
                label,
                url,
                type,
                order
            }
        })

        revalidatePath("/", "layout") // Revalidate everywhere since nav is global
        revalidatePath("/admin/dashboard/navigation")
        return { success: true }
    } catch (error) {
        return { success: false, error: "Failed to create item" }
    }
}

export async function deleteNavigationItem(id: string) {
    try {
        await prisma.navigationItem.delete({
            where: { id }
        })

        revalidatePath("/", "layout")
        revalidatePath("/admin/dashboard/navigation")
        return { success: true }
    } catch (error) {
        return { success: false, error: "Failed to delete item" }
    }
}

export async function updateNavigationOrder(items: { id: string, order: number }[]) {
    try {
        for (const item of items) {
            await prisma.navigationItem.update({
                where: { id: item.id },
                data: { order: item.order }
            })
        }
        revalidatePath("/", "layout")
        return { success: true }
    } catch (error) {
        return { success: false, error: "Failed to update order" }
    }
}
