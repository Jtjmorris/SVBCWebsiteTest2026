import Link from "next/link"
import { getNavigationItems } from "@/lib/navigation"
import { getSettings } from "@/lib/settings"

export async function Footer() {
    const { data: items } = await getNavigationItems()
    const { data: settings } = await getSettings()
    const footerItems = items?.filter(i => i.type === "FOOTER") || []

    const siteTitle = settings?.siteTitle || "Sturgeon Valley Baptist Church"
    const address = settings?.contactAddress || "51 Woodlands Rd, St. Albert, AB"
    const phone = settings?.contactPhone || "780.458.3777"
    const email = settings?.contactEmail || "office@svbc.ab.ca"

    return (
        <footer className="w-full border-t bg-background py-12">
            <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                    <span className="text-xl font-bold tracking-tight text-primary">{siteTitle}</span>
                    <p className="mt-4 text-sm text-muted-foreground">
                        We are a fellowship of people who have a personal relationship with Jesus Christ.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold mb-4">Contact</h3>
                    <address className="not-italic text-sm text-muted-foreground space-y-2">
                        <p>{address}</p>
                        <p><a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className="hover:text-primary transition-colors">{phone}</a></p>
                        <p><a href={`mailto:${email}`} className="hover:text-primary transition-colors">{email}</a></p>
                    </address>
                </div>

                <div>
                    <h3 className="font-semibold mb-4">Service Times</h3>
                    <div className="text-sm text-muted-foreground space-y-2">
                        <p><strong>Sundays:</strong> 10:00 AM</p>
                        <p>In-person & Online</p>
                        <p className="text-xs mt-2">ASL Interpreted</p>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold mb-4">Quick Links</h3>
                    <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
                        {footerItems.map((item) => (
                            <Link key={item.id} href={item.url} className="hover:text-primary transition-colors">{item.label}</Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className="container mt-12 pt-8 border-t">
                <p className="text-center text-xs text-muted-foreground">
                    © {new Date().getFullYear()} {siteTitle}. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
