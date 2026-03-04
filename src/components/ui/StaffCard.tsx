import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Mail, Phone } from "lucide-react"
import Image from "next/image"

interface StaffCardProps {
    name: string
    role: string
    image?: string
    email?: string
    phone?: string
}

export function StaffCard({ name, role, image, email, phone }: StaffCardProps) {
    return (
        <Card className="text-center overflow-hidden">
            <div className="aspect-square w-full relative bg-muted">
                {image ? (
                    <Image
                        src={image}
                        alt={name}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        No Image
                    </div>
                )}
            </div>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{role}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center gap-2">
                {email && (
                    <Button size="icon" variant="ghost" asChild>
                        <a href={`mailto:${email}`} title="Email">
                            <Mail className="h-4 w-4" />
                        </a>
                    </Button>
                )}
                {phone && (
                    <Button size="icon" variant="ghost" asChild>
                        <a href={`tel:${phone.replace(/[^\d]/g, '')}`} title="Call">
                            <Phone className="h-4 w-4" />
                        </a>
                    </Button>
                )}
            </CardContent>
        </Card>
    )
}
