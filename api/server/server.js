import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import usersRouter from './routes/users';
import transactionsRouter from './routes/transactions';
import meRouter from './routes/me';
/**
 * Comment or uncomment this line to synchronize Database
 * 
 * Note: dont forget to update model export in ../models/sequelize/index.js
 */
import '../models/sequelize';

let uri = "mongodb://root:password@mongo:27017/api?authSource=admin";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology:true })
  .then(v => console.log('Connected to MongoDB'))
  .catch(e => console.log('Connection problem', e));

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, '../public')));

/**
 * Users routes
 */
app.use('/users', usersRouter);
app.use('/transactions', transactionsRouter);
app.use('/me', meRouter);

app.get('/', (req, res) => {
  const message = 'Welcome to the platform API.';
  res.json({ message });
});

const serverPort = process.env.PORT || 8888;
// Start server
const server = app.listen(serverPort);

export default app;
