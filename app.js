require('./models/db');
var createError = require('http-errors');
var express = require('express');
const exphbs = require('express-handlebars');
var express_handlebars_sections = require('express-handlebars-sections');
const bodyparser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');


var accountRouter = require('./routes/account');
var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
var doctorRouter = require('./routes/doctors');
var patientRouter = require('./routes/patients');
var locationRouter = require('./routes/location');
var healthcareserviceRouter = require('./routes/healthcareservice');
var organizationRouter = require('./routes/organization');
var conerenceRouter = require('./routes/conference');
var addressRouter = require ('./routes/address');
var activitydefinitionRouter = require('./routes/activitydefinition');
var connectorrequestRouter = require ('./routes/connectorrequest');
var allergyintoleranceRouter = require ('./routes/allergyintolerance');
var appointmentRouter = require ('./routes/appointment');
var appointmentresponseRouter = require ('./routes/appointmentresponse');
var attachmentRouter = require ('./routes/attachment');
var blocklistRouter = require ('./routes/blocklist');
var friendRouter = require ('./routes/friend');
var friendlistRouter = require ('./routes/friendlist');
var friendrequestRouter = require ('./routes/friendrequest');

var videoRouter = require('./routes/video');
var supply_requestRouter = require('./routes/supply_request');
var patientadminRouter = require('./routes/patient_administration');
var recordRouter = require('./routes/record');
var diseasesRouter = require('./routes/diseases');
var treatmentadvisesRouter = require('./routes/treatmentadvises');
var suggestorganizationRouter = require('./routes/suggestorganization');


var app = express();

// view engine setup
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
///
app.engine('hbs', exphbs(
{ 
  extname: 'hbs', 
  defaultLayout: 'mainLayout', 
  helpers: require("./config/helpers.js").helpers,
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/layouts/',
  section: express_handlebars_sections()  
}));

//app.set('view engine', 'pug');
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public/'));
//
app.use(cookieParser());
app.use(session({
    secret: "application_secret",
    resave: false,
    saveUninitialized: false
}));
app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});
//routes
var authencation = function (req, res, next) {
  req.requestTime = Date.now();
  next()
}
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(authencation);

app.use('/', indexRouter);
app.use('/accounts', accountRouter);
app.use('/users', userRouter);
app.use('/doctors', doctorRouter);
app.use('/patients', patientRouter);

app.use('/locations', locationRouter);
app.use('/healthcareservice', healthcareserviceRouter);
app.use('/organization', organizationRouter);
app.use('/conference', conerenceRouter);
app.use('/address', addressRouter );
app.use('/activitydefinition',activitydefinitionRouter);
app.use('/connectorrequest',connectorrequestRouter);
app.use('/allergyintolerance',allergyintoleranceRouter);
app.use('/appointment',appointmentRouter);
app.use('/appointmentresponse',appointmentresponseRouter);
app.use('/attachment',attachmentRouter);
app.use('/blocklist',blocklistRouter);
app.use('/friend',friendRouter);
app.use('/friendlist',friendlistRouter);
app.use('/friendrequest', friendrequestRouter);
app.use('/patient_administrations', patientadminRouter);
app.use('/records', recordRouter);
app.use('/listdiseases', diseasesRouter);
app.use('/treatmentadvises', treatmentadvisesRouter);
app.use('/suggestorganization', suggestorganizationRouter);



app.use('/videos', videoRouter);
app.use('/supply_requests', supply_requestRouter);

app.use('/node_modules', express.static(__dirname + '/node_modules'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
