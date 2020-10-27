var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
// 引入model/User
const User = require('../model/WebUser')
module.exports = passport =>{
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({id: jwt_payload.sub})
                    .then(res=>{
                        if(res){
                            return done(null, user);
                        }else{
                            return done(null, false);
                        }
                    })
    }));
}