import { Router } from 'express';
import { User } from '../models/index.js';
import { generateToken, authenticateToken } from '../middleware/auth.js';

const router = Router();

// POST /api/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Email and password required' });

    const user = await User.findOne({ where: { email: email.toLowerCase().trim() } });
    if (!user || !user.isActive)
      return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const valid = await user.validatePassword(password);
    if (!valid)
      return res.status(401).json({ success: false, message: 'Invalid credentials' });

    await user.update({ lastLogin: new Date() });
    const token = generateToken(user);
    return res.json({ success: true, token, user: user.toSafeJSON() });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ success: false, message: 'All fields required' });

    const exists = await User.findOne({ where: { email: email.toLowerCase().trim() } });
    if (exists)
      return res.status(409).json({ success: false, message: 'Email already registered' });

    const user = await User.create({ name, email: email.toLowerCase().trim(), password, role: 'user' });
    const token = generateToken(user);
    return res.status(201).json({ success: true, token, user: user.toSafeJSON() });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/me
router.get('/me', authenticateToken, (req, res) => {
  res.json({ success: true, user: req.user });
});

export default router;