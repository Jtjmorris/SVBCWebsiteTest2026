"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { PageContent } from "@prisma/client"

export type PageContentMap = Record<string, Record<string, string>>

const HOME_DEFAULTS: PageContentMap = {
  hero: {
    title: "Welcome Home",
    subtitle: "We are a fellowship of people who have a personal relationship with Jesus Christ. Join us this Sunday at 10:00 AM.",
    primaryCtaText: "Plan Your Visit",
    primaryCtaLink: "/visit",
    secondaryCtaText: "Watch Live",
    secondaryCtaLink: "/sermons",
    backgroundImage: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop"
  },
  welcome: {
    title: "Love God. Serve Others. Change Lives.",
    description: "We hope that as we introduce ourselves you will feel the warmth of our desire for friendship with you, and the joy of knowing and serving Christ together.",
    linkText: "Learn more about us →",
    linkUrl: "/about"
  },
  features: {
    eventsTitle: "Events",
    eventsDescription: "From Youth Group to Seniors' Bible Study, there's something for everyone.",
    sermonsTitle: "Sermons",
    sermonsDescription: "Listen to recent messages from Pastor Serge and the team.",
    ministriesTitle: "Ministries",
    ministriesDescription: "Find your place in our community through SVBC Kids, Youth, and more."
  },
  location: {
    title: "Join Us This Sunday",
    time: "Sundays at 10:00 AM",
    address: "51 Woodlands Rd, St. Albert, AB",
    description: "Our service is about 75 minutes long. We have programs for kids, coffee is on us, and you can wear whatever you feel comfortable in."
  }
}

/**
 * Fetches all content for a given page slug, organized by sectionId.
 * Returns a map: { sectionId: { key: value } }
 */
export async function getPageContent(pageSlug: string): Promise<PageContentMap> {
  const content = await prisma.pageContent.findMany({
    where: { pageSlug },
  })

  const contentMap: PageContentMap = {}

  for (const item of content) {
    if (!contentMap[item.sectionId]) {
      contentMap[item.sectionId] = {}
    }
    contentMap[item.sectionId][item.key] = item.value
  }

  if (pageSlug === "home") {
    for (const [sectionId, sectionDefaults] of Object.entries(HOME_DEFAULTS)) {
      if (!contentMap[sectionId]) contentMap[sectionId] = {}
      for (const [key, defaultValue] of Object.entries(sectionDefaults)) {
        if (contentMap[sectionId][key] === undefined) {
          contentMap[sectionId][key] = defaultValue
        }
      }
    }
  }

  return contentMap
}

/**
 * Updates a single content item.
 */
export async function updatePageContent(
  pageSlug: string,
  sectionId: string,
  key: string,
  value: string
) {
  await prisma.pageContent.upsert({
    where: {
      pageSlug_sectionId_key: {
        pageSlug,
        sectionId,
        key,
      },
    },
    update: { value },
    create: {
      pageSlug,
      sectionId,
      key,
      value,
    },
  })

  revalidatePath(`/${pageSlug === "home" ? "" : pageSlug}`)
  revalidatePath(`/admin/editor/${pageSlug}`)
}

/**
 * Updates multiple content items for a section.
 */
export async function updateSectionContent(
  pageSlug: string,
  sectionId: string,
  data: Record<string, string>
) {
  const promises = Object.entries(data).map(([key, value]) =>
    prisma.pageContent.upsert({
      where: {
        pageSlug_sectionId_key: {
          pageSlug,
          sectionId,
          key,
        },
      },
      update: { value },
      create: {
        pageSlug,
        sectionId,
        key,
        value,
      },
    })
  )

  await Promise.all(promises)

  revalidatePath(`/${pageSlug === "home" ? "" : pageSlug}`)
  revalidatePath(`/admin/editor/${pageSlug}`)
}

/**
 * Get all unique page slugs that have content.
 */
export async function getEditablePages() {
  const result = await prisma.pageContent.groupBy({
    by: ["pageSlug"],
  })
  return result.map((r) => r.pageSlug)
}
