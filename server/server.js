import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
import educatorRouter from "./routes/educatorRoutes.js";
import { clerkMiddleware } from "@clerk/express";
import connectCloudinary from "./configs/cloudinary.js";

//Express
const app = express();

//Connect DB
await connectDB();
await connectCloudinary()

//middlwares
app.use(cors());
app.use(clerkMiddleware())

//Routes
app.post("/clerk", express.json(), clerkWebhooks);
app.use('/api/educator', express.json(), educatorRouter)

//Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
