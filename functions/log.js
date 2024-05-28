function systemLog(message, type = 'green') {
    console.log(colors.grey(`[${dayjs().format('[LOG] YYYY-MM-DD HH:mm:ss')}]`) + ' ' + colors[type](message));
    fs.appendFileSync(`logs/${dayjs().format('MM-YYYY')}.log`, `[${dayjs().format('[LOG] YYYY-MM-DD HH:mm:ss')}] ${message}\n`);
}

module.exports = {
    systemLog
}