const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");




const productRoutes = require('./api/routes/product');
const orderRoutes = require('./api/routes/order');
const userRoutes = require('./api/routes/user');
const projectRoutes = require('./api/routes/projects');
const projectmemRoutes =  require('./api/routes/projectmembers');
const shareproj =  require('./api/routes/shareProject');
const task = require('./api/routes/tasks');
const auth = require('./api/routes/auth');



app.use(morgan('dev'));
app.use('/uploads/', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Mongo Connection

mongoose.connect('mongodb://sheha:1455@cluster0-shard-00-00-yhaqs.mongodb.net:27017,cluster0-shard-00-01-yhaqs.mongodb.net:27017,cluster0-shard-00-02-yhaqs.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',(err)=>{
    if(err){
      console.log(err);
      process.exit(-1);
    }
    console.log("Connect to the DB");
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
  });




app.use('/product', productRoutes);
app.use('/order', orderRoutes);
app.use('/user', userRoutes);
app.use('/projects',projectRoutes);
app.use('/projectmem',projectmemRoutes);
app.use('/share',shareproj);
app.use('/task',task);
app.use('/auth',auth);









app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status=404;
    next(error);

})
app.use((error, req, res, next)=>{
res.status(error.status || 500);
res.json({
    error: {
        message : error.message
    }
})
})
//References https://www.youtube.com/playlist?list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q

module.exports = app;
