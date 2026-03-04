import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

interface MinistryCardProps {
    title: string
    description: string
    image?: string
    slug: string
}

export function MinistryCard({ title, description, image, slug }: MinistryCardProps) {
    return (
        <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow">
            <Link href={`/ministries/${slug}`} className="aspect-video w-full bg-muted relative block overflow-hidden">
                {image ? (
                    <Image
                        src={image}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform hover:scale-105 duration-500"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        Video/Image Placeholder
                    </div>
                )}
            </Link>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription className="line-clamp-2">{description}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
                <Button asChild variant="ghost" className="w-full justify-between group">
                    <Link href={`/ministries/${slug}`}>
                        Learn More
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
