var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


//route 
var index = require('./app_server/routes/index');
var login = require('./app_server/routes/login');
var postLogin = require('./app_server/routes/postLogin');
var adminLogin = require('./app_server/routes/adminLogin');
var postLoginAdmin = require('./app_server/routes/postLoginAdmin');
var mainMenu = require('./app_server/routes/mainMenu');
var mainMenuAdmin = require('./app_server/routes/mainMenuAdmin');

var app = express();

//view engine setup
app.set('views',path.join(__dirname, 'app_server', 'views'));
app.set('view engine','jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// session cookie
app.use(session({ secret: 'keyboard car', cookie: { maxAge: 60000 } }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/login',login);
app.use('/adminLogin',adminLogin);
app.use('/postLogin',postLogin);
app.use('/postLoginAdmin',postLoginAdmin);
app.use('/mainMenu',mainMenu);
app.use('/mainMenuAdmin',mainMenuAdmin);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

app.listen(8080, function() {
    console.log("Server running");
});