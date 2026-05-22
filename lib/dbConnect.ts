import mongoose from "mongoose"
import { autoSeed } from "./seed"

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
    console.error("Please add MONGODB_URI")
}

declare global {
    var _mongooseCache: {
        conn: typeof mongoose | null
        promise: Promise<typeof mongoose> | null
    }
}

if (!global._mongooseCache) {
    global._mongooseCache = { conn: null, promise: null }
}

const cached = global._mongooseCache

export async function dbConnect() {

    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    // if mongoose is already connected, return immediately
    if (mongoose.connection.readyState === 1) return mongoose

    // connection dropped — reset cache so we reconnect fresh
    if (mongoose.connection.readyState === 0) {
        cached.conn = null
        cached.promise = null
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI).then(() => mongoose)
    }

    cached.conn = await cached.promise

    // await autoSeed()

    return cached.conn
}