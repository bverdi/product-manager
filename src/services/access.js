const pg = require('pg');
const log = require('log');

const DB_PM_HOST     = process.env.DB_PM_HOST;
const DB_PM_DATABASE = process.env.DB_PM_DATABASE;
const DB_PM_USER     = process.env.DB_PM_USER;
const DB_PM_PASSWORD = process.env.DB_PM_PASSWORD;
const DB_PM_PORT     = process.env.DB_PM_PORT;

const poolPM = new pg.Pool({
  database: DB_PM_DATABASE,
  user: DB_PM_USER,
  password: DB_PM_PASSWORD,
  host: DB_PM_HOST,
  port: DB_PM_PORT,
  max: 1,
  min: 0,
  ssl:true
});

const executeQuery = (consulta, params = []) => {
  return poolPM.connect()
    .then(client => {
      return client.query(consulta, params)
        .then(result => {
          client.release(true);
          return result.rows;
        })
        .catch(error => {
          client.release(true);
          log.error('executeQuery pm.db', error);
          return Promise.reject(error);
        });
    });
};

module.exports = {
  executeQuery
};