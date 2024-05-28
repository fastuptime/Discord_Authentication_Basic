function checkLogsFolder() {
    if (!fs.existsSync('logs')) {
        fs.mkdirSync('logs');
    }
}

function zipLogs() {
    const archiver = require('archiver');
    const month = dayjs().subtract(1, 'month').format('MM-YYYY'); 
    if (fs.existsSync(`logs/${month}.log`)) {
        const output = fs.createWriteStream(`logs/${month}.zip`);
        const archive = archiver('zip', {
            zlib: { level: 9 }
        });
        output.on('close', () => {
            fs.unlinkSync(`logs/${month}.log`);
            log.systemLog(`${month}.log zipped`, 'green');
        });
        archive.pipe(output);
        archive.file(`logs/${month}.log`, { name: `${month}.log` });
        archive.finalize();
    }
}

module.exports = {
    checkLogsFolder,
    zipLogs
}