const router = require('express').Router();
const passport = require('passport');
const session = require('express-session');
var DiscordStrategy = require('passport-discord').Strategy;

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // 2 weeks
    }
}));

passport.use(new DiscordStrategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL,
    scope: ['identify', 'guilds', 'email', 'connections']
}, async function(accessToken, refreshToken, profile, done) {
    let user = await userModel.findOne({ userID: profile.id });
    if (!user) {
        var newUser = new userModel({
            userID: profile.id,
            guilds: profile.guilds,
            email: profile.email,
            connections: profile.connections,
        });
        newUser.save();
        return done(null, newUser);
    } else {
        user.guilds = profile.guilds;
        user.email = profile.email;
        user.connections = profile.connections;
        user.save();
        return done(null, user);
    }
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

router.get('/login', passport.authenticate('discord', { scope: ['identify', 'guilds', 'email', 'connections'] }), function(req, res) {});

router.get('/callback', function(req, res, next) {
passport.authenticate('discord', {
    successRedirect: '/',
    failureRedirect: '/'
})(req, res, w => {
    console.log(w);
    if(w) return res.send(`<center><h1>Something went wrong. Please try again later.</h1></center>`);
})});

app.use(passport.initialize());
app.use(passport.session());

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;