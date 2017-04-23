import mongoose from 'mongoose';
import fs from 'fs-extra';
import { basename, extname } from 'path';

let db;

try {
  db = mongoose.connect(process.env.MONGO_DB_URI);
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
