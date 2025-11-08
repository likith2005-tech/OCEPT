// server/quick-test.js
require('dotenv').config();
const mongoose = require('mongoose');

async function test() {
  try {
    console.log('Testing connection...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected successfully!');
    process.exit(0);
  } catch (error) {
    console.log('❌ Connection failed:', error.message);
    process.exit(1);
  }
}

test();