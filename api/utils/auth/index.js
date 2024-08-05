const passport = require('passport')

const LocalStrategy = require('./strategies/local.strategy')
const JwtStrategyStrategy = require('./strategies/jwt.strategy')

passport.use(LocalStrategy)
passport.use(JwtStrategyStrategy)

