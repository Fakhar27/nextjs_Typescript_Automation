import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import mongoose from "mongoose";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const mongoConnection = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      console.log("Already connected to MongoDB");
      return;
    }
    
    const { connection } = await mongoose.connect(process.env.MONGO_URI!);
    
    if (connection.readyState === 1) {
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};