const fs = require('fs');
const wcl = require('./warcraftlogs');
const curseforge = require('./curseforge');

const getConfig = function () {
    if (!fs.existsSync('config.json')) {
        fs.writeFileSync(
            'config.json',
            JSON.stringify(
                {
                    warcraftlogs_asar_path: 'C:\\Program Files\\Warcraft Logs Uploader\\resources\\app.asar',
                    curseforge_asar_path: 'C:\\Program Files\\CurseForge\\resources\\app.asar',
                },
                void 0,
                4,
            ),
        );
        throw new Error('Created a new config. Fill in the information to start.');
    }

    return JSON.parse(fs.readFileSync('config.json', 'utf-8'));
};

const { warcraftlogs_asar_path, curseforge_asar_path } = getConfig();

if (curseforge_asar_path) {
    try {
        curseforge.ad_remove(curseforge_asar_path);
    } catch (error) {
        console.log(`Unable to fetch app.asar from ${curseforge_asar_path}`);
    }
}

if (warcraftlogs_asar_path) {
    try {
        wcl.ad_remove(warcraftlogs_asar_path);
    } catch (error) {
        console.log(`Unable to fetch app.asar from ${warcraftlogs_asar_path}`);
    }
}
