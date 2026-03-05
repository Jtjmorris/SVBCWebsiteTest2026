import { getEvents } from "@/lib/events"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin } from "lucide-react"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function EventsPage() {
    const { data: events } = await getEvents()

    return (
        <div className="flex flex-col min-h-screen">
            <section className="bg-primary py-20 text-center text-primary-foreground">
                <div className="container px-4">
                    <h1 className="text-5xl font-bold mb-6">Upcoming Events</h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Join us for worship, fellowship, and community service. There's something for everyone!
                    </p>
                </div>
            </section>

            <section className="py-16 container px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events?.map((event) => (
                        <Card key={event.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                            {event.image ? (
                                <div className="aspect-video relative w-full shrink-0 overflow-hidden bg-muted">
                                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase shadow-sm">
                                        {event.category}
                                    </div>
                                </div>
                            ) : (
                                <div className="aspect-video relative w-full shrink-0 overflow-hidden bg-primary/5 flex items-center justify-center">
                                    <Calendar className="w-16 h-16 text-primary/20" />
                                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase shadow-sm">
                                        {event.category}
                                    </div>
                                </div>
                            )}
                            <CardHeader>
                                <CardTitle className="text-2xl">{event.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow space-y-4">
                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-primary" />
                                        <span>{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                    {(event.startTime || event.endTime) && (
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-primary" />
                                            <span>
                                                {event.startTime} {event.endTime ? `- ${event.endTime}` : ''}
                                            </span>
                                        </div>
                                    )}
                                    {event.location && (
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-primary" />
                                            <span>{event.location}</span>
                                        </div>
                                    )}
                                </div>
                                <div
                                    className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground line-clamp-4 [&>*]:my-1"
                                    dangerouslySetInnerHTML={{ __html: event.description || "" }}
                                />
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" asChild>
                                    <Link href="/contact">Register / Learn More</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {(!events || events.length === 0) && (
                    <div className="text-center py-20 text-muted-foreground">
                        <p className="text-xl">No upcoming events scheduled at this time.</p>
                        <p className="mt-2">Check back soon!</p>
                    </div>
                )}
            </section>
        </div>
    )
}
