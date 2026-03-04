"use client"

import { useState } from "react"
import { User } from "@prisma/client"
import { createUser, deleteUser, updateUserRole } from "@/lib/users"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Plus, Trash2, UserCog, Shield } from "lucide-react"

// Define a type for users without password
type SafeUser = Omit<User, "password" | "updatedAt">

export function UserList({ initialUsers }: { initialUsers: SafeUser[] }) {
    const [users, setUsers] = useState<SafeUser[]>(initialUsers)
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "MEMBER"
    })

    const handleCreate = async () => {
        setLoading(true)
        const data = new FormData()
        data.append("name", formData.name)
        data.append("email", formData.email)
        data.append("password", formData.password)
        data.append("role", formData.role)

        const result = await createUser(data)

        if (result.success && result.data) {
            setUsers([result.data as unknown as SafeUser, ...users]) // Cast because result has password but we treat it as SafeUser for list
            setIsOpen(false)
            setFormData({ name: "", email: "", password: "", role: "MEMBER" })
        } else {
            alert(result.error)
        }
        setLoading(false)
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return

        const result = await deleteUser(id)
        if (result.success) {
            setUsers(users.filter(u => u.id !== id))
        } else {
            alert("Failed to delete user")
        }
    }

    const handleRoleChange = async (id: string, newRole: string) => {
        const result = await updateUserRole(id, newRole)
        if (result.success) {
            setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u))
        } else {
            alert("Failed to update role")
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Registered Users</h2>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" /> Add User
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New User</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Full Name</Label>
                                <Input
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Password</Label>
                                <Input
                                    type="password"
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="Min. 8 characters"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Role</Label>
                                <Select
                                    value={formData.role}
                                    onValueChange={val => setFormData({ ...formData, role: val })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ADMIN">Admin (Full Access)</SelectItem>
                                        <SelectItem value="MINISTRY_LEADER">Ministry Leader</SelectItem>
                                        <SelectItem value="MEMBER">Member</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button onClick={handleCreate} disabled={loading} className="w-full">
                                {loading ? "Creating..." : "Create User"}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                            {user.name ? user.name.charAt(0).toUpperCase() : "?"}
                                        </div>
                                        {user.name || "Unnamed"}
                                    </div>
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Select
                                        defaultValue={user.role}
                                        onValueChange={(val) => handleRoleChange(user.id, val)}
                                    >
                                        <SelectTrigger className="w-[140px] h-8 text-xs bg-muted/50 border-none">
                                            <div className="flex items-center gap-2">
                                                {user.role === 'ADMIN' ? <Shield className="w-3 h-3 text-red-500" /> : <UserCog className="w-3 h-3" />}
                                                <SelectValue />
                                            </div>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ADMIN">Admin</SelectItem>
                                            <SelectItem value="MINISTRY_LEADER">Leader</SelectItem>
                                            <SelectItem value="MEMBER">Member</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive hover:bg-destructive/10"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {users.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                    No users found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
