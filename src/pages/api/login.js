import { connectDB } from "../../database/mongoDB";
import User from "../../database/User";

export default async function handler(req, res) {
    // Verificăm dacă este o cerere POST
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        await connectDB();

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Incorrect email or password" });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: "Incorrect email or password" });
        }

        return res.status(200).json({ message: "Login successful", name: user.name, surname: user.surname });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Server error" });
    }
}