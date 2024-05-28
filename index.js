require('./functions/modules')();

app.listen(8000, () => {
    log.systemLog('Discord dashboard - live');
});