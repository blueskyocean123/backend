const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const bodyparser = require('body-parser');

const userRouter = require('./routers/user');
const blogRouter = require('./routers/blog');
const imageRouter = require('./routers/image');

const app = express();
app.use(express.static('./public/uploads'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 4036);

app.use('/user', userRouter);
app.use('/blog', blogRouter);
app.use('/image', imageRouter);
