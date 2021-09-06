const fs = require("fs")
const bycrypt = require('bcryptjs')
const users = require("../../user")

const changePassword = async (req, res) => {
    var newPass = req.params.pass
    if (newPass.length >= 5) {
        const salt = await bycrypt.genSalt(10);
        newPass = await bycrypt.hash(newPass, salt)
        users.forEach(myFunction);
        function myFunction(value) {
            if (value.name == req.user.name) {
                value.password = newPass
            }
        }
        fs.writeFile('user.json', JSON.stringify(users), err => {
            if (err) {
                res.send(err)
            } else {
                res.send("Password changed successfully")
            }
        })
    }
    else {
        res.send("Password must be more that 5 characters!")
    }
}

module.exports = {
    changePassword
}