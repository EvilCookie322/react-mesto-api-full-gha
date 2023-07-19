const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleError = require('./middlewares/handleError');
const router = require('./routes/index');

const { PORT = 4000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(cors({ origin: ['https://cookie.nomoredomains.xyz', 'http://localhost:3000'], credentials: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

mongoose.connect(DB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log('Db connected');
  })
  .catch((error) => {
    console.log('Db connection failed');
    console.error(error);
  });

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(limiter);

app.use(requestLogger);
app.use(router);
app.use(errorLogger);

app.use(errors());
app.use((err, req, res, next) => {
  handleError(err, res, next);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
