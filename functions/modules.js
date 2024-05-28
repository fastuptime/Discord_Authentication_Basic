module.exports = function() {
    const bodyParser = require('body-parser');
    const express = require('express');
    global.config = require('../config.js');
    global.app = express();
    global.colors = require('colors');
    global.fs = require('fs');
    global.dayjs = require('dayjs');
    global.log = require('./log');
    global.other = require('./other');
    global.cron = require('node-cron');
    global.md5 = require('md5');
    global.mongoose = require('mongoose');
    global.Schema = mongoose.Schema;
    global.axios = require('axios');
    global.qs = require('qs');
    global.helmet = require('helmet');
    global.ejs = require('ejs');
    global.xss = require("xss"); // Anti - XSS JS
    require('./mongoLoad')();

    require('./cron')();

    require('./middleware')(bodyParser, express);
    other.checkLogsFolder();
    setTimeout(() => {
        require('../routers/routes.js')();
        log.systemLog("Routers Yüklendi", "green");
    }, 1000);
}