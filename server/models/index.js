import mongoose from 'mongoose';
import fs from 'fs-extra';
import { basename, extname } from 'path';
import configs from '../config/config';

const config = configs[process.env.ENV_SHORT];

let db;
try {
  db = mongoose.connect(`mongodb://${config.user}:${config.pass}@localhost/${config.db}?authSource=admin`);
} catch (e) {
  console.log('Error: Could not connect to database.');
  throw e;
}

const exclude = [
  'index',
  'BlogComment',
  'db',
  'mongoose'
];

const models = {};

fs.readdirSync(__dirname)
  .map((filepath) => {
    return basename(filepath, extname(filepath));
  }).filter((filename) => {
    return !exclude.includes(filename);
  }).forEach((filename) => {
    models[filename] = mongoose.model(filename, require(`./${filename}`));
  });

models.db = db;
models.mongoose = mongoose;

export default models;
