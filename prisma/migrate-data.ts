import { PrismaClient } from "@prisma/client";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

const prisma = new PrismaClient();

async function migrateData() {
    console.log("Connecting to SQLite database...");
    const dbPath = path.resolve(process.cwd(), "prisma/dev.db");
    const sqliteDb = await open({
        filename: dbPath,
        driver: sqlite3.Database,
    });

    console.log("Connected to local dev.db.");
    console.log("Connecting to Neon PostgreSQL...");
    // prisma will connect using the DATABASE_URL in .env

    try {
        // 1. Migrate Events
        console.log("Migrating Events...");
        try {
            const events = await sqliteDb.all("SELECT * FROM Event");
            if (events.length > 0) {
                await prisma.event.createMany({
                    data: events.map(e => ({
                        ...e,
                        date: new Date(e.date),
                        createdAt: new Date(e.createdAt),
                        updatedAt: new Date(e.updatedAt),
                    })),
                    skipDuplicates: true,
                });
                console.log(`Migrated ${events.length} Events.`);
            }
        } catch (e) {
            console.log("No Event table or data found.");
        }

        // 2. Migrate Sermons
        console.log("Migrating Sermons...");
        try {
            const sermons = await sqliteDb.all("SELECT * FROM Sermon");
            if (sermons.length > 0) {
                await prisma.sermon.createMany({
                    data: sermons.map(s => ({
                        ...s,
                        date: new Date(s.date),
                        createdAt: new Date(s.createdAt),
                        updatedAt: new Date(s.updatedAt),
                    })),
                    skipDuplicates: true,
                });
                console.log(`Migrated ${sermons.length} Sermons.`);
            }
        } catch (e) {
            console.log("No Sermon table or data found.");
        }

        // 3. Migrate Ministries
        console.log("Migrating Ministries...");
        try {
            const ministries = await sqliteDb.all("SELECT * FROM Ministry");
            if (ministries.length > 0) {
                await prisma.ministry.createMany({
                    data: ministries.map(m => ({
                        ...m,
                        createdAt: new Date(m.createdAt),
                        updatedAt: new Date(m.updatedAt),
                    })),
                    skipDuplicates: true,
                });
                console.log(`Migrated ${ministries.length} Ministries.`);
            }
        } catch (e) {
            console.log("No Ministry table or data found.");
        }

        // 4. Migrate Groups
        console.log("Migrating Groups...");
        try {
            const groups = await sqliteDb.all("SELECT * FROM \"Group\"");
            if (groups.length > 0) {
                await prisma.group.createMany({
                    data: groups.map(g => ({
                        ...g,
                        createdAt: new Date(g.createdAt),
                        updatedAt: new Date(g.updatedAt),
                    })),
                    skipDuplicates: true,
                });
                console.log(`Migrated ${groups.length} Groups.`);
            }
        } catch (e) {
            console.log("No Group table or data found.");
        }

        // 5. Migrate Navigation Items
        console.log("Migrating NavigationItems...");
        try {
            const navItems = await sqliteDb.all("SELECT * FROM NavigationItem");
            if (navItems.length > 0) {
                await prisma.navigationItem.createMany({
                    data: navItems.map(n => ({
                        ...n,
                        createdAt: new Date(n.createdAt),
                        updatedAt: new Date(n.updatedAt),
                    })),
                    skipDuplicates: true,
                });
                console.log(`Migrated ${navItems.length} NavigationItems.`);
            }
        } catch (e) {
            console.log("No NavigationItem table or data found.");
        }

        // 6. Migrate Page Content
        console.log("Migrating PageContent...");
        try {
            const pageContent = await sqliteDb.all("SELECT * FROM PageContent");
            if (pageContent.length > 0) {
                await prisma.pageContent.createMany({
                    data: pageContent.map(p => ({
                        ...p,
                        createdAt: new Date(p.createdAt),
                        updatedAt: new Date(p.updatedAt),
                    })),
                    skipDuplicates: true,
                });
                console.log(`Migrated ${pageContent.length} PageContent items.`);
            }
        } catch (e) {
            console.log("No PageContent table or data found.");
        }

        console.log("Migration complete! All data successfully moved to Neon.");
    } catch (error) {
        console.error("Migration failed:", error);
    } finally {
        await sqliteDb.close();
        await prisma.$disconnect();
    }
}

migrateData();
