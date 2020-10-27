var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
const User = require('../model/User')
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
module.exports = passport =>{
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findById(jwt_payload.id)
            .then(user=>{
                if(user){
                    return done(null, user);
                }else {
                    return done(null, false);
                    // or you could create a new account
                }
            })
    }));
}

