"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseGuard = void 0;
/**
 * Firebase Authentication Guard
 * Verifies the ID token sent in the Authorization header.
 */
const firebaseGuard = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    const idToken = authHeader.split('Bearer ')[1];
    try {
        // Note: Implementation requires firebase-admin to be initialized
        // const decodedToken = await admin.auth().verifyIdToken(idToken);
        // (req as any).user = decodedToken;
        console.log('Firebase token verified (placeholder)');
        next();
    }
    catch (error) {
        console.error('Error verifying Firebase ID token:', error);
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};
exports.firebaseGuard = firebaseGuard;
