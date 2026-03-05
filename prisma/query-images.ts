import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    const ministries = await prisma.ministry.findMany()
    console.log("Ministries:")
    ministries.forEach(m => console.log(`- ${m.title}: ${m.image}`))

    const events = await prisma.event.findMany()
    console.log("\nEvents:")
    events.forEach(e => console.log(`- ${e.title}: ${e.image}`))
}

main().finally(() => prisma.$disconnect())
