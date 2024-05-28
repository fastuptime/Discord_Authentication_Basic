module.exports = function(bodyParser, express) {
    app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
    app.use(bodyParser.json());
    app.use(require('express-useragent').express());
    app.use(helmet({
        contentSecurityPolicy: false,
    }));
    
    app.set('views', './www');
    app.set('view engine', 'ejs');
}