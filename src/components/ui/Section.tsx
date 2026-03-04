"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface SectionProps {
    children: React.ReactNode
    className?: string
    id?: string
    background?: "default" | "muted" | "primary"
}

export function Section({
    children,
    className,
    id,
    background = "default"
}: SectionProps) {
    return (
        <section
            id={id}
            className={cn(
                "py-16 md:py-24 overflow-hidden",
                background === "muted" && "bg-muted",
                background === "primary" && "bg-primary text-primary-foreground",
                className
            )}
        >
            <motion.div
                className="container mx-auto px-4 md:px-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </section>
    )
}
