require('dotenv').config();
import express, { Application } from 'express';
import { connect } from 'mongoose';

import router from './router';

const app: Application = express();

const PORT = <string>process.env.SERVER_PORT;
const HOST = <string>process.env.SERVER_HOST;
const URI = <string>process.env.DB_URI;

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
