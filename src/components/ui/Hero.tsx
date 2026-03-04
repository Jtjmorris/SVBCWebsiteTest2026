"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

interface HeroProps {
    title?: React.ReactNode
    subtitle?: React.ReactNode
    primaryCtaText?: string
    primaryCtaLink?: string
    secondaryCtaText?: string
    secondaryCtaLink?: string
    backgroundImage?: string | React.ReactNode
}

export function Hero({
    title = "Welcome Home",
    subtitle = "Join us this Sunday at 10:00 AM",
    primaryCtaText = "Plan Your Visit",
    primaryCtaLink = "/visit",
    secondaryCtaText = "Watch Online",
    secondaryCtaLink = "/sermons",
    backgroundImage = "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop" // Placeholder
}: HeroProps) {
    return (
        <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center">
            {/* Background Image/Video */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay */}
                {typeof backgroundImage === 'string' ? (
                    <img
                        src={backgroundImage}
                        alt="Church gathering"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    backgroundImage
                )}
            </div>

            {/* Content */}
            <div className="container mx-auto relative z-20 text-center text-white px-4">
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{
                        hidden: { opacity: 0 },
                        show: { opacity: 1, transition: { staggerChildren: 0.2 } }
                    }}
                >
                    <motion.h1
                        variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
                    >
                        {title}
                    </motion.h1>
                    <motion.p
                        variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
                        className="text-xl md:text-2xl font-light mb-10 max-w-2xl mx-auto opacity-90"
                    >
                        {subtitle}
                    </motion.p>
                    <motion.div
                        variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Button asChild size="lg" className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-primary/50">
                            <Link href={primaryCtaLink}>{primaryCtaText}</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full bg-white/10 backdrop-blur-sm border-white/50 text-white hover:bg-white/20 hover:text-white border-2">
                            <Link href={secondaryCtaLink}>{secondaryCtaText}</Link>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
