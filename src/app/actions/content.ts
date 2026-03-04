"use server"

import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function updateContent(
    pageSlug: string,
    sectionId: string,
    key: string,
    value: string,
    type: string = "text"
) {
    const session = await getServerSession(authOptions)

    // Check permissions
    if (!session || !session.user) {
        throw new Error("Unauthorized")
    }

    const role = (session.user as any).role
    if (!["ADMIN", "DESIGNER", "MINISTRY_LEADER"].includes(role)) {
        throw new Error("Forbidden")
    }

    try {
        await prisma.pageContent.upsert({
            where: {
                pageSlug_sectionId_key: {
                    pageSlug,
                    sectionId,
                    key
                }
            },
            update: {
                value,
                type
            },
            create: {
                pageSlug,
                sectionId,
                key,
                value,
                type
            }
        })

        revalidatePath(`/${pageSlug === "home" ? "" : pageSlug}`)
        return { success: true }
    } catch (error) {
        console.error("Failed to update content:", error)
        return { success: false, error: "Failed to save content" }
    }
}

export async function getContent(pageSlug: string) {
    const content = await prisma.pageContent.findMany({
        where: { pageSlug }
    })

    // Convert array to object for easier access
    // Record<sectionId, Record<key, value>>
    const contentMap: Record<string, Record<string, string>> = {}

    content.forEach(item => {
        if (!contentMap[item.sectionId]) {
            contentMap[item.sectionId] = {}
        }
        contentMap[item.sectionId][item.key] = item.value
    })

    return contentMap
}
