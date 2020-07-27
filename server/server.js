var express = require('express');
var path=require('path');
var products_route=require('./routes/products_route');
var dotenv=require('dotenv');
var config=require('./config');
var mongoose=require('mongoose');
var userRoute=require('./routes/user_route');
var bodyParser=require('body-parser');
var productRoute=require('./routes/products_route');
var orderRoute=require('./routes/order_route');
var uploadRoute=require('./routes/upload_route')

const mongodbUrl = config.MONGODB_URL;
mongoose
    .connect(mongodbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .catch((error) => console.log(error.reason));

const app = express();
app.use(bodyParser.json());
app.use('/api/uploads', uploadRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.get('/api/config/paypal', (req, res) => {
    res.send(config.PAYPAL_CLIENT_ID);
});
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname, '/../server/')));
app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../server/uploads/`));
});

app.listen(8001, function() {
    console.log('Server working on port 8001');
});