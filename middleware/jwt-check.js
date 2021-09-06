const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const users = require('../user')

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "anystring"

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            const u = users.filter((user) => user.name == jwt_payload.name)
            //console.log(u)
            if (u[0]) {
                return done(null, u[0]);
            }
            return done(null, false);
        })
    )
}
