import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    await prisma.pageContent.upsert({
        where: {
            pageSlug_sectionId_key: {
                pageSlug: "home",
                sectionId: "hero",
                key: "backgroundImage",
            },
        },
        update: {
            value: "/uploads/Outside church.jpg",
        },
        create: {
            pageSlug: "home",
            sectionId: "hero",
            key: "backgroundImage",
            value: "/uploads/Outside church.jpg",
        },
    })
    console.log("Updated hero image")
}

main().finally(() => prisma.$disconnect())
