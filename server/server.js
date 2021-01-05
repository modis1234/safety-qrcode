const express = require('express');
const app = express();
var path = require("path");
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;

const indexRouter = require('./routes/index');
const bridgeRouter = require('./routes/bridgeRouter');
app.use(cors());

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use('/api', indexRouter);
app.use('/bridge', bridgeRouter);

app.listen(port, ()=>{
    console.log(`express in running on ${port}`);
});

