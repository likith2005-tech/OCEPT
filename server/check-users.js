console.log('🔐 Possible username/password combinations to try:');
console.log('==================================================');
console.log('');

const combinations = [
  { username: 'courseuser', password: 'Password123' },
  { username: 'admin', password: 'admin' },
  { username: 'user', password: 'password' },
  { username: 'mern', password: 'mern' },
  { username: 'test', password: 'test' },
  { username: 'demo', password: 'demo' },
];

combinations.forEach(combo => {
  const connectionString = `mongodb+srv://${combo.username}:${combo.password}@cluster0.lrim4l3.mongodb.net/course-hub?retryWrites=true&w=majority`;
  console.log(`Try: ${combo.username} / ${combo.password}`);
  console.log(`Connection: ${connectionString}`);
  console.log('');
});

console.log('💡 Go to MongoDB Atlas → Database Access to see what users exist');
console.log('💡 Or create a new user with: courseuser / Password123');