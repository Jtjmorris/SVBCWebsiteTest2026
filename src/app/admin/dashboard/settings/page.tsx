import { getSettings, updateSettings } from "@/lib/settings"
import { SettingsForm } from "@/components/admin/SettingsForm"

export const dynamic = 'force-dynamic'

export default async function SettingsAdmin() {
    const { data: settings } = await getSettings()

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage global site configuration.</p>
            </div>

            <SettingsForm initialSettings={settings || {}} />
        </div>
    )
}
