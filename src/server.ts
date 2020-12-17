require('dotenv').config();
import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';

import { MONGO_URL } from './services/endpoint';

const app = express();

mongoose.connect(MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

app.use(express.json());
app.use(routes);

app.listen(3333);
