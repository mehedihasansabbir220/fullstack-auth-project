// backend/src/routes/authRoutes.ts
import express from 'express';
import { register, login } from '../controllers/authController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Protected route example
router.get('/profile', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

export default router;