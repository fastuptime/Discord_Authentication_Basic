module.exports = async function() {
    mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection.on('error', console.error.bind(console, 'connection mongodb error:'));
    mongoose.connection.once('open', function() {
        log.systemLog("MongoDB Bağlantısı Başarılı", "green");
    });

    global.userModel = require('../models/user');
};