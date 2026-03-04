"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function getSettings() {
    try {
        const settings = await prisma.pageContent.findMany({
            where: { pageSlug: "global", sectionId: "settings" }
        })

        const settingsMap: Record<string, string> = {}
        settings.forEach(s => {
            settingsMap[s.key] = s.value
        })

        return { success: true, data: settingsMap }
    } catch (error) {
        console.error("Failed to fetch settings:", error)
        return { success: false, error: "Failed to fetch settings" }
    }
}

export async function updateSettings(formData: FormData) {
    try {
        const updates: Promise<any>[] = []

        formData.forEach((value, key) => {
            if (typeof value === 'string') {
                updates.push(
                    prisma.pageContent.upsert({
                        where: {
                            pageSlug_sectionId_key: {
                                pageSlug: "global",
                                sectionId: "settings",
                                key: key
                            }
                        },
                        update: { value },
                        create: {
                            pageSlug: "global",
                            sectionId: "settings",
                            key: key,
                            value,
                            type: "text"
                        }
                    })
                )
            }
        })

        await Promise.all(updates)
        revalidatePath("/admin/dashboard/settings")
        revalidatePath("/", "layout") // Invalidate basic layout since title/email might be used globally
        return { success: true }
    } catch (error) {
        console.error("Failed to update settings:", error)
        return { success: false, error: "Failed to update settings" }
    }
}
