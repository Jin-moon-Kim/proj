//index.js

const express = require('express');
const connectDb = require('./config/db');
const postRouter = require('./routes/postRouter');
const userRouter = require('./routes/userRouter');
const cors = require('cors');
const session = require('express-session');



connectDb();
const app = express();

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);


const corsOptions = {
  origin: 'http://localhost:3001',
  credentials: true,
};

app.use(cors(corsOptions));

const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/posts',postRouter);
app.use('/api/users',userRouter); 

app.listen(port, () => {
  console.log(`Server connected on port ${port}`);
})