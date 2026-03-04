export interface Event {
    id: string
    title: string
    description: string
    date: string
    startTime?: string
    endTime?: string
    location?: string
    category: 'Ministry' | 'Special Event' | 'Service'
    image?: string
}
