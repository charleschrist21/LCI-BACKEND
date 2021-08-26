const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const admin = require('./Routes/adminRouter')
const jurnal = require('./Routes/jurnalRouter')
const login = require('./Routes/loginRouter')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/admin", admin)
app.use("/api/jurnal", jurnal)
app.use("/api/signin", login)

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const server = app.listen(5000, function () {

  const host = server.address().address
  const port = server.address().port

  console.log("App listening at http://%s:%s", host, port)
})