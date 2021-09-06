const express = require('express')
const app = express();
require('dotenv').config()
const port = process.env.PORT;
const users = require("./user")
const routes=require('./routes')

const bodyparse = require('body-parser');
app.use(bodyparse.json())
app.use(bodyparse.urlencoded({ extended: true }));

var passport = require("passport");
app.use(passport.initialize());
require("./middleware/jwt-check")(passport);

const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'uploads')))

app.use('/api',routes())
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Hi!'
  })
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`)
})