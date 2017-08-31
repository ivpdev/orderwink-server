const fs = require("fs")
const YAML = require('yamljs')

function readFile
(filepath, encoding){
    if (typeof (encoding) == 'undefined') {
        encoding = 'utf8' }

    return fs.readFileSync(filepath, encoding);
}

function readJson(file) {
    const filepath = __dirname + '/../../data/' + file
    return JSON.parse(readFile(filepath)) }

function readYaml(file) {
    const filepath = __dirname + '/../../data/' + file
    return YAML.parse(readFile(filepath))
}

const json = readJson('db.json')
const yaml = readYaml('db.yml')

function cafesFromFile() {
    return new Promise((resolve, reject) => resolve(yaml.cafes))}

module.exports = cafesFromFile