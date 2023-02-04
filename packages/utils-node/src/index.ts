// import chalk from '../compiled/chalk';
import chalk from 'chalk';
import fsExtra from '../compiled/fs-extra';
import lodash from '../compiled/lodash';
// import crossSpawn from '../compiled/cross-spawn';
// import inquirer from '../compiled/inquirer';
// import Mustache from '../compiled/mustache';
// import axios from '../compiled/axios';
// import fetch from '../compiled/node-fetch';
import crossSpawn from 'cross-spawn';
import inquirer from 'inquirer';
import Mustache from 'mustache';
import axios from 'axios';
import fetch from 'node-fetch';
import yParser from 'yargs-parser';
import semver from 'semver';
import * as logger from './logger';
export * from './isLocalDev';

export {
  /** only node */
  crossSpawn,
  semver,
  Mustache,
  chalk,
  inquirer,
  fsExtra,
  logger,
  yParser,
  fetch,
  /** all */
  axios,
  lodash,
};
