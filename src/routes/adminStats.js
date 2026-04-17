import { Router } from 'express';
import sequelize from '../../config/database.js';
import { User, Order, Product } from '../models/index.js';

const router = Router();

router.get('/admin-stats', async (req, res) => {
  try {
    const sessionAdmin = req.session?.adminUser;
    if (!sessionAdmin) return res.status(401).json({ success: false, message: 'Not authenticated' });

    if (sessionAdmin.role === 'admin') {
      const [totalUsers, totalOrders, totalProducts, activeProducts, pendingOrders, totalRevenue, ordersByStatusRaw, recentOrders] = await Promise.all([
        User.count(),
        Order.count(),
        Product.count(),
        Product.count({ where: { isActive: true } }),
        Order.count({ where: { status: 'pending' } }),
        Order.sum('total', { where: { paymentStatus: 'paid' } }),
        Order.findAll({ attributes: ['status', [sequelize.fn('COUNT', sequelize.col('id')), 'count']], group: ['status'], raw: true }),
        Order.findAll({ limit: 8, order: [['createdAt', 'DESC']], include: [{ model: User, as: 'user', attributes: ['name'] }] }),
      ]);

      return res.json({
        success: true, currentAdmin: sessionAdmin,
        totalUsers, totalOrders, totalProducts, activeProducts, pendingOrders,
        totalRevenue: totalRevenue || 0,
        ordersByStatus: ordersByStatusRaw.map(r => ({ status: r.status, count: parseInt(r.count) })),
        recentOrders: recentOrders.map(o => ({ id: o.id, orderNumber: o.orderNumber, status: o.status, total: o.total, createdAt: o.createdAt, user: o.user })),
      });
    } else {
      const [myOrders, myTotalSpent] = await Promise.all([
        Order.count({ where: { UserId: sessionAdmin.id } }),
        Order.sum('total', { where: { UserId: sessionAdmin.id, paymentStatus: 'paid' } }),
      ]);
      return res.json({ success: true, currentAdmin: sessionAdmin, myOrders, myTotalSpent: myTotalSpent || 0 });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;