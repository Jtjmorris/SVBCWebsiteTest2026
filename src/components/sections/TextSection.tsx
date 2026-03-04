import { Section } from "@/components/ui/Section"
import { TextSectionData } from "@/types/page-sections"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export function TextSection({ data }: { data: TextSectionData }) {
    return (
        <Section className={cn("py-12", data.className)}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="prose prose-lg dark:prose-invert max-w-4xl mx-auto"
                dangerouslySetInnerHTML={{ __html: data.content }}
            />
        </Section>
    )
}
