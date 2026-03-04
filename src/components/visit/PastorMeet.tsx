import Image from "next/image"
import { EditableText } from "@/components/content/EditableText"

interface PastorMeetProps {
    sectionData: Record<string, string>
}

export function PastorMeet({ sectionData }: PastorMeetProps) {
    return (
        <section className="py-16">
            <div className="container px-4 text-center">
                <EditableText
                    pageSlug="visit"
                    sectionId="pastors"
                    contentKey="mainTitle"
                    defaultValue={sectionData.mainTitle || "Meet Our Leadership"}
                    as="h2"
                    className="text-3xl font-bold mb-4"
                />
                <EditableText
                    pageSlug="visit"
                    sectionId="pastors"
                    contentKey="description"
                    defaultValue={sectionData.description || "Our team is here to serve you. Feel free to introduce yourself to any of us on Sunday morning!"}
                    as="p"
                    className="text-muted-foreground max-w-2xl mx-auto mb-12"
                    multiline
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    {/* Pastor 1 */}
                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-muted shadow-lg">
                            <Image
                                src={sectionData.pastor1Image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop"}
                                alt="Pastor 1"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <EditableText
                                pageSlug="visit"
                                sectionId="pastors"
                                contentKey="pastor1Name"
                                defaultValue={sectionData.pastor1Name || "Rev. Serge Poirier"}
                                as="h3"
                                className="text-lg font-bold"
                            />
                            <EditableText
                                pageSlug="visit"
                                sectionId="pastors"
                                contentKey="pastor1Role"
                                defaultValue={sectionData.pastor1Role || "Senior Pastor"}
                                as="p"
                                className="text-sm text-primary font-medium"
                            />
                        </div>
                    </div>

                    {/* Pastor 2 */}
                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-muted shadow-lg">
                            <Image
                                src={sectionData.pastor2Image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop"}
                                alt="Pastor 2"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <EditableText
                                pageSlug="visit"
                                sectionId="pastors"
                                contentKey="pastor2Name"
                                defaultValue={sectionData.pastor2Name || "Pastor Justin Morris"}
                                as="h3"
                                className="text-lg font-bold"
                            />
                            <EditableText
                                pageSlug="visit"
                                sectionId="pastors"
                                contentKey="pastor2Role"
                                defaultValue={sectionData.pastor2Role || "Associate Pastor of Youth"}
                                as="p"
                                className="text-sm text-primary font-medium"
                            />
                        </div>
                    </div>

                    {/* Pastor 3 */}
                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-muted shadow-lg">
                            <Image
                                src={sectionData.pastor3Image || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop"}
                                alt="Pastor 3"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <EditableText
                                pageSlug="visit"
                                sectionId="pastors"
                                contentKey="pastor3Name"
                                defaultValue={sectionData.pastor3Name || "Gayleen Davis"}
                                as="h3"
                                className="text-lg font-bold"
                            />
                            <EditableText
                                pageSlug="visit"
                                sectionId="pastors"
                                contentKey="pastor3Role"
                                defaultValue={sectionData.pastor3Role || "Children's Ministry Director"}
                                as="p"
                                className="text-sm text-primary font-medium"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
