import { VisitTimeline } from "@/components/visit/VisitTimeline"
import { WhatToExpect } from "@/components/visit/WhatToExpect"
import { PastorMeet } from "@/components/visit/PastorMeet"
import { FAQ } from "@/components/visit/FAQ"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle2, MapPin } from "lucide-react"
import { getPageContent } from "@/lib/content"
import { EditableText } from "@/components/content/EditableText"

export default async function PlanYourVisit() {
    const content = await getPageContent("visit")

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero */}
            <section className="relative bg-primary py-24 text-center text-primary-foreground overflow-hidden">
                <div className="absolute inset-0 bg-black/10 z-0"></div>
                <div className="container px-4 relative z-10">
                    <EditableText
                        pageSlug="visit"
                        sectionId="hero"
                        contentKey="title"
                        defaultValue={content.hero?.title || "Welcome Home"}
                        as="h1"
                        className="text-5xl font-bold mb-6 tracking-tight"
                    />
                    <EditableText
                        pageSlug="visit"
                        sectionId="hero"
                        contentKey="description"
                        defaultValue={content.hero?.description || "We can't wait to meet you! Here is everything you need to know for your first Sunday at SVBC."}
                        as="p"
                        className="text-xl max-w-2xl mx-auto opacity-90 mb-8 font-light"
                        multiline
                    />
                    <div className="flex justify-center gap-4">
                        <Button variant="secondary" size="lg" className="font-semibold">
                            Plan My Visit
                        </Button>
                        <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                            Get Directions
                        </Button>
                    </div>
                </div>
            </section>

            {/* What To Expect */}
            <WhatToExpect sectionData={content.whatToExpect || {}} />

            <div className="container px-4 py-16 grid gap-16 md:grid-cols-[2fr_1fr]">
                <div className="space-y-20">
                    {/* Timeline */}
                    <VisitTimeline sectionData={content.timeline || {}} />

                    {/* Kids Section */}
                    <section id="kids" className="scroll-mt-20">
                        <EditableText
                            pageSlug="visit"
                            sectionId="kids"
                            contentKey="title"
                            defaultValue={content.kids?.title || "SVBC Kids"}
                            as="h2"
                            className="text-3xl font-bold mb-6"
                        />
                        <div className="bg-muted/30 border p-8 rounded-2xl space-y-6">
                            <div className="flex items-start gap-4">
                                <CheckCircle2 className="h-6 w-6 text-primary mt-1 shrink-0" />
                                <div>
                                    <EditableText
                                        pageSlug="visit"
                                        sectionId="kids"
                                        contentKey="checkInTitle"
                                        defaultValue={content.kids?.checkInTitle || "Secure Check-In"}
                                        as="h3"
                                        className="font-semibold text-lg"
                                    />
                                    <EditableText
                                        pageSlug="visit"
                                        sectionId="kids"
                                        contentKey="checkInDesc"
                                        defaultValue={content.kids?.checkInDesc || "We use a digital check-in system to ensure your child's safety. You can pre-register below to save time!"}
                                        as="p"
                                        className="text-muted-foreground"
                                        multiline
                                    />
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <CheckCircle2 className="h-6 w-6 text-primary mt-1 shrink-0" />
                                <div>
                                    <EditableText
                                        pageSlug="visit"
                                        sectionId="kids"
                                        contentKey="learningTitle"
                                        defaultValue={content.kids?.learningTitle || "Age-Appropriate Learning"}
                                        as="h3"
                                        className="font-semibold text-lg"
                                    />
                                    <EditableText
                                        pageSlug="visit"
                                        sectionId="kids"
                                        contentKey="learningDesc"
                                        defaultValue={content.kids?.learningDesc || "From Nursery to Grade 6, every child learns about Jesus in a way they can understand."}
                                        as="p"
                                        className="text-muted-foreground"
                                        multiline
                                    />
                                </div>
                            </div>
                            <Button className="w-full mt-4" variant="outline">Pre-Register My Kids</Button>
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <aside className="space-y-8 h-fit sticky top-24">
                    <div className="bg-card border rounded-xl p-6 shadow-sm">
                        <h3 className="text-xl font-bold mb-4">Location</h3>
                        <div className="aspect-video bg-muted rounded-md mb-4 relative overflow-hidden">
                            {/* Map Placeholder */}
                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-muted">
                                Map View
                            </div>
                        </div>
                        <address className="not-italic text-sm text-muted-foreground space-y-2 mb-4 flex gap-3">
                            <MapPin className="w-5 h-5 text-primary shrink-0" />
                            <div>
                                <p className="font-medium text-foreground">51 Woodlands Rd.</p>
                                <p>St. Albert, AB T8N 3Y5</p>
                            </div>
                        </address>
                        <Button className="w-full" asChild>
                            <a href="https://maps.google.com/?q=51+Woodlands+Rd,+St.+Albert,+AB" target="_blank" rel="noopener noreferrer">
                                Get Directions
                            </a>
                        </Button>
                    </div>
                </aside>
            </div>

            {/* Meet Pastors */}
            <PastorMeet sectionData={content.pastors || {}} />

            {/* FAQ */}
            <FAQ sectionData={content.faq || {}} />

            <section className="py-20 bg-primary text-primary-foreground text-center">
                <div className="container px-4">
                    <EditableText
                        pageSlug="visit"
                        sectionId="cta"
                        contentKey="title"
                        defaultValue={content.cta?.title || "Ready to Visit?"}
                        as="h2"
                        className="text-3xl font-bold mb-6"
                    />
                    <EditableText
                        pageSlug="visit"
                        sectionId="cta"
                        contentKey="description"
                        defaultValue={content.cta?.description || "Let us know you're coming and we'll have a host ready to greet you!"}
                        as="p"
                        className="text-xl opacity-90 mb-8 max-w-2xl mx-auto"
                        multiline
                    />
                    <Button size="lg" variant="secondary" className="font-bold text-lg px-8">
                        Plan My Visit
                    </Button>
                </div>
            </section>
        </div>
    )
}
