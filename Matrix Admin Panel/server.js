const express = require('express');
const cookieParser = require('cookie-parser')
const path = require('path')
const port = 8080
const app = express();
const connectDataBase = require('./config/dbConnect')
const session = require("express-session");
const passport = require("./Controller/localStrategy");


app.set('view engine', 'ejs');

connectDataBase();
app.use(express.urlencoded({}));
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

app.use(session({
    secret: "secret98",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());




app.use('/auth', require('./routes/auth.routes'))
app.use('/admin', require('./routes/admin.routes'))
app.use('/category', require('./routes/category.routes'))
app.use('/subcategory', require('./routes/subcategory.routes'))
app.use('/extracategory', require('./routes/extracategory.routes'))
app.use('/product', require('./routes/product.routes'))
app.use('/', require('./routes/index.routes'))

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})
