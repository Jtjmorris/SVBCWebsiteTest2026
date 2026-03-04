import { Sermon } from "@/types/sermon"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, PlayCircle, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface SermonCardProps {
    sermon: Sermon
}

export function SermonCard({ sermon }: SermonCardProps) {
    return (
        <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative aspect-video w-full overflow-hidden bg-muted">
                <Image
                    src={sermon.thumbnail}
                    alt={sermon.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <PlayCircle className="w-16 h-16 text-white drop-shadow-lg" />
                </div>
                <div className="absolute bottom-2 right-2">
                    <Badge variant="secondary" className="bg-black/60 text-white backdrop-blur-sm border-0">
                        {sermon.duration}
                    </Badge>
                </div>
            </div>

            <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start gap-2 mb-2">
                    <Badge variant="outline" className="text-xs font-normal border-primary/20 text-primary bg-primary/5">
                        {sermon.series}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(sermon.date).toLocaleDateString()}
                    </div>
                </div>
                <h3 className="font-bold text-xl leading-tight line-clamp-2">{sermon.title}</h3>
            </CardHeader>

            <CardContent className="p-4 pt-0 flex-grow">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {sermon.scripture}
                </p>
                <div className="flex items-center text-sm font-medium text-foreground/80">
                    <User className="w-4 h-4 mr-2 text-primary" />
                    {sermon.speaker}
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <Button asChild className="w-full bg-primary/5 text-primary hover:bg-primary hover:text-white border border-primary/10">
                    <Link href={`/sermons/${sermon.id}`}>Watch Now</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
