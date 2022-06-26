require("dotenv").config();
const express = require('express');
const app = express();
require('./db/connection');
const cors = require('cors');
const articles = require('./models/articlesSchema');
const router = require('./routes/router');
const bodyParser = require('body-parser');

const port = 8004;
app.use(cors());
app.use(bodyParser.json({limit: '8mb'}));
app.use(bodyParser.urlencoded({limit: '8mb', extended: true}));
app.use("/", router);

app.listen(port, ()=>{
    console.log("server is running on PORT="+port);
})