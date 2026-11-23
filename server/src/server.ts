import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.ts"
import urlRoutes from "./routes/url.routes.ts"

const app = express();
app.use(express.json());
app.use((req, res, next) => {
    console.log("Method:", req.method);
    console.log("URL:", req.originalUrl);
    console.log("Host:", req.get("host"));
    console.log("Full URL:", `${req.protocol}://${req.get("host")}${req.originalUrl}`);

    next();
});
app.use(
    cors({
        origin:[
            "http://localhost:3581",
            "http://127.0.0.1:3581"
        ],
        methods:["GET","POST","PATCH","DELETE"],
        allowedHeaders: ["Content-Type","Authorization"],
        credentials:true,
    })
);

app.get("/api",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"URL Shortner API is running",
    });
});

app.use('/api',urlRoutes)



const PORT = Number(process.env.PORT) || 8000;

const startServer= async()=>{
    try {
        await connectDB();
        app.listen(PORT,()=>{
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to Start server: ", error);
        process.exit(1);
    }
};

startServer();