//use packages
var express=require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    app=express(),
 http = require('http').Server(app);
var admin = require('./routes/fone.js');
//use middleware
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json({
    limit: '9950mb'
}));
app.use(bodyParser.urlencoded({
    limit: '9950mb',
    extended: true
}));
app.use(bodyParser.json())
app.use(cookieParser());
app.use(session({
    secret: 'w5fone'
}));

app.get('/', admin.login);
app.get('/test', admin.test);
app.get('/home',admin.home);
app.get('/myinfo',admin.myinfo);
app.get('/signout',admin.signout);
app.post('/login',admin.loginPost); 
app.post('/setting',admin.settingPost); 
app.post('/change_password',admin.change_password); 
app.post('/change_bg_image',admin.change_bg_image); 


http.listen(2222);
console.log('server running on 2222');