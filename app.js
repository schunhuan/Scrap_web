const express = require('express')
const dailynewsRouter = require("./src/routes/scrap");
const app = express()

app.use(dailynewsRouter);

exports.app = app;