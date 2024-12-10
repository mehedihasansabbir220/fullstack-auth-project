"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/index.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const logger_1 = require("./utils/logger");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Database Connection
(0, database_1.default)();
// Routes
app.use('/api/auth', authRoutes_1.default);
// Global Error Handler
app.use((err, req, res, next) => {
    logger_1.logger.error(err.stack);
    res.status(500).send('Something broke!');
});
app.listen(PORT, () => {
    logger_1.logger.info(`Server running on port ${PORT}`);
});
exports.default = app;
