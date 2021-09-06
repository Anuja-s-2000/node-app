const fs = require("fs")
const users = require("../../user")

const changeMobile = async (req, res) => {
    const newMobile = req.params.mobile
    if (newMobile.toString().length == 10) {
        users.forEach(myFunction);
        function myFunction(value) {
            if (value.name == req.user.name) {
                value.mobile = req.params.mobile
            }
        }
        fs.writeFile('user.json', JSON.stringify(users), err => {
            if (err) {
                res.send(err)
            } else {
                res.send("Mobile number changed successfully")
            }
        })
    }
    else {
        res.send("Mobile number should have 10 numbers!")
    }
}

module.exports = {
    changeMobile
}