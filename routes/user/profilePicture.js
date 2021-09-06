const fs = require("fs")
const users = require("../../user")

const updateProfilePicture = async (req, res) => {
    users.forEach(myFunction);
    function myFunction(value) {
        if (value.name == req.user.name) {
            value.profile_picture = req.file
        }
    }
    fs.writeFile('user.json', JSON.stringify(users), err => {
        if (err) {
            res.send(err)
        } else {
            res.send("Profile picture updated successfully")
        }
    })
}

module.exports = {
    updateProfilePicture
}