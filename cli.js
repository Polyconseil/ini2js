#!/usr/bin/env node

/* Converts .ini files to a JS script executable in a browser. */

'use strict'

const util = require('util')

const minimist = require('minimist')

const lib = require('.')


// Parameters
const argv = minimist(process.argv.slice(2))
const filenames = argv._.sort() || ['src/settings.ini']
const namespace = argv.namespace || '__SETTINGS__'

const config = lib.parseConfig(filenames)

console.log(util.format('window.%s = %s;', namespace, JSON.stringify(config)))
