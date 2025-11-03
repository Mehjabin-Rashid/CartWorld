import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import helmet from "helmet";
import cookieParser from "cookie-parser";
import hpp from "hpp";
import router from "./routes/api.js";
// import oauthRouter from "./src/routes/oauth.js"; // TODO: Implement OAuth routes
import {DATABASE,JWT_KEY,JWT_EXPIRE_TIME,WEB_CACHE,MAX_JSON_SIZE,REQUEST_TIME,REQUEST_NUMBER, PORT} from "./Config/BD.js";
import fileUpload from 'express-fileupload'

const app = express();

// Global Application Middleware
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173"], // Add your frontend URLs
    credentials: true // Allow cookies to be sent with requests
}));
// Parse JSON bodies
app.use(express.json({ limit: MAX_JSON_SIZE }));
// Be tolerant to Postman sending raw JSON as text/plain
app.use(express.text({ type: ["text/plain"], limit: MAX_JSON_SIZE }));
app.use((req, _res, next) => {
    if (typeof req.body === "string") {
        try {
            const maybe = req.body.trim();
            if ((maybe.startsWith("{") && maybe.endsWith("}")) || (maybe.startsWith("[") && maybe.endsWith("]"))) {
                req.body = JSON.parse(maybe);
            }
        } catch (_) {
            // leave body as-is if not valid JSON
        }
    }
    next();
});
//app.use(express.urlencoded({ extended: URL_ENCODED }));
app.use(hpp())
app.use(helmet())
app.use(cookieParser())

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));



// Rate Limiter
const limiter=rateLimit({windowMs:REQUEST_TIME,max:REQUEST_NUMBER})
app.use(limiter)


// Web Caching
app.set('etag',WEB_CACHE)



// DATABASE connection
mongoose.connect(DATABASE,{autoIndex:true}).then(()=>{
    console.log("Connected to DATABASE");
}).catch(err=>{
    console.log("Error connecting to DATABASE");
})


// Set API Routes
app.use("/api",router)

// Simple health check & root info routes to aid debugging from Postman
app.get("/api/health", (_req, res) => {
    return res.json({ status: "ok", message: "CartWorld API is running", port: PORT });
});

app.get("/", (_req, res) => {
    return res.json({
        status: "ok",
        message: "CartWorld API server",
        hint: "Use /api/users/register (POST), /api/users/login (POST), /api/users/logout (GET)",
        health: "/api/health"
    });
});
// OAuth Routes (Google / LinkedIn / Microsoft)
// app.use("/auth", oauthRouter) // TODO: Implement OAuth routes

// Set Application Storage
app.use(express.static('storage'))

// Catch-all 404 handler with helpful diagnostics for Postman
app.use((req, res) => {
    return res.status(404).json({
        status: "fail",
        message: "Route not found",
        method: req.method,
        path: req.originalUrl,
        hint: "Ensure you are calling http://localhost:"+PORT+"/api/... e.g., /api/users/register (POST)",
        availableExamples: [
            { method: "GET", path: "/api/health" },
            { method: "POST", path: "/api/users/register" },
            { method: "POST", path: "/api/users/login" },
            { method: "GET", path: "/api/users/logout" }
        ]
    });
});

// Run Your Express Back End Project

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
