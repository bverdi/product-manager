# product-manager

Application built with Node.js, Serverless Framework. 
CSV importer also included, using csv-parser and streams. 

Tests using Mocha and Instanbul for coverage.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run the API locally
```
npm run local
```

### Run the Importer
```
node product.importer.js
```

### Run your tests
```
npm run test
```

### Test with coverage
```
nyc --reporter=html --reporter=text mocha
```
### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
