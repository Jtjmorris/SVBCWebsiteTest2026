import { MediaLibrary } from "@/components/admin/MediaLibrary"

export const metadata = {
    title: "Media Library | SVBC Admin",
}

export default function MediaLibraryPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
                <p className="text-muted-foreground">Manage your website's images and uploaded files.</p>
            </div>

            <MediaLibrary />
        </div>
    )
}
