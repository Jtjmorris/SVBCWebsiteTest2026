export interface SmallGroup {
    id: string
    slug?: string
    name: string
    description: string
    type: 'Men' | 'Women' | 'Mixed' | 'Young Adults' | 'Seniors'
    day: string
    time: string
    location: string
    leader: string
    image?: string
}
