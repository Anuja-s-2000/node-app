const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const users = require("../../user")

const profile= async (req, res) => {
    res.status(200).json({
        name: req.user.name,
        email:req.user.email,
        mobile:req.user.mobile,
        "profile-picture":req.user.profile_picture
      });
}

module.exports = {
    profile
}