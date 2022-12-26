require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const fileUpload = require("express-fileupload");
app.use(fileUpload({ useTempFiles: true, tempFileDir: process.env.tmpPath }))
const userRouter = require('./routes/userRouter');
const categoryRouter = require('./routes/categoryRouter');
let ConnectToDB = require('./config/databaseConnect.js');
ConnectToDB = new ConnectToDB();
ConnectToDB.config();
app.use(express.json());
app.use('/api/v1/user/', userRouter);
app.use('/api/v1/category/', categoryRouter);


app.listen(process.env.PORT);