"use client"

import { useState } from "react"
import { Group } from "@prisma/client"
import { GroupCard } from "./GroupCard"
import { Button } from "@/components/ui/button"

export function GroupFinder({ groups }: { groups: Group[] }) {
    const [filter, setFilter] = useState<string | null>(null)

    const filteredGroups = filter
        ? groups.filter(g => g.type === filter)
        : groups

    const categories = Array.from(new Set(groups.map(g => g.type)))

    return (
        <div className="space-y-8">
            <div className="flex flex-wrap gap-2 justify-center">
                <Button
                    variant={filter === null ? "default" : "outline"}
                    onClick={() => setFilter(null)}
                    className="rounded-full"
                >
                    All Groups
                </Button>
                {categories.map(cat => (
                    <Button
                        key={cat}
                        variant={filter === cat ? "default" : "outline"}
                        onClick={() => setFilter(cat)}
                        className="rounded-full"
                    >
                        {cat}
                    </Button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGroups.map(group => (
                    <GroupCard key={group.id} group={group} />
                ))}
            </div>

            {filteredGroups.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    No groups found matching this category.
                </div>
            )}
        </div>
    )
}
