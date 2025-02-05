//index.js
const express = require('express');
const app = express();

console.log(app)

app.listen(3000, () => {
      console.log('server listening on port 3000')
})

app.get('/', (req, res) => {
    res.send('Hello from our server! Hello world, from Snet')
})
