import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface MinistryCardProps {
    title: string
    description: string
    imageSrc: string
    href: string
}

export function MinistryCard({ title, description, imageSrc, href }: MinistryCardProps) {
    return (
        <Card className="overflow-hidden flex flex-col h-full transition-all hover:shadow-md">
            <div className="relative h-48 w-full bg-muted">
                {/* Placeholder for image */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary">
                    {title} Image
                </div>
            </div>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="text-muted-foreground">{description}</p>
            </CardContent>
            <CardFooter>
                <Button asChild variant="outline" className="w-full">
                    <Link href={href}>Learn More</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
