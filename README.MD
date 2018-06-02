# extract-media-type-parameters
simple way of extracting parameters from media-types/mime-types

## example
```javascript
const extractMediaTypeParameters = require('extract-media-type-paramaters')

const parameters = extractMediaTypeParameters('application/json;q=1;charset=utf-8;NAME="linus";noop=;')

console.log(parameters) // { q: '1', charset: 'utf-8', name: 'linus', noop: '' }
```
