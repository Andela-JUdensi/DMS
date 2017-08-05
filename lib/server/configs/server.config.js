'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
require('dotenv').config();

exports.default = {
  PORT: parseInt(process.env.PORT, 10) || 2020,
  JWT_SECRET: process.env.JWT_SECRET
};