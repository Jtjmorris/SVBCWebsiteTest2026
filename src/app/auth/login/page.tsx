"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        // Hardcoded credentials for demo: admin@svbc.ab.ca / admin
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        if (result?.error) {
            setError("Invalid email or password")
        } else {
            router.push("/admin/dashboard")
            router.refresh()
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-muted/50">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
                    <CardDescription>Enter your email and password to access the church dashboard.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="designer@svbc.ab.ca"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
                        <Button type="submit" className="w-full">Sign In</Button>
                    </form>
                </CardContent>
                <CardFooter className="justify-center text-sm text-muted-foreground">
                    Use designer@svbc.ab.ca / SVBC-Designer-2026! to test
                </CardFooter>
            </Card>
        </div>
    )
}
