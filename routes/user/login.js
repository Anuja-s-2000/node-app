const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const users = require("../../user")

const login = async (req, res) => {
    var newUser = {};
    newUser.name = req.body.name;
    newUser.password = req.body.password;

    var fuser1 = users.filter((user) => user.name == newUser.name)
    const fuser = fuser1[0]
    if (fuser) {
        bcrypt.compare(
            newUser.password,
            fuser.password,
            async (err, result) => {
                if (err) {
                    res.send(err.message)
                }
                else if (result == true) {
                    const payload = {
                        name: fuser.name
                    };
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
                                token: "Bearer " + token
                            });
                        }
                    );
                }
                else {
                    res.send("User Password wrong - Unauthorized Access");
                }
            }
        )
    }
    else {
        res.send("User not found");
    }
}

module.exports = {
    login
}