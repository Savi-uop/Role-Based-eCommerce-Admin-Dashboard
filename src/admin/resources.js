import { User, Category, Product, Order, OrderItem, Setting } from '../models/index.js';

const isAdmin = (ctx) => ctx.currentAdmin?.role === 'admin';

export const UserResource = {
  resource: User,
  options: {
    properties: { password: { isVisible: false } },
    listProperties: ['id','name','email','role','isActive','createdAt'],
    editProperties: ['name','email','password','role','isActive','phone','address'],
    actions: {
      list:   { isAccessible: isAdmin },
      show:   { isAccessible: isAdmin },
      new:    { isAccessible: isAdmin },
      edit:   { isAccessible: isAdmin },
      delete: { isAccessible: isAdmin },
    },
  },
};

export const CategoryResource = {
  resource: Category,
  options: {
    listProperties: ['id','name','slug','isActive','sortOrder'],
    editProperties: ['name','slug','description','isActive','sortOrder'],
    actions: { new: { isAccessible: isAdmin }, edit: { isAccessible: isAdmin }, delete: { isAccessible: isAdmin } },
  },
};

export const ProductResource = {
  resource: Product,
  options: {
    properties: {
      CategoryId: {
        reference: 'categories',   //table name
        isVisible: { list: true, filter: true, show: true, edit: true },
      },
      description: {
        isVisible: { list: false, filter: false, show: true, edit: true },
      },
    },
    listProperties: ['id', 'name', 'CategoryId', 'price', 'stock', 'isActive'],
    showProperties: ['id', 'name', 'slug', 'CategoryId', 'description', 'price', 'comparePrice', 'stock', 'sku', 'isActive', 'isFeatured'],
    editProperties: ['name', 'slug', 'CategoryId', 'description', 'price', 'comparePrice', 'stock', 'sku', 'isActive', 'isFeatured'],
    filterProperties: ['name', 'isActive', 'CategoryId'],
    actions: {
      new:    { isAccessible: isAdmin },
      edit:   { isAccessible: isAdmin },
      delete: { isAccessible: isAdmin },
    },
  },
};

export const OrderResource = {
  resource: Order,
  options: {
    properties: {
      UserId: {
        reference: 'users',        // table name
        isVisible: { list: true, filter: true, show: true, edit: true },
      },
    },
    listProperties: ['id', 'orderNumber', 'UserId', 'status', 'paymentStatus', 'total', 'createdAt'],
    showProperties: ['id', 'orderNumber', 'UserId', 'status', 'paymentStatus', 'paymentMethod', 'subtotal', 'tax', 'shippingCost', 'total', 'notes', 'trackingNumber', 'createdAt'],
    editProperties: ['status', 'paymentStatus', 'paymentMethod', 'total', 'notes', 'trackingNumber'],
    filterProperties: ['status', 'paymentStatus', 'UserId'],
    actions: {
      new:    { isAccessible: isAdmin },
      edit:   { isAccessible: isAdmin },
      delete: { isAccessible: isAdmin },
    },
  },
};

export const OrderItemResource = {
  resource: OrderItem,
  options: {
    properties: {
      OrderId: {
        reference: 'orders',       // ✅ must match table name
        isVisible: { list: true, filter: true, show: true, edit: true },
      },
      ProductId: {
        reference: 'products',     // ✅ must match table name
        isVisible: { list: true, filter: true, show: true, edit: true },
      },
    },
    listProperties: ['id', 'OrderId', 'ProductId', 'quantity', 'unitPrice', 'totalPrice'],
    editProperties: ['OrderId', 'ProductId', 'quantity', 'unitPrice', 'totalPrice'],
    actions: {
      new:    { isAccessible: isAdmin },
      edit:   { isAccessible: isAdmin },
      delete: { isAccessible: isAdmin },
    },
  },
};

export const SettingResource = {
  resource: Setting,
  options: {
    listProperties: ['id','key','value','type','group'],
    editProperties: ['key','value','type','group','label','description','isPublic'],
    actions: {
      list:   { isAccessible: isAdmin },
      show:   { isAccessible: isAdmin },
      new:    { isAccessible: isAdmin },
      edit:   { isAccessible: isAdmin },
      delete: { isAccessible: isAdmin },
    },
  },
};