import 'dotenv/config';
import sequelize from '../config/database.js';
const reset = async () => {
  await sequelize.authenticate();
  await sequelize.drop();
  console.log('✅ All tables dropped');
  process.exit(0);
};
reset();