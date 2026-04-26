"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = void 0;
const authGuard = (req, res, next) => {
    // TODO: Implement JWT verification and role check
    console.log('authGuard placeholder called');
    next();
};
exports.authGuard = authGuard;
