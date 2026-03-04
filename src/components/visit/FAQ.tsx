import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { EditableText } from "@/components/content/EditableText"

interface FAQProps {
    sectionData: Record<string, string>
}

export function FAQ({ sectionData }: FAQProps) {
    return (
        <section className="py-16 bg-muted/10">
            <div className="container px-4 max-w-3xl">
                <EditableText
                    pageSlug="visit"
                    sectionId="faq"
                    contentKey="title"
                    defaultValue={sectionData.title || "Frequently Asked Questions"}
                    as="h2"
                    className="text-3xl font-bold text-center mb-10"
                />

                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-0">
                        <AccordionTrigger className="text-left font-semibold">
                            <EditableText
                                pageSlug="visit"
                                sectionId="faq"
                                contentKey="q1"
                                defaultValue={sectionData.q1 || "Where do I park?"}
                                as="span"
                            />
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                            <EditableText
                                pageSlug="visit"
                                sectionId="faq"
                                contentKey="a1"
                                defaultValue={sectionData.a1 || "We have a large parking lot directly in front of the church building. There are designated spots for visitors and seniors close to the main entrance."}
                                as="p"
                                multiline
                            />
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-left font-semibold">
                            <EditableText
                                pageSlug="visit"
                                sectionId="faq"
                                contentKey="q2"
                                defaultValue={sectionData.q2 || "Is the building wheelchair accessible?"}
                                as="span"
                            />
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                            <EditableText
                                pageSlug="visit"
                                sectionId="faq"
                                contentKey="a2"
                                defaultValue={sectionData.a2 || "Yes! Our entire facility is on one level with no stairs required to access the sanctuary, bathrooms, or fellowship hall."}
                                as="p"
                                multiline
                            />
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger className="text-left font-semibold">
                            <EditableText
                                pageSlug="visit"
                                sectionId="faq"
                                contentKey="q3"
                                defaultValue={sectionData.q3 || "Do you have programs for my kids?"}
                                as="span"
                            />
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                            <EditableText
                                pageSlug="visit"
                                sectionId="faq"
                                contentKey="a3"
                                defaultValue={sectionData.a3 || "Absolutely. We have a fully staffed nursery for infants/toddlers, and 'SVBC Kids' programs for ages 3 up to Grade 6 during the service."}
                                as="p"
                                multiline
                            />
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger className="text-left font-semibold">
                            <EditableText
                                pageSlug="visit"
                                sectionId="faq"
                                contentKey="q4"
                                defaultValue={sectionData.q4 || "How can I get connected?"}
                                as="span"
                            />
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                            <EditableText
                                pageSlug="visit"
                                sectionId="faq"
                                contentKey="a4"
                                defaultValue={sectionData.a4 || "The best way is to fill out a Connection Card on Sunday, or visit our 'Ministries' page to find a small group that fits your life stage."}
                                as="p"
                                multiline
                            />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </section>
    )
}
