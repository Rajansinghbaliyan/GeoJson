const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const place = require("./routes/place");
const area = require("./routes/area");

require("./model/place");
require("./model/area");

const app = express();

app.use(bodyParser.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/app/v1/places',place);
app.use('/app/v1/areas',area);

app.use((error,req,res,next)=>{
  const stack = error.stack.split("\n")[0] + error.stack.split("\n")[1] ;
  console.log(stack);
  res.status(error.statusCode).json({
    status:'fail',
    message: error.message,
    stack
  })
})

module.exports = app;
