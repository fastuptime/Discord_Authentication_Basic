module.exports = function() {
    app.use('/auth', require('./auth'));
    global.checkAuth = require('../functions/checkAuth');
    app.use('/', require('./index'));

    app.use('*', (req, res) => {
        res.status(400).send(`<center><h1>404 Not Found</h1></center>`);
    });
}