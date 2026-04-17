import AdminJS, { ComponentLoader } from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/sequelize';
import session from 'express-session';
import ConnectSessionSequelize from 'connect-session-sequelize';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import sequelize from '../../config/database.js';
import { User } from '../models/index.js';
import { 
  UserResource, 
  CategoryResource, 
  ProductResource, 
  OrderResource, 
  OrderItemResource, 
  SettingResource 
} from './resources.js';

// 1. Register the adapter
AdminJS.registerAdapter({ Database, Resource });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 2. Initialize the ComponentLoader
const componentLoader = new ComponentLoader();

// 3. Register your custom Dashboard component via the loader
// This replaces the old AdminJS.bundle() method
const DASHBOARD_COMPONENT = componentLoader.add('Dashboard', join(__dirname, 'components/Dashboard.jsx'));

export const buildAdmin = () => {
  return new AdminJS({
    resources: [
      UserResource, 
      CategoryResource, 
      ProductResource, 
      OrderResource, 
      OrderItemResource, 
      SettingResource
    ],
    rootPath: '/admin',
    branding: { 
      companyName: 'eCommerce Admin', 
      logo: false 
    },
    // 4. Critical: You MUST pass the componentLoader instance here
    componentLoader, 
    dashboard: {
      component: DASHBOARD_COMPONENT,
    },
  });
};

export const buildRouter = (admin) => {
  const SequelizeStore = ConnectSessionSequelize(session.Store);
  const sessionStore = new SequelizeStore({ db: sequelize });
  
  // Sync the session table in the database
  sessionStore.sync();

  return AdminJSExpress.buildAuthenticatedRouter(admin, {
    authenticate: async (email, password) => {
    try {
        const user = await User.findOne({ where: { email: email.toLowerCase().trim() } });
        console.log('🔍 Login attempt:', email);
        console.log('🔍 User found:', user ? 'YES' : 'NO');
        console.log('🔍 isActive:', user?.isActive);

        if (!user || !user.isActive) return null;

        const valid = await user.validatePassword(password);
        console.log('🔍 Password valid:', valid);

        if (!valid) return null;

        await user.update({ lastLogin: new Date() });
        return { id: user.id, email: user.email, name: user.name, role: user.role };
    } catch (err) {
        console.error('❌ Auth error:', err);
        return null;
    }
    },
    cookieName: 'adminjs',
    cookiePassword: process.env.SESSION_SECRET || 'fallback_secret_32_chars_minimum!',
  }, null, {
    secret: process.env.SESSION_SECRET || 'fallback_secret_32_chars_minimum!',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { 
      httpOnly: true, 
      maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
    },
  });
};