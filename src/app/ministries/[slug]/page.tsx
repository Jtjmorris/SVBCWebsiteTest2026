import { Section } from "@/components/ui/Section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// This is a mock database of ministry content. 
// In a real app, this would come from a CMS or database.
const ministryData: Record<string, { title: string; description: string; content: string }> = {
    "kids": {
        title: "SVBC Kids",
        description: "A safe and fun environment for children to learn about Jesus.",
        content: `
            <p><strong>Upcoming Events:</strong> Kids' Church Training Meeting - Saturday, February 21, 2026 at SVBC Fireside Room.</p>
            <p>We are dedicated to partnering with parents to help children grow in their relationship with Jesus. Our Kids Ministry provides a safe, fun, and engaging environment where children can learn biblical truths.</p>
            <h3>What to Expect</h3>
            <ul>
                <li>Secure check-in system</li>
                <li>Age-appropriate bible teaching</li>
                <li>Fun games and crafts</li>
                <li>Caring and background-checked volunteers</li>
            </ul>
        `
    },
    "youth": {
        title: "Youth",
        description: "Connecting students in grades 7-12 with faith and community.",
        content: `
            <p><strong>Join Us at SVBC Youth Group!</strong></p>
            <p>Hey there! Looking for a fun and meaningful way to spend your Wednesday evenings? Come check out SVBC Youth Group! It’s a place to hang out, make awesome new friends, and grow in your faith. Whether you’ve been part of a youth group before or it’s right for you, YOU are welcome!</p>
            <p><strong>When:</strong> Every Wednesday, 6:30-8:30 PM</p>
            <p><strong>Where:</strong> SVBC</p>
            <p><strong>Who:</strong> Grades 7-12</p>
            <p>Bring a friend or come solo — we can’t wait to see you there!</p>
        `
    },
    "worship": {
        title: "Worship Ministry",
        description: "Leading the congregation in praise and worship.",
        content: `
            <p>Our Worship Ministry exists to lead the congregation in glorifying God through music and creative arts. We believe that worship is a lifestyle, but coming together as a body of believers is a special time to focus our hearts on Him.</p>
            <p>If you are a musician or vocalist and are interested in serving, please contact the church office.</p>
        `
    },
    // Default fallback for others
}

interface PageProps {
    params: Promise<{ slug: string }>
}

export default async function MinistryPage({ params }: PageProps) {
    const { slug } = await params
    const ministry = ministryData[slug] || {
        title: slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' '),
        description: "Connecting with our community.",
        content: "<p>More information coming soon.</p>"
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Section background="muted" className="py-12">
                <div className="mb-4">
                    <Button variant="ghost" asChild>
                        <Link href="/ministries"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Ministries</Link>
                    </Button>
                </div>
                <h1 className="text-4xl font-bold mb-4">{ministry.title}</h1>
                <p className="text-xl opacity-90 max-w-2xl">{ministry.description}</p>
            </Section>

            <Section>
                <div
                    className="prose prose-lg max-w-3xl mx-auto dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: ministry.content }}
                />
            </Section>
        </div>
    )
}
