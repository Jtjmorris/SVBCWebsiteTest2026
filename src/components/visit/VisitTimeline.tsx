import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Coffee, Music, BookOpen } from "lucide-react"
import { EditableText } from "@/components/content/EditableText"

interface VisitTimelineProps {
    sectionData: Record<string, string>
}

export function VisitTimeline({ sectionData }: VisitTimelineProps) {
    return (
        <section>
            <EditableText
                pageSlug="visit"
                sectionId="timeline"
                contentKey="mainTitle"
                defaultValue={sectionData.mainTitle || "Sunday Morning Timeline"}
                as="h2"
                className="text-3xl font-bold mb-8"
            />
            <div className="space-y-8 border-l-2 border-primary/20 pl-8 ml-4">
                {/* Item 1 */}
                <div className="relative">
                    <span className="absolute -left-[41px] bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center font-bold text-sm">1</span>
                    <div className="flex items-center gap-2 mb-2">
                        <EditableText
                            pageSlug="visit"
                            sectionId="timeline"
                            contentKey="item1Time"
                            defaultValue={sectionData.item1Time || "9:45 AM"}
                            as="span"
                            className="text-xl font-bold"
                        />
                        <span className="text-xl font-bold">-</span>
                        <EditableText
                            pageSlug="visit"
                            sectionId="timeline"
                            contentKey="item1Title"
                            defaultValue={sectionData.item1Title || "Coffee & Connection"}
                            as="h3"
                            className="text-xl font-bold"
                        />
                    </div>
                    <EditableText
                        pageSlug="visit"
                        sectionId="timeline"
                        contentKey="item1Desc"
                        defaultValue={sectionData.item1Desc || "Come a few minutes early to grab a free coffee and meet some friendly faces in our foyer."}
                        as="p"
                        className="text-muted-foreground"
                        multiline
                    />
                </div>

                {/* Item 2 */}
                <div className="relative">
                    <span className="absolute -left-[41px] bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center font-bold text-sm">2</span>
                    <div className="flex items-center gap-2 mb-2">
                        <EditableText
                            pageSlug="visit"
                            sectionId="timeline"
                            contentKey="item2Time"
                            defaultValue={sectionData.item2Time || "10:00 AM"}
                            as="span"
                            className="text-xl font-bold"
                        />
                        <span className="text-xl font-bold">-</span>
                        <EditableText
                            pageSlug="visit"
                            sectionId="timeline"
                            contentKey="item2Title"
                            defaultValue={sectionData.item2Title || "Worship Service"}
                            as="h3"
                            className="text-xl font-bold"
                        />
                    </div>
                    <EditableText
                        pageSlug="visit"
                        sectionId="timeline"
                        contentKey="item2Desc"
                        defaultValue={sectionData.item2Desc || "Our service lasts about 75 minutes. We sing contemporary worship songs and hear a practical message from the Bible."}
                        as="p"
                        className="text-muted-foreground"
                        multiline
                    />
                </div>

                {/* Item 3 */}
                <div className="relative">
                    <span className="absolute -left-[41px] bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center font-bold text-sm">3</span>
                    <div className="flex items-center gap-2 mb-2">
                        <EditableText
                            pageSlug="visit"
                            sectionId="timeline"
                            contentKey="item3Time"
                            defaultValue={sectionData.item3Time || "11:15 AM"}
                            as="span"
                            className="text-xl font-bold"
                        />
                        <span className="text-xl font-bold">-</span>
                        <EditableText
                            pageSlug="visit"
                            sectionId="timeline"
                            contentKey="item3Title"
                            defaultValue={sectionData.item3Title || "Dismissal & Prayer"}
                            as="h3"
                            className="text-xl font-bold"
                        />
                    </div>
                    <EditableText
                        pageSlug="visit"
                        sectionId="timeline"
                        contentKey="item3Desc"
                        defaultValue={sectionData.item3Desc || "Use this time to pray, connect with others, or pick up your kids from their programs."}
                        as="p"
                        className="text-muted-foreground"
                        multiline
                    />
                </div>
            </div>
        </section>
    )
}
