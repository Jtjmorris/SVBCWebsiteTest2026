"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useSession } from "next-auth/react"

type AdminContextType = {
    isEditing: boolean
    toggleEditing: () => void
    canEdit: boolean
}

const AdminContext = createContext<AdminContextType>({
    isEditing: false,
    toggleEditing: () => { },
    canEdit: false
})

export const useAdmin = () => useContext(AdminContext)

export function AdminProvider({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession()
    const [isEditing, setIsEditing] = useState(false)
    const [canEdit, setCanEdit] = useState(false)

    useEffect(() => {
        if (session?.user) {
            const role = (session.user as any).role
            const allowedRoles = ["ADMIN", "DESIGNER", "MINISTRY_LEADER"]
            setCanEdit(allowedRoles.includes(role))
        } else {
            setCanEdit(false)
            setIsEditing(false)
        }
    }, [session])

    const toggleEditing = () => {
        if (canEdit) setIsEditing(!isEditing)
    }

    return (
        <AdminContext.Provider value={{ isEditing, toggleEditing, canEdit }}>
            {children}
            {canEdit && <AdminToolbar />}
        </AdminContext.Provider>
    )
}

function AdminToolbar() {
    const { isEditing, toggleEditing } = useAdmin()

    return (
        <div
            onClick={toggleEditing}
            className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 cursor-pointer transition-all hover:scale-105 border font-medium ${isEditing
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-foreground border-border"
                }`}
        >
            <div className={`w-3 h-3 rounded-full shadow-sm transition-colors ${isEditing ? 'bg-green-400 animate-pulse' : 'bg-muted-foreground'}`} />
            <span>{isEditing ? "Editing Active" : "Edit Content"}</span>
        </div>
    )
}
