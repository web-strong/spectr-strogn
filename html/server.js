const express = require('express');
const app = express();

app.use(express.static('temp'));

app.listen(3000,()=>console.log(`listen 3000`));