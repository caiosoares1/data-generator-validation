import 'express-async-errors';
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import router from './routes/routes.js';

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan('tiny'));

app.use(express.static('public'));

app.use(router);

app.use((req, res, next) => {
  res.status(404).send('Content not found');
});

app.listen(port, () => console.log('Server is running!'));