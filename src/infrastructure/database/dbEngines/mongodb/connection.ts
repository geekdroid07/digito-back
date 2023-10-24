import mongoose from 'mongoose';

const dbUsername = process.env.MONGO_USER;
const dbPassword = process.env.MONGO_PASSWORD;

const connectionString = 'mongodb://localhost/digito';
console.log(connectionString);

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: dbUsername,
  pass: dbPassword
};
mongoose.connect(connectionString, dbOptions);

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('Mongodb Connection stablished');
});

connection.on('error', (err) => {
  console.log('Mongodb connection error:', err);
  process.exit();
});
