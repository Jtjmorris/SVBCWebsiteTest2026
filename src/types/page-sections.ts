export type SectionType = 'HERO' | 'TEXT' | 'FEATURES' | 'GALLERY'

export interface PageSection {
    id: string
    type: SectionType
    data: any
}

export interface HeroSectionData {
    title: string
    subtitle?: string
    image?: string
    ctaText?: string
    ctaLink?: string
    align?: 'left' | 'center'
}

export interface TextSectionData {
    content: string // HTML or Markdown
    className?: string
}

export interface FeatureItem {
    title: string
    description: string
    icon?: string
}

export interface FeaturesSectionData {
    title?: string
    columns?: 2 | 3 | 4
    items: FeatureItem[]
}

export interface GallerySectionData {
    title?: string
    images: string[] // URLs
    columns?: 2 | 3 | 4
}
