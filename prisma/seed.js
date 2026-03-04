const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
    datasourceUrl: "file:./dev.db"
})

async function main() {
    console.log('Seeding database...')

    // 1. Initial Ministries
    const ministries = [
        {
            title: "SVBC Kids",
            description: "A fun and safe place for children to learn about Jesus. We offer Sunday School for ages K-6 during the morning service.",
            slug: "kids",
            image: "https://images.unsplash.com/photo-1473646590311-647ad23f46f4?auto=format&fit=crop&q=80&w=1000"
        },
        {
            title: "UP Student Ministries",
            description: "Connecting youth (Grades 7-12) with God and each other. Join us for Friday night events and bible studies.",
            slug: "youth",
            image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=1000"
        },
        {
            title: "Young Adults",
            description: "A community for 18-30s to grow in faith, build friendships, and navigate life together.",
            slug: "young-adults",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000"
        },
        {
            title: "Men's Ministry",
            description: "Equipping men to be spiritual leaders in their homes, church, and community through breakfast meetings and retreats.",
            slug: "mens",
            image: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?auto=format&fit=crop&q=80&w=1000"
        },
        {
            title: "Women's Ministry",
            description: "Encouraging women in their walk with Christ through bible studies, prayer groups, and special events.",
            slug: "womens",
            image: "https://images.unsplash.com/photo-1573166675921-076ea6b621ce?auto=format&fit=crop&q=80&w=1000"
        },
        {
            title: "Worship & Tech",
            description: "Using our musical and technical gifts to lead the congregation in praise and creating a distraction-free environment for worship.",
            slug: "worship",
            image: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&q=80&w=1000"
        }
    ]

    for (const ministry of ministries) {
        await prisma.ministry.upsert({
            where: { slug: ministry.slug },
            update: {},
            create: ministry,
        })
    }

    // 2. Initial Page Content
    await prisma.pageContent.upsert({
        where: { pageSlug_sectionId_key: { pageSlug: 'ministries', sectionId: 'hero', key: 'title' } },
        update: {},
        create: {
            pageSlug: 'ministries',
            sectionId: 'hero',
            key: 'title',
            value: 'Ministries at SVBC'
        }
    })

    await prisma.pageContent.upsert({
        where: { pageSlug_sectionId_key: { pageSlug: 'ministries', sectionId: 'hero', key: 'description' } },
        update: {},
        create: {
            pageSlug: 'ministries',
            sectionId: 'hero',
            key: 'description',
            value: 'There is a place for everyone here. Find a group to connect with, serve alongside, and grow in your faith.'
        }
    })

    console.log('Seeding finished.')
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
