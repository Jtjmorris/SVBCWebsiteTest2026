import { Event } from "@/types/event"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin } from "lucide-react"
import { format, parseISO } from "date-fns"

interface EventCardProps {
    event: Event
}

export function EventCard({ event }: EventCardProps) {
    const eventDate = parseISO(event.date)

    return (
        <Card className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row">
                {/* Date Box */}
                <div className="bg-primary/5 p-6 flex flex-col items-center justify-center min-w-[100px] text-center border-b md:border-b-0 md:border-r border-primary/10">
                    <span className="text-sm font-bold text-primary uppercase">{format(eventDate, 'MMM')}</span>
                    <span className="text-3xl font-bold">{format(eventDate, 'd')}</span>
                    <span className="text-xs text-muted-foreground">{format(eventDate, 'eee')}</span>
                </div>

                {/* Content */}
                <CardContent className="p-6 flex-grow">
                    <div className="flex justify-between items-start mb-2">
                        <Badge variant={event.category === 'Service' ? 'default' : 'secondary'} className="mb-2">
                            {event.category}
                        </Badge>
                    </div>

                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{event.description}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-foreground/80">
                        {event.startTime && (
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2 text-primary" />
                                {event.startTime} {event.endTime && `- ${event.endTime}`}
                            </div>
                        )}
                        {event.location && (
                            <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2 text-primary" />
                                {event.location}
                            </div>
                        )}
                    </div>
                </CardContent>
            </div>
        </Card>
    )
}
