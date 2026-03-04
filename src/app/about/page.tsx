import { Section } from "@/components/ui/Section"
import { StaffCard } from "@/components/ui/StaffCard"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

const staffMembers = [
    {
        name: "Rene Huellstrung",
        role: "Interim Executive Director",
        email: "reneh@svbc.ab.ca",
        phone: "780.458.3777",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" // Placeholder
    },
    {
        name: "Serge Poirier",
        role: "Associate Pastor of Pastoral Care & Outreach",
        email: "pastorserge@svbc.ab.ca",
        phone: "780.458.3777",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" // Placeholder
    },
    {
        name: "Justin Morris",
        role: "Youth Pastor",
        email: "pastorjustin@svbc.ab.ca",
        phone: "780.458.3777",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop" // Placeholder
    },
    {
        name: "Covie Hudson",
        role: "Children's Director",
        email: "childrensdirector@svbc.ab.ca",
        phone: "780.458.3777",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" // Placeholder
    },
    {
        name: "Gayleen Davis",
        role: "Church Secretary/Administrator",
        email: "admin@svbc.ab.ca",
        phone: "780.458.3777",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop" // Placeholder
    },
    {
        name: "Tatiana Gartner",
        role: "Receptionist/Admin Assistant",
        email: "church@svbc.ab.ca",
        phone: "780.458.3777",
        image: "https://images.unsplash.com/photo-1598550832236-0f1e717e4f9b?q=80&w=1942&auto=format&fit=crop" // Placeholder
    }
]

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Section background="primary" className="text-center py-20">
                <h1 className="text-4xl font-bold mb-4">Who We Are</h1>
                <p className="text-xl opacity-90 max-w-2xl mx-auto">
                    A community dedicated to glorifying God by making disciples of Jesus Christ.
                </p>
            </Section>

            <Section id="beliefs">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Our Beliefs</h2>
                        <p className="text-muted-foreground text-lg">
                            We strive to be a church that loves God and serves others, so that lives are changed!
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-muted p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                            <p>To glorify God by making Disciples of Jesus Christ at home and internationally.</p>
                        </div>
                        <div className="bg-muted p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-2">Core Values</h3>
                            <ul className="list-disc list-inside space-y-1">
                                <li>A personal relationship with Christ</li>
                                <li>God’s Word as the ultimate authority</li>
                                <li>Unity within the fellowship of believers</li>
                                <li>Authentic, caring relationships</li>
                                <li>Prayer</li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        <Button variant="outline" asChild>
                            <a href="https://dq5pwpg1q8ru0.cloudfront.net/2020/10/16/03/43/15/a1b4e28c-a4b9-4ac4-90d2-358be7a74d3e/SVBC%20Statement%20of%20Faith.pdf" target="_blank" rel="noopener noreferrer">
                                <FileText className="mr-2 h-4 w-4" /> Statement of Faith
                            </a>
                        </Button>
                        <Button variant="outline" asChild>
                            <a href="https://nabconference.org/us/#our_beliefs" target="_blank" rel="noopener noreferrer">
                                <FileText className="mr-2 h-4 w-4" /> NAB Beliefs
                            </a>
                        </Button>
                    </div>
                </div>
            </Section>

            <Section background="muted" id="staff">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
                    <p className="text-muted-foreground">The people serving our community behind the scenes.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {staffMembers.map((staff) => (
                        <StaffCard key={staff.name} {...staff} />
                    ))}
                </div>
            </Section>

            <Section id="history">
                <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-center">Our History</h2>
                    <p>
                        SVBC, St. Albert, Alberta is a living witness to the concern of Christians living here to minister to the spiritual needs of their community. McKernan Baptist Church, through its pastor, Don Richter, provided the initial impetus to establish a Baptist and evangelical witness.
                    </p>
                    <p>
                        The initial meeting was called in November, 1975 in the home of Dr. and Mrs. Harvey Albrecht. The same month St. Albert was adopted as a church extension project of the ABA (Alberta Baptist Association), with denominational approval given on February 21, 1976.
                    </p>
                    <p>
                        The Sunday services began April 4, 1976. Paul Kane High School was secured for these times of worship and instruction. Mr. Larry Hannah provided direction in getting the Sunday School started. The first Sunday 79 people attended!
                    </p>
                </div>
            </Section>
        </div>
    )
}
