const { MongoClient } = require('mongodb');
require('dotenv').config();

async function testConnection(uri, description) {
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
  });

  try {
    await client.connect();
    console.log(`✅ ${description}: SUCCESS`);
    await client.close();
    return true;
  } catch (error) {
    console.log(`❌ ${description}: ${error.message}`);
    return false;
  }
}

async function testAllConnections() {
  console.log('🧪 Testing All Possible Connections...\n');

  const testCases = [
    // Your current .env credentials
    { 
      uri: 'mongodb+srv://courseuser:Password123@cluster0.lrim4l3.mongodb.net/course-hub?retryWrites=true&w=majority',
      desc: 'Current .env credentials' 
    },
    
    // Simple variations
    { 
      uri: 'mongodb+srv://courseuser:password123@cluster0.lrim4l3.mongodb.net/course-hub?retryWrites=true&w=majority',
      desc: 'Lowercase password' 
    },
    
    // Common default credentials
    { 
      uri: 'mongodb+srv://admin:admin@cluster0.lrim4l3.mongodb.net/course-hub?retryWrites=true&w=majority',
      desc: 'Admin default' 
    },
    
    // Your possible username
    { 
      uri: 'mongodb+srv://meruv:Password123@cluster0.lrim4l3.mongodb.net/course-hub?retryWrites=true&w=majority',
      desc: 'Your username meruv' 
    },
    
    // Simple password
    { 
      uri: 'mongodb+srv://meruv:password@cluster0.lrim4l3.mongodb.net/course-hub?retryWrites=true&w=majority',
      desc: 'meruv with simple password' 
    },
  ];

  let successCount = 0;
  
  for (const test of testCases) {
    const success = await testConnection(test.uri, test.desc);
    if (success) successCount++;
  }

  console.log(`\n📊 Results: ${successCount}/${testCases.length} successful connections`);
  
  if (successCount === 0) {
    console.log('\n💡 SOLUTION:');
    console.log('1. Go to MongoDB Atlas → Database Access');
    console.log('2. Create a NEW database user with exact credentials');
    console.log('3. Use simple username/password without special characters');
    console.log('4. Make sure IP is whitelisted in Network Access');
  }
}

testAllConnections();