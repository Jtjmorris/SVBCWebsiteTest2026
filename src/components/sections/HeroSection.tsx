import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { HeroSectionData } from "@/types/page-sections"
import { motion } from "framer-motion"
import Image from "next/image"

export function HeroSection({ data }: { data: HeroSectionData }) {
    return (
        <div className="relative overflow-hidden w-full">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                {data.image ? (
                    <Image
                        src={data.image}
                        alt="Background"
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                ) : (
                    <div className="w-full h-full bg-primary/10" />
                )}
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="container relative z-10 py-24 md:py-32 flex flex-col justify-center min-h-[50vh]">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={cn(
                        "max-w-3xl space-y-6",
                        data.align === 'center' ? "mx-auto text-center" : "text-left"
                    )}>
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                        {data.title}
                    </h1>

                    {data.subtitle && (
                        <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                            {data.subtitle}
                        </p>
                    )}

                    {data.ctaText && data.ctaLink && (
                        <div className="pt-4">
                            <Button asChild size="lg" className="text-lg px-8">
                                <Link href={data.ctaLink}>{data.ctaText}</Link>
                            </Button>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    )
}
