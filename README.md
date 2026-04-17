# Role-Based eCommerce Admin Dashboard

A robust, secure Admin Panel for a modern eCommerce backend. This project implements full CRUD functionality, sophisticated Role-Based Access Control (RBAC), and custom data visualizations using **AdminJS**, **Sequelize**, and **PostgreSQL**.

---

## 🎯 Project Objective
The goal was to build a secure administration interface that separates concerns between administrative staff and regular users, ensuring data integrity and system security while providing a clean, data-driven UI.

## 🚀 Features

- **Secure Authentication:** JWT-based session handling with Bcrypt password hashing.
- **Advanced RBAC:** - **Admins:** Full control over Users, Settings, Products, Categories, and Orders.
    - **Users:** Restricted view limited to Products and personal Order history.
- **Relational Data Management:** Automatic dropdowns and linked views for Product-Category and Order-OrderItem relationships.
- **Custom React Dashboard:** A bespoke landing page providing real-time system insights.
- **Global Settings Page:** A dedicated interface for managing key-value store configurations.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js (v20+)
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Admin Interface:** AdminJS (Modern ComponentLoader Architecture)
- **Frontend Tools:** React, Styled-components

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone [https://github.com/Savi-uop/Role-Based-eCommerce-Admin-Dashboard.git](https://github.com/Savi-uop/Role-Based-eCommerce-Admin-Dashboard.git)
cd Role-Based-eCommerce-Admin-Dashboard
```
2. Install Dependencies
```Bash
npm install
```

3. Environment Configuration
Create a .env file in the root directory:

```Code snippet
PORT=3000
DATABASE_URL=postgres://your_user:your_password@localhost:5432/ecommerce_db
SESSION_SECRET=your_32_character_secret_key
NODE_ENV=development
```
4. Database Seeding
Initialize the tables and create the demo accounts:

```Bash
node seed.js
```

5. Run the Application
```Bash
npm run dev
```




