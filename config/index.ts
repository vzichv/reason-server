require('dotenv').config();
import express, { Application } from 'express';
import { connect } from 'mongoose';

// API routing:
import router from './router';

const app: Application = express();

const DEFAULT_PORT = 4000;
const DEFAULT_HOST = 'localhost';
const DEFAULT_URI = '';

const PORT: number = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : DEFAULT_PORT;
const HOST: string = process.env.SERVER_HOST ? process.env.SERVER_HOST : DEFAULT_HOST;
const URI: string = process.env.DB_URI ? process.env.DB_URI : DEFAULT_URI;

app.use(router);

async function connectMongoDB(): Promise<void> {
  try { 
    await connect(URI);
    console.log('[mongoose] successfully connected to MongoDB');
  }
  catch (error) {
    console.log(`[mongoose] MongoDB connection error: ${error}`);
  }
}

app.listen(PORT, () => {
  console.log(`[server] running at https://${HOST}:${PORT}`);
  connectMongoDB();
});