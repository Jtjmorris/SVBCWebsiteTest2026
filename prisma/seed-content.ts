
import "dotenv/config"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    console.log("Seeding home page content...")

    const homeContent = [
        // Hero Section
        {
            pageSlug: "home",
            sectionId: "hero",
            key: "title",
            value: "Welcome Home",
            type: "text",
        },
        {
            pageSlug: "home",
            sectionId: "hero",
            key: "subtitle",
            value: "We are a fellowship of people who have a personal relationship with Jesus Christ. Join us this Sunday at 10:00 AM.",
            type: "text",
        },
        {
            pageSlug: "home",
            sectionId: "hero",
            key: "primaryCtaText",
            value: "Plan Your Visit",
            type: "text",
        },
        {
            pageSlug: "home",
            sectionId: "hero",
            key: "primaryCtaLink",
            value: "/visit",
            type: "text",
        },
        {
            pageSlug: "home",
            sectionId: "hero",
            key: "secondaryCtaText",
            value: "Watch Live",
            type: "text",
        },
        {
            pageSlug: "home",
            sectionId: "hero",
            key: "secondaryCtaLink",
            value: "/sermons",
            type: "text",
        },

        // Welcome Section
        {
            pageSlug: "home",
            sectionId: "welcome",
            key: "title",
            value: "Love God. Serve Others. Change Lives.",
            type: "text",
        },
        {
            pageSlug: "home",
            sectionId: "welcome",
            key: "description",
            value: "We hope that as we introduce ourselves you will feel the warmth of our desire for friendship with you, and the joy of knowing and serving Christ together.",
            type: "textarea",
        },
        {
            pageSlug: "home",
            sectionId: "welcome",
            key: "linkText",
            value: "Learn more about us →",
            type: "text",
        },
        {
            pageSlug: "home",
            sectionId: "welcome",
            key: "linkUrl",
            value: "/about",
            type: "text",
        },

        // Features Section (Events, Sermons, Ministries)
        {
            pageSlug: "home",
            sectionId: "features",
            key: "eventsTitle",
            value: "Events",
            type: "text",
        },
        {
            pageSlug: "home",
            sectionId: "features",
            key: "eventsDescription",
            value: "From Youth Group to Seniors' Bible Study, there's something for everyone.",
            type: "textarea",
        },
        {
            pageSlug: "home",
            sectionId: "features",
            key: "sermonsTitle",
            value: "Sermons",
            type: "text",
        },
        {
            pageSlug: "home",
            sectionId: "features",
            key: "sermonsDescription",
            value: "Listen to recent messages from Pastor Serge and the team.",
            type: "textarea",
        },
        {
            pageSlug: "home",
            sectionId: "features",
            key: "ministriesTitle",
            value: "Ministries",
            type: "text",
        },
        {
            pageSlug: "home",
            sectionId: "features",
            key: "ministriesDescription",
            value: "Find your place in our community through SVBC Kids, Youth, and more.",
            type: "textarea",
        },

        // Location Section
        {
            pageSlug: "home",
            sectionId: "location",
            key: "title",
            value: "Join Us This Sunday",
            type: "text",
        },
        {
            pageSlug: "home",
            sectionId: "location",
            key: "time",
            value: "Sundays at 10:00 AM",
            type: "text",
        },
        {
            pageSlug: "home",
            sectionId: "location",
            key: "address",
            value: "51 Woodlands Rd, St. Albert, AB",
            type: "text",
        },
        {
            pageSlug: "home",
            sectionId: "location",
            key: "description",
            value: "Our service is about 75 minutes long. We have programs for kids, coffee is on us, and you can wear whatever you feel comfortable in.",
            type: "textarea",
        },
    ]

    for (const item of homeContent) {
        await prisma.pageContent.upsert({
            where: {
                pageSlug_sectionId_key: {
                    pageSlug: item.pageSlug,
                    sectionId: item.sectionId,
                    key: item.key,
                },
            },
            update: item,
            create: item,
        })
    }

    console.log("Seeding complete.")
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
