const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const users = require("../../user")

const viewOtherUser= async (req, res) => {
    const uprofile= users.filter((u) => u.name== req.params.name)
    if (uprofile.length>0){
        const user1=uprofile[0]
        res.status(200).json({
            name: user1.name,
            email:user1.email,
            mobile:user1.mobile,
            profile_picture:user1.profile_picture
          })
    }
    else{
        res.send("user not found")
    }
}

module.exports = {
    viewOtherUser
}