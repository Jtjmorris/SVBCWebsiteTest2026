import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
    return (
        <section className="relative h-[80vh] w-full overflow-hidden bg-black/60 flex items-center justify-center text-center">
            {/* Background - using a gradient for now, serves as video placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-accent/40 z-0" />

            {/* Content */}
            <div className="relative z-10 container px-4 space-y-6">
                <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
                    Welcome Home
                </h1>
                <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light">
                    A community of believers in Sturgeon Valley, dedicated to authentic faith and connection.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button asChild size="lg" className="text-lg h-14 px-8 bg-accent text-accent-foreground hover:bg-accent/90">
                        <Link href="/visit">Plan Your Visit</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="text-lg h-14 px-8 border-white text-white hover:bg-white/20 hover:text-white backdrop-blur-sm">
                        <Link href="/sermons">Watch Online</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
