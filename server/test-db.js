require('dotenv').config();
const mongoose = require('mongoose');

async function testDB() {
  console.log('🧪 Testing MongoDB Atlas Connection...\n');
  
  if (!process.env.MONGODB_URI) {
    console.log('❌ MONGODB_URI is not set in .env file');
    return;
  }

  // Mask credentials in log
  const maskedURI = process.env.MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@');
  console.log('Connection String:', maskedURI);
  console.log('');

  try {
    // Set a timeout
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Connection timeout after 10 seconds')), 10000)
    );

    const connectPromise = mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    const conn = await Promise.race([connectPromise, timeoutPromise]);
    
    console.log('✅ SUCCESS: Connected to MongoDB Atlas!');
    console.log(`📍 Host: ${conn.connection.host}`);
    console.log(`📁 Database: ${conn.connection.name}`);
    
    // Test if we can read/write
    const testDoc = await conn.connection.db.admin().ping();
    console.log('📊 Database ping:', testDoc);
    
    await mongoose.connection.close();
    console.log('\n🎉 All tests passed! Your MongoDB Atlas connection is working correctly.');
    
  } catch (error) {
    console.log('❌ CONNECTION FAILED');
    console.log('Error:', error.message);
    
    if (error.message.includes('bad auth')) {
      console.log('\n🔑 SOLUTION:');
      console.log('1. Go to MongoDB Atlas → Database Access');
      console.log('2. Create a new database user or reset password');
      console.log('3. Update MONGODB_URI in .env with correct credentials');
      console.log('4. Make sure IP is whitelisted in Network Access');
    }
  }
}

testDB();