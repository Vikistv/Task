const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');

const app = express();
const PORT = 3001;

const sessionConfig = {
  name: 'WebApp',
  store: new FileStore(),
  secret: 'Cookie',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 10,
    httpOnly: true,
  },
};

app.use(session(sessionConfig));
const userRouter = require('./src/routes/userRouter');

app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRouter);

app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
