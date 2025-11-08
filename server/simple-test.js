// Simple test without any dependencies
const connectionString = 'mongodb+srv://courseuser:Password123@cluster0.lrim4l3.mongodb.net/course-hub?retryWrites=true&w=majority';

console.log('Testing connection string format...');
console.log('Connection String:', connectionString);
console.log('');

// Check if the format is correct
if (connectionString.includes('mongodb+srv://') && 
    connectionString.includes('@cluster0.lrim4l3.mongodb.net/') &&
    connectionString.includes('course-hub')) {
  console.log('✅ Connection string format looks correct');
} else {
  console.log('❌ Connection string format is wrong');
}