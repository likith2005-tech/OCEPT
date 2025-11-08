const dotenv = require('dotenv');

// Load environment variables
const result = dotenv.config();

if (result.error) {
  console.log('❌ Error loading .env file:', result.error);
} else {
  console.log('✅ .env file loaded successfully');
}

console.log('=== Environment Variables ===');
console.log('PORT:', process.env.PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '*** set ***' : '❌ NOT SET');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '*** set ***' : '❌ NOT SET');
console.log('=============================');