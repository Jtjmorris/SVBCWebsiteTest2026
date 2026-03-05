import { Hero } from "@/components/ui/Hero"
import { Section } from "@/components/ui/Section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, BookOpen, Users, MapPin } from "lucide-react"
import { getPageContent } from "@/lib/content"
import { EditableText } from "@/components/content/EditableText"
import { EditableImage } from "@/components/content/EditableImage"

export default async function Home() {
  const content = await getPageContent("home")

  return (
    <div className="flex flex-col min-h-screen">
      <Hero
        title={
          <EditableText
            pageSlug="home"
            sectionId="hero"
            contentKey="title"
            defaultValue={content.hero?.title || "Welcome Home"}
            as="span"
          />
        }
        subtitle={
          <EditableText
            pageSlug="home"
            sectionId="hero"
            contentKey="subtitle"
            defaultValue={content.hero?.subtitle || "We are a fellowship of people who have a personal relationship with Jesus Christ. Join us this Sunday at 10:00 AM."}
            as="span"
          />
        }
        primaryCtaText={content.hero?.primaryCtaText || "Plan Your Visit"}
        primaryCtaLink={content.hero?.primaryCtaLink || "/visit"}
        secondaryCtaText={content.hero?.secondaryCtaText || "Watch Live"}
        secondaryCtaLink={content.hero?.secondaryCtaLink || "/sermons"}
        backgroundImage={
          <EditableImage
            pageSlug="home"
            sectionId="hero"
            contentKey="backgroundImage"
            defaultValue={content.hero?.backgroundImage || "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop"}
            alt="Church Hero Banner"
            className="w-full h-full object-cover"
          />
        }
      />

      <Section>
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <EditableText
            pageSlug="home"
            sectionId="welcome"
            contentKey="title"
            defaultValue={content.welcome?.title || "Love God. Serve Others. Change Lives."}
            as="h2"
            className="text-4xl font-heading font-bold tracking-tighter sm:text-5xl md:text-6xl"
          />
          <EditableText
            pageSlug="home"
            sectionId="welcome"
            contentKey="description"
            defaultValue={content.welcome?.description || "We hope that as we introduce ourselves you will feel the warmth of our desire for friendship with you, and the joy of knowing and serving Christ together."}
            as="p"
            className="text-muted-foreground text-lg"
            multiline
          />
          <div className="pt-4">
            <Button variant="link" asChild className="text-lg">
              <Link href={content.welcome?.linkUrl || "/about"}>{content.welcome?.linkText || "Learn more about us →"}</Link>
            </Button>
          </div>
        </div>
      </Section>

      <Section className="py-24 bg-muted/30">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Events - Big Card */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col items-start text-left p-8 md:p-10 bg-card border rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div className="p-4 bg-primary/10 rounded-2xl mb-4 group-hover:scale-105 transition-transform">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <EditableText
              pageSlug="home"
              sectionId="features"
              contentKey="eventsTitle"
              defaultValue={content.features?.eventsTitle || "Events"}
              as="h3"
              className="text-2xl md:text-3xl font-heading font-bold mb-2"
            />
            <EditableText
              pageSlug="home"
              sectionId="features"
              contentKey="eventsDescription"
              defaultValue={content.features?.eventsDescription || "From Youth Group to Seniors' Bible Study, there's something for everyone."}
              as="p"
              className="text-muted-foreground text-lg mb-6 max-w-md"
              multiline
            />
            <Button variant="outline" className="rounded-full mt-auto" asChild>
              <Link href="/events">View Calendar</Link>
            </Button>
          </div>

          {/* Sermons - Tall Card Accent */}
          <div className="col-span-1 flex flex-col items-start text-left p-8 md:p-10 bg-primary text-primary-foreground rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div className="p-4 bg-white/20 rounded-2xl mb-4 group-hover:scale-105 transition-transform">
              <BookOpen className="h-8 w-8 text-primary-foreground" />
            </div>
            <EditableText
              pageSlug="home"
              sectionId="features"
              contentKey="sermonsTitle"
              defaultValue={content.features?.sermonsTitle || "Sermons"}
              as="h3"
              className="text-2xl md:text-3xl font-heading font-bold mb-2"
            />
            <EditableText
              pageSlug="home"
              sectionId="features"
              contentKey="sermonsDescription"
              defaultValue={content.features?.sermonsDescription || "Listen to recent messages from Pastor Serge and the team."}
              as="p"
              className="text-primary-foreground/80 text-lg mb-6"
              multiline
            />
            <Button variant="secondary" className="rounded-full mt-auto hover:scale-105 transition-transform" asChild>
              <Link href="/sermons">Listen Now</Link>
            </Button>
          </div>

          {/* Ministries - Wide Bottom Card */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col md:flex-row items-center justify-between p-8 md:p-10 bg-card border rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 w-full text-center sm:text-left">
              <div className="p-6 bg-primary/10 rounded-2xl group-hover:scale-105 transition-transform shrink-0">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <div className="flex-1 space-y-2">
                <EditableText
                  pageSlug="home"
                  sectionId="features"
                  contentKey="ministriesTitle"
                  defaultValue={content.features?.ministriesTitle || "Ministries"}
                  as="h3"
                  className="text-2xl md:text-3xl font-heading font-bold"
                />
                <EditableText
                  pageSlug="home"
                  sectionId="features"
                  contentKey="ministriesDescription"
                  defaultValue={content.features?.ministriesDescription || "Find your place in our community through SVBC Kids, Youth, and more."}
                  as="p"
                  className="text-muted-foreground text-lg max-w-2xl"
                  multiline
                />
              </div>
              <div className="mt-6 sm:mt-0 shrink-0">
                <Button size="lg" className="rounded-full shadow-md hover:shadow-primary/20" asChild>
                  <Link href="/ministries">Get Involved</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <EditableText
              pageSlug="home"
              sectionId="location"
              contentKey="title"
              defaultValue={content.location?.title || "Join Us This Sunday"}
              as="h2"
              className="text-4xl md:text-5xl font-heading font-bold"
            />
            <div className="space-y-4 text-lg">
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-primary" />
                <EditableText
                  pageSlug="home"
                  sectionId="location"
                  contentKey="time"
                  defaultValue={content.location?.time || "Sundays at 10:00 AM"}
                  as="span"
                />
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-primary" />
                <EditableText
                  pageSlug="home"
                  sectionId="location"
                  contentKey="address"
                  defaultValue={content.location?.address || "51 Woodlands Rd, St. Albert, AB"}
                  as="span"
                />
              </div>
            </div>
            <EditableText
              pageSlug="home"
              sectionId="location"
              contentKey="description"
              defaultValue={content.location?.description || "Our service is about 75 minutes long. We have programs for kids, coffee is on us, and you can wear whatever you feel comfortable in."}
              as="p"
              className="text-muted-foreground"
              multiline
            />
            <div className="pt-4">
              <Button size="lg" className="rounded-full shadow-lg hover:shadow-primary/20" asChild>
                <Link href="/visit">Plan Your Visit</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl h-[400px] border">
            {/* Map Placeholder or Church Exterior Image */}
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
