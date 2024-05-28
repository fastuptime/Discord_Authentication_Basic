module.exports = function(req, res, next) {
    if (req.isAuthenticated()) {
        req.user = req.session.passport.user;
        return next();
    }
    res.redirect('/auth/login?redirect=' + req.originalUrl);
}