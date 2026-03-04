"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { User } from "@prisma/client"
import bcrypt from "bcryptjs"

export async function getUsers() {
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                // Exclude password
            }
        })
        return { success: true, data: users }
    } catch (error) {
        console.error("Failed to fetch users:", error)
        return { success: false, error: "Failed to fetch users" }
    }
}

export async function createUser(data: FormData) {
    try {
        const name = data.get("name") as string
        const email = data.get("email") as string
        const password = data.get("password") as string
        const role = data.get("role") as string

        if (!email || !password || !role) {
            return { success: false, error: "Missing required fields" }
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return { success: false, error: "User already exists with this email" }
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role
            }
        })

        revalidatePath("/admin/dashboard/users")
        return { success: true, data: user }
    } catch (error) {
        console.error("Failed to create user:", error)
        return { success: false, error: "Failed to create user" }
    }
}

export async function updateUserRole(id: string, role: string) {
    try {
        await prisma.user.update({
            where: { id },
            data: { role }
        })
        revalidatePath("/admin/dashboard/users")
        return { success: true }
    } catch (error) {
        console.error("Failed to update user role:", error)
        return { success: false, error: "Failed to update user role" }
    }
}

export async function deleteUser(id: string) {
    try {
        await prisma.user.delete({
            where: { id }
        })
        revalidatePath("/admin/dashboard/users")
        return { success: true }
    } catch (error) {
        console.error("Failed to delete user:", error)
        return { success: false, error: "Failed to delete user" }
    }
}
