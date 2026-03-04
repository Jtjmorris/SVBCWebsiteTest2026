import { Shirt, Music, Coffee, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EditableText } from "@/components/content/EditableText"

const icons = {
    casual: Shirt,
    worship: Music,
    coffee: Coffee,
    time: Clock
}

interface WhatToExpectProps {
    sectionData: Record<string, string>
}

export function WhatToExpect({ sectionData }: WhatToExpectProps) {
    return (
        <section className="py-16 bg-muted/30">
            <div className="container px-4">
                <EditableText
                    pageSlug="visit"
                    sectionId="whatToExpect"
                    contentKey="mainTitle"
                    defaultValue={sectionData.mainTitle || "What to Expect"}
                    as="h2"
                    className="text-3xl font-bold text-center mb-12"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Item 1: Casual */}
                    <Card className="border-none shadow-sm bg-background/50 backdrop-blur">
                        <CardHeader className="text-center pb-2">
                            <div className="mx-auto bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 text-primary">
                                <Shirt className="w-8 h-8" />
                            </div>
                            <EditableText
                                pageSlug="visit"
                                sectionId="whatToExpect"
                                contentKey="item1Title"
                                defaultValue={sectionData.item1Title || "Come As You Are"}
                                as="h3"
                                className="text-lg font-semibold leading-none tracking-tight justify-center flex mb-2"
                            />
                        </CardHeader>
                        <CardContent className="text-center text-muted-foreground text-sm">
                            <EditableText
                                pageSlug="visit"
                                sectionId="whatToExpect"
                                contentKey="item1Desc"
                                defaultValue={sectionData.item1Desc || "There is no dress code here. You'll see everything from jeans and t-shirts to suits and ties. Wear what makes you comfortable."}
                                as="p"
                                multiline
                            />
                        </CardContent>
                    </Card>

                    {/* Item 2: Worship */}
                    <Card className="border-none shadow-sm bg-background/50 backdrop-blur">
                        <CardHeader className="text-center pb-2">
                            <div className="mx-auto bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 text-primary">
                                <Music className="w-8 h-8" />
                            </div>
                            <EditableText
                                pageSlug="visit"
                                sectionId="whatToExpect"
                                contentKey="item2Title"
                                defaultValue={sectionData.item2Title || "Contemporary Worship"}
                                as="h3"
                                className="text-lg font-semibold leading-none tracking-tight justify-center flex mb-2"
                            />
                        </CardHeader>
                        <CardContent className="text-center text-muted-foreground text-sm">
                            <EditableText
                                pageSlug="visit"
                                sectionId="whatToExpect"
                                contentKey="item2Desc"
                                defaultValue={sectionData.item2Desc || "Our worship team leads us in a mix of modern songs and timeless hymns. We love to sing and celebrate Jesus."}
                                as="p"
                                multiline
                            />
                        </CardContent>
                    </Card>

                    {/* Item 3: Coffee */}
                    <Card className="border-none shadow-sm bg-background/50 backdrop-blur">
                        <CardHeader className="text-center pb-2">
                            <div className="mx-auto bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 text-primary">
                                <Coffee className="w-8 h-8" />
                            </div>
                            <EditableText
                                pageSlug="visit"
                                sectionId="whatToExpect"
                                contentKey="item3Title"
                                defaultValue={sectionData.item3Title || "Coffee & Connection"}
                                as="h3"
                                className="text-lg font-semibold leading-none tracking-tight justify-center flex mb-2"
                            />
                        </CardHeader>
                        <CardContent className="text-center text-muted-foreground text-sm">
                            <EditableText
                                pageSlug="visit"
                                sectionId="whatToExpect"
                                contentKey="item3Desc"
                                defaultValue={sectionData.item3Desc || "Come early (9:45 AM) for free coffee and treats in the foyer. It's a great way to meet people before the service starts."}
                                as="p"
                                multiline
                            />
                        </CardContent>
                    </Card>

                    {/* Item 4: Time */}
                    <Card className="border-none shadow-sm bg-background/50 backdrop-blur">
                        <CardHeader className="text-center pb-2">
                            <div className="mx-auto bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 text-primary">
                                <Clock className="w-8 h-8" />
                            </div>
                            <EditableText
                                pageSlug="visit"
                                sectionId="whatToExpect"
                                contentKey="item4Title"
                                defaultValue={sectionData.item4Title || "75 Minute Service"}
                                as="h3"
                                className="text-lg font-semibold leading-none tracking-tight justify-center flex mb-2"
                            />
                        </CardHeader>
                        <CardContent className="text-center text-muted-foreground text-sm">
                            <EditableText
                                pageSlug="visit"
                                sectionId="whatToExpect"
                                contentKey="item4Desc"
                                defaultValue={sectionData.item4Desc || "We respect your time. Our services typically run from 10:00 AM to 11:15 AM, including music, prayer, and teaching."}
                                as="p"
                                multiline
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
