import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import sequelize from '../config/database.js';
import { buildAdmin, buildRouter } from './admin/setup.js';
import authRoutes from './routes/auth.js';
import adminStatsRoutes from './routes/adminStats.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: true, credentials: true }));

const admin = buildAdmin();
const adminRouter = buildRouter(admin);
app.use(admin.options.rootPath, adminRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', authRoutes);
app.use('/api', adminStatsRoutes);

app.get('/', (req, res) => res.redirect('/admin'));
app.get('/health', (req, res) => res.json({ status: 'ok' }));

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');
    await sequelize.sync({ alter: true });
    console.log('✅ Tables synced');
    app.listen(PORT, () => {
      console.log(`\n🚀 Server: http://localhost:${PORT}`);
      console.log(`📊 Admin:  http://localhost:${PORT}/admin\n`);
    });
  } catch (err) {
    console.error('❌ Failed to start:', err);
    process.exit(1);
  }
};

start();