'use strict'

const fs = require('fs')

const ini = require('ini')


function cast(value) {
  try {
    return JSON.parse(value.toLowerCase())
  } catch (e) {
    return value
  }
}

function parseConfig(filenames) {
  // Merge all settings together
  const config = {}
  filenames.forEach(function(filename) {
    const parsed = ini.decode(fs.readFileSync(filename, 'utf-8'))
    for (var section in parsed) {
      config[section] = config[section] || {}
      if (typeof parsed[section] !== 'object') {
        throw new Error("Global section keys are unsupported")
      }
      for (var key in parsed[section]) {
        const strValue = parsed[section][key]
        if (typeof strValue == 'object') {
          throw new Error("Keyed sections are unsupported")
        }
        config[section][key] = cast(strValue)
      }
    }
  });
  return config
}

module.exports = {parseConfig: parseConfig}
