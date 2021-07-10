import path from 'path';
require('dotenv').config({path: path.resolve(__dirname, '.env')});

module.exports = {
  client: 'mysql',
  connection: {
    host : process.env.DB_HOST,
    user : process.env.DB_USER, 
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
  },
  migrations: {
    directory : path.resolve(__dirname, 'src', 'database', 'migrations'),
  }
};