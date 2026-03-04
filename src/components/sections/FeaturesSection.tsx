import { Section } from "@/components/ui/Section"
import { FeaturesSectionData } from "@/types/page-sections"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import * as Icons from "lucide-react"
import { motion } from "framer-motion"

export function FeaturesSection({ data }: { data: FeaturesSectionData }) {
    const gridCols = {
        2: "md:grid-cols-2",
        3: "md:grid-cols-3",
        4: "md:grid-cols-2 lg:grid-cols-4"
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    }

    const itemVariant = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    }

    return (
        <Section className="py-16 bg-muted/30">
            {data.title && (
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight">{data.title}</h2>
                </div>
            )}

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className={`grid gap-8 ${gridCols[data.columns || 3]}`}
            >
                {data.items.map((item, idx) => {
                    const IconComponent = item.icon && (Icons as any)[item.icon]
                        ? (Icons as any)[item.icon]
                        : Icons.CheckCircle

                    return (
                        <motion.div key={idx} variants={itemVariant}>
                            <Card className="border-none shadow-sm hover:shadow-md transition-shadow h-full">
                                <CardHeader>
                                    <div className="p-3 w-fit rounded-lg bg-primary/10 text-primary mb-4">
                                        <IconComponent className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-xl">{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{item.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )
                })}
            </motion.div>
        </Section>
    )
}
