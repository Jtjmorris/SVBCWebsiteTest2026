import { SmallGroup } from "@/types/group"

export const mockGroups: SmallGroup[] = [
    {
        id: "1",
        name: "Young Adults",
        description: "A community for people in their 20s and 30s to grow in faith and friendship.",
        type: "Young Adults",
        day: "Wednesdays",
        time: "7:00 PM",
        location: "Fireside Room",
        leader: "Justin Morris",
        image: "https://images.unsplash.com/photo-1529156069893-b2203bcb78f9?q=80&w=2076&auto=format&fit=crop"
    },
    {
        id: "2",
        name: "Men's Bible Study",
        description: "Digging deep into the Word and supporting one another.",
        type: "Men",
        day: "Tuesdays",
        time: "7:00 PM",
        location: "Room 202",
        leader: "Serge Poirier"
    },
    {
        id: "3",
        name: "Women's Morning Glories",
        description: "A time of fellowship and study for women of all ages.",
        type: "Women",
        day: "Thursdays",
        time: "9:30 AM",
        location: "Fireside Room",
        leader: "Gayleen Davis"
    },
    {
        id: "4",
        name: "Seniors' Coffee & Chat",
        description: "Relaxed time of connection and prayer.",
        type: "Seniors",
        day: "Fridays",
        time: "10:00 AM",
        location: "Foyer",
        leader: "Rene Huellstrung"
    }
]
