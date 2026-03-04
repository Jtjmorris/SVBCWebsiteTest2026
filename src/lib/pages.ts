"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function getPages() {
    try {
        const pages = await prisma.page.findMany({
            orderBy: { updatedAt: 'desc' }
        })
        return { success: true, data: pages }
    } catch (error) {
        return { success: false, error: "Failed to fetch pages" }
    }
}

export async function getPageBySlug(slug: string) {
    try {
        const page = await prisma.page.findUnique({
            where: { slug }
        })
        return { success: true, data: page }
    } catch (error) {
        return { success: false, error: "Failed to fetch page" }
    }
}

export async function createPage(formData: FormData) {
    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const content = formData.get("content") as string // JSON string or HTML
    const isPublished = formData.get("isPublished") === "true"
    const metaTitle = formData.get("metaTitle") as string
    const metaDescription = formData.get("metaDescription") as string

    if (!title || !slug) {
        return { success: false, error: "Title and Slug are required" }
    }

    try {
        await prisma.page.create({
            data: {
                title,
                slug,
                content: content || "",
                isPublished,
                metaTitle,
                metaDescription
            }
        })

        revalidatePath("/admin/dashboard/pages")
        return { success: true }
    } catch (error) {
        console.error("Error creating page:", error)
        return { success: false, error: "Failed to create page (Slug might be taken)" }
    }
}

export async function updatePage(id: string, formData: FormData) {
    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const content = formData.get("content") as string
    const isPublished = formData.get("isPublished") === "true"
    const metaTitle = formData.get("metaTitle") as string
    const metaDescription = formData.get("metaDescription") as string

    try {
        await prisma.page.update({
            where: { id },
            data: {
                title,
                slug,
                content,
                isPublished,
                metaTitle,
                metaDescription
            }
        })

        revalidatePath("/admin/dashboard/pages")
        revalidatePath(`/${slug}`)
        return { success: true }
    } catch (error) {
        return { success: false, error: "Failed to update page" }
    }
}

export async function deletePage(id: string) {
    try {
        await prisma.page.delete({
            where: { id }
        })

        revalidatePath("/admin/dashboard/pages")
        return { success: true }
    } catch (error) {
        return { success: false, error: "Failed to delete page" }
    }
}
