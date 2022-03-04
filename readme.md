# Warcraftlogs Ad-remover script


## How to use
1. Either use the binary (found in the Github releases for this project) or make sure you have the latest NodeJS LTS installed. (https://nodejs.org/en/download/)
2. Open a terminal in the directory of this file.

Then:
### run `npm install .`
### run `node index.js`

This will create a `config.json` file (if not present) you need to fill out with the path to the Warcraftlogs app.asar package.
The standard value is the path for a system install, so if you do not use this it has to be modified.

After updating the config file, run the script again in the terminal:

### run `node index.js`
The script will unpack the warcraftlogs app, modify it slightly to never show ads, and repack it into an `app.asar` file.

## Replace the generated `app.asar` file with the one present in the path you gave in the config file



