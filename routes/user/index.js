const routes=require('express').Router()
var passport = require("passport");
const {validateUser} = require('../../middleware/validation');
var multer = require('multer');
var upload = multer({dest:'uploads/'});

module.exports=()=>{
    routes.post('/signin',validateUser,require('./signin').register)
    routes.post('/login',require('./login').login)
    routes.get('/profile',passport.authenticate("jwt", { session: false }),require('./profile').profile)
    routes.get('/:name',passport.authenticate("jwt", { session: false }),require('./other').viewOtherUser)
    routes.put('/password_change/:pass',passport.authenticate("jwt", { session: false }),require('./changePassword').changePassword)
    routes.put('/mobileNumber_change/:mobile',passport.authenticate("jwt", { session: false }),require('./changeMobile').changeMobile)
    routes.post('/profilepicture/',upload.single('profile'),passport.authenticate("jwt", { session: false }),require('./profilePicture').updateProfilePicture)
    return routes
}