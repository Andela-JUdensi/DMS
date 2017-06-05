require('dotenv').config();

export default {
  PORT: parseInt(process.env.PORT, 10) || 2020,
  JWT_SECRET: process.env.JWT_SECRET,
};

