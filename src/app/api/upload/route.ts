import { NextRequest, NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"
import { prisma } from "@/lib/db"

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData()
        const file: File | null = data.get('file') as unknown as File

        if (!file) {
            return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Make filename unique
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const filename = `${uniqueSuffix}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
        const path = join(process.cwd(), 'public', 'uploads', filename)

        // Ensure directory exists
        const fs = require('fs')
        const dir = join(process.cwd(), 'public', 'uploads')
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

        await writeFile(path, buffer)

        const url = `/uploads/${filename}`

        await prisma.media.create({
            data: {
                filename: file.name,
                url,
                mimeType: file.type,
                size: file.size
            }
        })

        return NextResponse.json({ success: true, url, filename: file.name })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, error: "Upload failed" }, { status: 500 })
    }
}
