import { Section } from "@/components/ui/Section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Section background="primary" className="text-center py-20">
                <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                <p className="text-xl opacity-90 max-w-2xl mx-auto">
                    We'd love to hear from you. Reach out with any questions or prayer requests.
                </p>
            </Section>

            <Section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-primary" />
                                    Address
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>51 Woodlands Rd.</p>
                                <p>St. Albert, AB T8N 3Y5</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Phone className="h-5 w-5 text-primary" />
                                    Phone
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p><a href="tel:7804583777" className="hover:underline">780.458.3777</a></p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Mail className="h-5 w-5 text-primary" />
                                    Email
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p><a href="mailto:church@svbc.ab.ca" className="hover:underline">church@svbc.ab.ca</a></p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-primary" />
                                    Office Hours
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p><strong>Mon:</strong> Closed</p>
                                <p><strong>Tue - Fri:</strong> 9:00 AM - 4:30 PM</p>
                                <p><strong>Sat:</strong> Closed</p>
                                <p><strong>Sun:</strong> Service at 10:00 AM</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="h-full min-h-[400px] rounded-xl overflow-hidden shadow-lg border">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2365.156555673038!2d-113.6276706841516!3d53.643720980041695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53a0273760372b2b%3A0xe54792615432c253!2sSturgeon%20Valley%20Baptist%20Church!5e0!3m2!1sen!2sca!4v1676666666666!5m2!1sen!2sca"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Map"
                        />
                    </div>
                </div>
            </Section>
        </div>
    )
}
