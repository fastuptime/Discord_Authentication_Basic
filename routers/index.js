const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('index', { user: req.user });
});

router.get('/servers', checkAuth, (req, res) => {
    res.render('servers', { user: req.user, servers: req.user.guilds });
});

router.get('/connections', checkAuth, (req, res) => {
    res.render('connections', { user: req.user, connections: req.user.connections });
});
module.exports = router;