const fs = require('fs');
const path = require('path');
const asar = require('asar');

const getConfig = function () {
    if (!fs.existsSync('config.json')) {
        fs.writeFileSync(
            'config.json',
            JSON.stringify(
                {
                    warcraftlogs_asar_path: 'C:\\Program Files\\Warcraft Logs Uploader\\resources\\app.asar',
                },
                void 0,
                4,
            ),
        );
        throw new Error('Created a new config. Fill in the information to start.');
    }

    return JSON.parse(fs.readFileSync('config.json'));
};

const { warcraftlogs_asar_path } = getConfig();

const src_path = './warcraftlogs_src';
asar.extractAll(warcraftlogs_asar_path, src_path);

fs.readFile(src_path + '/main-view.js', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    const result = data.replace(/this._adService.showAd\(\);/g, 'this._adService.hideAd();');

    fs.writeFile(src_path + '/main-view.js', result, 'utf8', function (err) {
        if (err) return console.log(err);
    });
});

const new_asar = './app.asar';

asar.createPackage(src_path, new_asar).then(() => {
    console.log('Generated ./app.asar with ads disabled, replace it in ' + `"${warcraftlogs_asar_path}"`);
    fs.rmSync(src_path, { recursive: true, force: true });
});
