require('dotenv').config()
const mongoose = require('mongoose');

const DB_NAME = process.env.REACT_APP_MONGO_DB_NAME;
const DB_PASS = process.env.REACT_APP_MONGO_DB_PASS;
const DB_USER = process.env.REACT_APP_MONGO_DB_USER;

const DB = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.8splu.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;


mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Connection Started with MONGO_DB");
}).catch((exception)=>{
    console.log(exception.message);
})