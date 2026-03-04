import { Group } from "@prisma/client"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, User, Users } from "lucide-react"

interface GroupCardProps {
    group: Group
}

export function GroupCard({ group }: GroupCardProps) {
    return (
        <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="text-xs font-normal border-primary/20 text-primary bg-primary/5">
                        {group.type}
                    </Badge>
                </div>
                <h3 className="font-bold text-xl">{group.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{group.description}</p>
            </CardHeader>

            <CardContent className="flex-grow space-y-3 text-sm text-foreground/80">
                <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-primary" />
                    {group.day}
                </div>
                <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-primary" />
                    {group.time}
                </div>
                <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-primary" />
                    {group.location}
                </div>
                <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-primary" />
                    Led by {group.leader}
                </div>
            </CardContent>

            <CardFooter>
                <Button className="w-full gap-2">
                    <Users className="w-4 h-4" />
                    Request to Join
                </Button>
            </CardFooter>
        </Card>
    )
}
