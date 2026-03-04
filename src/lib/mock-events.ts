import { Event } from "@/types/event"

export const mockEvents: Event[] = [
    {
        id: "1",
        title: "Sunday Worship Service",
        description: "Join us for worship and teaching. Coffee services available before service.",
        date: "2026-02-15",
        startTime: "10:00 AM",
        endTime: "11:15 AM",
        location: "Main Sanctuary",
        category: "Service",
        image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop"
    },
    {
        id: "2",
        title: "Youth Group",
        description: "Games, snacks, and bible study for grades 7-12.",
        date: "2026-02-18",
        startTime: "6:30 PM",
        endTime: "8:30 PM",
        location: "Youth Room",
        category: "Ministry",
        image: "https://images.unsplash.com/photo-1529156069893-b2203bcb78f9?q=80&w=2076&auto=format&fit=crop"
    },
    {
        id: "3",
        title: "Inductive Bible Study",
        description: "Deep dive into scripture using the inductive method.",
        date: "2026-02-11",
        startTime: "7:00 PM",
        endTime: "9:00 PM",
        location: "Room 202",
        category: "Ministry"
    },
    {
        id: "4",
        title: "Joy in the Making",
        description: "An evening of creative fellowship. Bring your own craft project!",
        date: "2026-02-20",
        startTime: "7:00 PM",
        endTime: "9:00 PM",
        location: "Fireside Room",
        category: "Special Event",
        image: "https://images.unsplash.com/photo-1456086272160-b28b3a0b949d?q=80&w=2079&auto=format&fit=crop"
    },
    {
        id: "5",
        title: "Kids' Church Training",
        description: "mandatory training for all kids ministry volunteers.",
        date: "2026-02-21",
        startTime: "9:00 AM",
        endTime: "12:00 PM",
        location: "Fireside Room",
        category: "Ministry"
    },
    {
        id: "6",
        title: "Laser Tag Night",
        description: "Young Adults (30s & 40s) social night out.",
        date: "2026-02-27",
        startTime: "7:00 PM",
        location: "Planet Lazer",
        category: "Special Event"
    }
]
