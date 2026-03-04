import { Section } from "@/components/ui/Section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, MapPin, Calendar, Users } from "lucide-react"
import Image from "next/image"

const theme = {
    colors: {
        primary: "from-fuchsia-500 to-cyan-500", // Main gradient
        accent: "text-fuchsia-400", // Standard accent text
        background: "bg-zinc-950", // Page background
        surface: "bg-zinc-900/50", // Card/Section background
        border: "border-zinc-800", // Default borders
        hoverBorder: "hover:border-fuchsia-500/50", // Interactive borders
    },
    effects: {
        glow: "drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]", // Subtle glow
        gradientOverlay: "opacity-20", // Background gradient intensity
    }
}

export default function YouthPage() {
    return (
        <div className={`min-h-screen ${theme.colors.background} text-white font-sans selection:bg-fuchsia-500 selection:text-white`}>
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden pt-14">
                {/* Background Gradients - Controllable via opacity in theme */}
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <div
                        className={`relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] ${theme.effects.gradientOverlay} sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]`}
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>

                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        {/* CSS/SVG Logo Implementation since image generation is unavailable */}
                        <div className="mb-8 flex justify-center">
                            <div className={`relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center ${theme.effects.glow}`}>
                                <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
                                    <defs>
                                        <linearGradient id="logo-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#d946ef" /> {/* Fuchsia-500 */}
                                            <stop offset="100%" stopColor="#06b6d4" /> {/* Cyan-500 */}
                                        </linearGradient>
                                    </defs>
                                    {/* 'UP' text-like shape */}
                                    <path
                                        d="M70 140 L70 60 L100 60 L100 140 Z M70 60 L40 60 L85 10 L130 60 L100 60"
                                        fill="url(#logo-gradient)"

                                    />
                                    {/* Arrow pointing UP */}
                                    <path
                                        d="M60 160 L60 80 L30 80 L80 10 L130 80 L100 80 L100 160 Z"
                                        fill="url(#logo-gradient)"
                                        stroke="white"
                                        strokeWidth="2"
                                        className="drop-shadow-lg"
                                    />
                                    <text x="110" y="150" fontFamily="sans-serif" fontSize="100" fontWeight="bold" fill="white" className="drop-shadow-lg">UP</text>
                                </svg>
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                            UP <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.colors.primary}`}>Student Ministries</span>
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-zinc-300">
                            Connecting students in grades 7-12 with faith, community, and purpose.
                            A place to belong, believe, and become.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Button asChild size="lg" className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white border-0 transition-all duration-300 hover:shadow-[0_0_20px_rgba(192,38,211,0.4)]">
                                <Link href="#visit">Plan A Visit</Link>
                            </Button>
                            <Link href="/contact" className="text-sm font-semibold leading-6 text-white hover:text-cyan-400 transition-colors">
                                Contact Leaders <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Gradient */}
                <div
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    aria-hidden="true"
                >
                    <div
                        className={`relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] ${theme.effects.gradientOverlay} sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]`}
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
            </div>

            {/* Info Cards Section */}
            <Section className={`py-20 ${theme.colors.surface}`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                    {/* Card 1: Time */}
                    <div className={`${theme.colors.background} border ${theme.colors.border} p-8 rounded-2xl ${theme.colors.hoverBorder} transition-all duration-300 group`}>
                        <div className={`h-12 w-12 bg-zinc-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-fuchsia-500/20 transition-colors`}>
                            <Calendar className={`w-6 h-6 ${theme.colors.accent}`} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">When</h3>
                        <p className="text-zinc-400">Every Wednesday Night</p>
                        <p className="text-zinc-400">6:30 PM - 8:30 PM</p>
                    </div>

                    {/* Card 2: Location */}
                    <div className={`${theme.colors.background} border ${theme.colors.border} p-8 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 group`}>
                        <div className={`h-12 w-12 bg-zinc-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-colors`}>
                            <MapPin className="w-6 h-6 text-cyan-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Where</h3>
                        <p className="text-zinc-400">SVBC Youth Room</p>
                        <p className="text-zinc-400">Enter through the side doors</p>
                    </div>

                    {/* Card 3: Who */}
                    <div className={`${theme.colors.background} border ${theme.colors.border} p-8 rounded-2xl hover:border-lime-500/50 transition-all duration-300 group`}>
                        <div className={`h-12 w-12 bg-zinc-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-lime-500/20 transition-colors`}>
                            <Users className="w-6 h-6 text-lime-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Who</h3>
                        <p className="text-zinc-400">Grades 7 - 12</p>
                        <p className="text-zinc-400">All students welcome!</p>
                    </div>
                </div>
            </Section>

            {/* About / Vibe Section */}
            <Section className={`py-24 ${theme.colors.background}`}>
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">Not Just Another <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.colors.primary}`}>Wednesday Night</span></h2>
                    <div className="prose prose-invert prose-lg mx-auto text-zinc-300">
                        <p className="mb-6">
                            UP Student Ministries is more than just a weekly hangout. It's a community where you can be yourself, ask the hard questions, and find real friends who have your back.
                        </p>
                        <p>
                            Each week features high-energy games, relevant teaching that actually matters to your life, and small group time where you can talk about what's really going on. No judgment, just real people pursuing Jesus together.
                        </p>
                    </div>
                </div>
            </Section>

            {/* Footer Navigation */}
            <div className="py-12 border-t border-zinc-900 text-center">
                <Link href="/ministries" className="inline-flex items-center text-zinc-500 hover:text-white transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Ministries
                </Link>
            </div>
        </div>
    )
}
