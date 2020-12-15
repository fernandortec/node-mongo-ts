import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';

const app = express();

mongoose.connect(
  'mongodb+srv://Fernando:maxicontrol@cluster0.c1p11.mongodb.net/github-user:user?retryWrites=true&w=majority',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  }
);

app.use(express.json());
app.use(routes);

app.listen(3333);
