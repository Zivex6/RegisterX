import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;

    try {
        console.log('MONGO_URI:', process.env.MONGODB_URI);  // Verifica que el valor de MONGODB_URI esté cargado correctamente
        await mongoose.connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
    }
};