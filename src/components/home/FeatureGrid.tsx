import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Users, Calendar, Video, MapPin } from "lucide-react"

const features = [
    {
        title: "New Here?",
        description: "Plan your first visit and see what to expect.",
        href: "/visit",
        icon: MapPin,
        color: "text-blue-500",
    },
    {
        title: "Upcoming Events",
        description: "Join us for community gatherings and special services.",
        href: "/events",
        icon: Calendar,
        color: "text-orange-500",
    },
    {
        title: "Ministries",
        description: "Find a group to connect with and grow in faith.",
        href: "/ministries",
        icon: Users,
        color: "text-green-500",
    },
    {
        title: "Watch Online",
        description: "Stream live services or watch past messages.",
        href: "/sermons",
        icon: Video,
        color: "text-red-500",
    },
]

export function FeatureGrid() {
    return (
        <section className="py-16 md:py-24 bg-muted/30">
            <div className="container px-4">
                <h2 className="text-3xl font-bold text-center mb-12 tracking-tight">Get Connected</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => {
                        const Icon = feature.icon
                        return (
                            <Link key={feature.title} href={feature.href} className="group">
                                <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
                                    <CardHeader>
                                        <div className={`p-2 w-fit rounded-lg bg-background mb-4 shadow-sm group-hover:scale-110 transition-transform`}>
                                            <Icon className={`h-6 w-6 ${feature.color}`} />
                                        </div>
                                        <CardTitle className="group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription>{feature.description}</CardDescription>
                                    </CardContent>
                                </Card>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
