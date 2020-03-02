/* eslint-disable no-undef */
'use strict';

//
// DEPENDENCIES
const fs = require('fs');
const request = require('request-promise');
const csv = require('csv-parser');
const http = require('http');
//

///////LOCAL VARIABLES////////
const arr = [];

///////DATA MANIPULATION//////
let date = new Date().toString();
date = date.replace('GMT-0300 (GMT-03:00)', '');
date = date.replace(':', '');
date = date.replace(':', '');
date = date.replace(/\s/g, '');
const title = 'log-' + date + '.txt';
//////////////////////////////////

http.createServer(async function () {
  try {
    await importCsvAndRegister();
  }
  catch (error) {
    console.error(error);
  }
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

const createLog = async function (arr) {

  var stream = fs.createWriteStream(title, { flags: 'a' });
  for (let i = 0; i < arr.lengthc; i++) {
    stream.write(arr[i] + '\r\n');
    console.log('Appended to file');
  }
  stream.end();
};

const importCsvAndRegister = async function () {
  const results = [];
  let alreadyStreamed = false;
  const readable = fs.createReadStream('import-compact.csv', { autoClose: true });
  readable.pipe(csv({ separator: ';' }))
    .on('data', async (data) => {
      if(alreadyStreamed == false){
        results.push(data);
        console.log(results);
      }
      else {
        readable.destroy();
      }
    })
    .on('end', async () => {
      alreadyStreamed = true;
      const result = results;
      console.log(results.length);
      for (let i = 0; i<results.length; i++) {
        const categoryList = result[i].categoria.split('|');
        var options = {
          'method': 'POST',
          'url': 'http://localhost:3002/products',
          'headers': {
            'x-api-key': 'local',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 'name': result[i].nome, 'sku': result[i].sku, 'description': result[i].descricao, 'quantity': result[i].quantidade, 'price': result[i].preco, 'category': categoryList })
        };
        console.info('PROCESSING PRODUCT: ' + result[i].nome + ';' + result[i].sku);
        await request(options)
          .then(async function () {
            arr.push('Product created:' + result[i].nome + ';' + result[i].sku);
            console.info('PRODUCT PROCESSED: ' + result[i].nome + ';' + result[i].sku);
          })
          .catch(function (err) {
            arr.push('Error when creating product:' + result[i].nome + ';' + result[i].sku);
            console.error('ERROR WHEN PROCESSING PRODUCT: ' + result[i].nome + ';' + result[i].sku);
            console.log(err);
          });
      }
      await createLog(arr);
    })
    .on('close', () => {
      console.info('COMPLETED PROCESSING');
    });
};



module.export = {
  createLog,
  importCsvAndRegister
};