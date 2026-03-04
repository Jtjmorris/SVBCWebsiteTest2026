import { Event } from "@/types/event"
import { EventCard } from "./EventCard"
import { Section } from "@/components/ui/Section"

interface EventListProps {
    events: Event[]
}

export function EventList({ events }: EventListProps) {
    // Separate Featured/Special events from recurring ones if needed
    // For now, just show all sorted by date
    // const sortedEvents = [...events].sort((a, b) => 
    //    new Date(a.date).getTime() - new Date(b.date).getTime()
    // )

    return (
        <Section className="py-12">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
                    <p className="text-muted-foreground">
                        Find out what's happening at SVBC. From recurring ministries to special community events.
                    </p>
                </div>

                <div className="space-y-4">
                    {events.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </div>
        </Section>
    )
}
