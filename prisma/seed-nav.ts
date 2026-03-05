import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
    await prisma.navigationItem.createMany({
        data: [
            { label: "Home", url: "/", order: 1, type: "HEADER" },
            { label: "About", url: "/about", order: 2, type: "HEADER" },
            { label: "Ministries", url: "/ministries", order: 3, type: "HEADER" },
            { label: "Events", url: "/events", order: 4, type: "HEADER" },
            { label: "Sermons", url: "/sermons", order: 5, type: "HEADER" },
            { label: "Visit", url: "/visit", order: 6, type: "HEADER" }
        ],
        skipDuplicates: true
    })
    console.log("Nav items seeded")
}

main().finally(() => prisma.$disconnect())
