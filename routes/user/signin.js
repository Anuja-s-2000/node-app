const fs = require("fs")
const bycrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const users = require("../../user")

const register = async (req, res) => {
  var newUser = req.body
  var fuser = users.filter((user) => (user.name == newUser.name) || (user.email == newUser.email) || (user.mobile == newUser.mobile))
  if (!(fuser.length > 0)) {
    const salt = await bycrypt.genSalt(10);
    newUser.password = await bycrypt.hash(newUser.password, salt)
    users.push(newUser)
    fs.writeFile('user.json', JSON.stringify(users), err => {
      if (err) {
        res.send(err.message)
      } else {
        const payload = {
          name: newUser.name
        }
        jwt.sign(
          payload,
          "anystring",
          { expiresIn: 3600 },
          (err, token) => {
            if (err) {
              res.send(err)
            }
            res.json({
              success: true,
              token: "Bearer " + token,
              newUser
            });
          }
        );
      }
    })
  }
  else {
    res.send("user name or email or mobile already exists")
  }
}

module.exports = {
  register
}