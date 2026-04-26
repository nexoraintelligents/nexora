"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error('Error caught by middeleware:', err.message);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
        timestamp: new Date().toISOString()
    });
};
exports.errorHandler = errorHandler;
