"use client"

import { useState } from "react"
import { updateSettings } from "@/lib/settings"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SettingsFormProps {
    initialSettings: Record<string, string>
}

export function SettingsForm({ initialSettings }: SettingsFormProps) {
    const [settings, setSettings] = useState(initialSettings)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData()
        Object.entries(settings).forEach(([key, value]) => {
            formData.append(key, value)
        })

        const result = await updateSettings(formData)
        if (result.success) {
            alert("Settings saved!")
        } else {
            alert("Failed to save settings")
        }
        setLoading(false)
    }

    const handleChange = (key: string, value: string) => {
        setSettings(prev => ({ ...prev, [key]: value }))
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>General Information</CardTitle>
                    <CardDescription>Site details and default metadata.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Site Title</Label>
                        <Input
                            value={settings.siteTitle || "Sturgeon Valley Baptist Church"}
                            onChange={e => handleChange("siteTitle", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Contact Email</Label>
                        <Input
                            value={settings.contactEmail || "office@svbc.ab.ca"}
                            onChange={e => handleChange("contactEmail", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <Input
                            value={settings.contactPhone || "780.458.3777"}
                            onChange={e => handleChange("contactPhone", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Address</Label>
                        <Input
                            value={settings.contactAddress || "51 Woodlands Rd, St. Albert, AB"}
                            onChange={e => handleChange("contactAddress", e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="opacity-60">
                <CardHeader>
                    <CardTitle>Integrations (Coming Soon)</CardTitle>
                    <CardDescription>Connect to third-party services.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border p-3 rounded-md">
                            <span>Google Analytics</span>
                            <Button variant="outline" size="sm" disabled type="button">Connect</Button>
                        </div>
                        <div className="flex justify-between items-center border p-3 rounded-md">
                            <span>Church Center</span>
                            <Button variant="outline" size="sm" disabled type="button">Connect</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </form>
    )
}
