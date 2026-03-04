import { getEvents } from "@/lib/events"
import { EventList } from "@/components/admin/EventList"

export const dynamic = "force-dynamic"

export default async function EventsAdmin() {
    const { data: rawEvents } = await getEvents()

    // Serialize dates for client component
    const events = rawEvents?.map(event => ({
        ...event,
        date: event.date.toISOString(),
        createdAt: event.createdAt.toISOString(),
        updatedAt: event.updatedAt.toISOString()
    })) || []

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Events Management</h1>
                <p className="text-muted-foreground">Manage upcoming church events and calendar items.</p>
            </div>

            <EventList initialEvents={events as any} />
        </div>
    )
}
