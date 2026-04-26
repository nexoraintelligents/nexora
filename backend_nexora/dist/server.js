"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const firebaseGuard_1 = require("./middleware/firebaseGuard");
const mongoose_1 = require("./lib/mongoose");
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const auth_1 = require("./middleware/auth");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const app = (0, express_1.default)();
const port = process.env.PORT || 4001;
// Rate limiting
const authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 requests per windowMs for auth routes
    message: { message: 'Too many requests from this IP, please try again after 15 minutes' },
    standardHeaders: true,
    legacyHeaders: false,
});
async function startServer() {
    try {
        // Connect to MongoDB
        await (0, mongoose_1.connectDB)();
        app.use((0, cors_1.default)({
            origin: true,
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));
        app.use(express_1.default.json());
        // Health endpoint
        app.get('/health', (_, res) => {
            res.status(200).send('OK');
        });
        // Routes
        app.use('/api/v1/auth', authLimiter, auth_routes_1.default);
        // Example firebase protected route
        app.get('/api/protected-firebase', firebaseGuard_1.firebaseGuard, (req, res) => {
            res.json({ message: 'This is a firebase protected route' });
        });
        // New JWT protected route
        app.get('/api/protected', auth_1.authGuard, (req, res) => {
            res.json({ message: 'This is a JWT protected route', user: req.user });
        });
        app.listen(port, () => {
            console.log(`Server running on ${port}`);
        });
    }
    catch (error) {
        console.error('SERVER_STARTUP_ERROR:', error);
        process.exit(1);
    }
}
startServer();
