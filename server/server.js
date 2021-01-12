const express = require('express');
const app = express();
var path = require("path");
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;

var session = require('express-session');
var MySQLStore = require('express-mysql-session');

const indexRouter = require('./routes/index');
const accountRouter = require('./routes/accountRouter');
const bridgeRouter = require('./routes/bridgeRouter');
const tunnelRouter = require('./routes/tunnelRouter');
const structureRouter = require('./routes/structureRouter');
const equipmentRouter = require('./routes/equipmentRouter');
const workerRouter = require('./routes/workerRouter');


app.use(cors());

const dbconfig = require('./routes/config/database');

var sessionStore = new MySQLStore(dbconfig);
app.use(session({
  secret: "asdfasdfdas",
  resave: false,
  saveUninitialized: false,
  store: sessionStore
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use('/api', indexRouter);
app.use('/account', accountRouter);
app.use('/bridge', bridgeRouter);
app.use('/tunnel', tunnelRouter);
app.use('/structure', structureRouter);
app.use('/equip', equipmentRouter);
app.use('/worker', workerRouter);

app.listen(port, ()=>{
    console.log(`express in running on ${port}`);
});

