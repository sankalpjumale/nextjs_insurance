import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI! //! means this value exists

if(!MONGODB_URI) {
    console.error("Please add MONGODB_URI")
}

declare global {
    var mongoose: {
        conn: typeof import("mongoose") | null //hold active connection once establish
        promise: Promise<typeof import("mongoose")> | null //hold in-progress connection promise
    }
}

let cached = global.mongoose //use global cache if it already exists otherwise start with undefined and global persists last hot reload in next.js regular varaibale donot last


if(!cached) { //when run first time it initialise cached with empty values
    cached = global.mongoose = {
        conn: null,
        promise: null
    }
}

export async function dbConnect() {

    //if it connect then return  
    if(cached.conn) return cached.conn

    //if no connection in progress then start one
    if(!cached.promise) {
        //mongoose.connect retunr promise - parallel calls share same attempt
        cached.promise = mongoose
            .connect(MONGODB_URI)
            .then((mongoose) => mongoose) //take mongoose connection and return it as it is
    }

    //await connection promise, either one just started or one already connect
    cached.conn = await cached.promise

    return cached.conn
}

//singleton caching