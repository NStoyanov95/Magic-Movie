const express = require('express');
const path = require('path');

const dbConnect = require('./config/dbConfig');
const handlebarsConfigurator = require('./config/handlebarsConfig');
const expressConfigurator = require('./config/expressConfig')

const routes = require('./routes');

const PORT = 3030;

const app = express();

dbConnect()
    .then(() => { console.log('Db connected!') })
    .catch(err => { console.log(err) })


handlebarsConfigurator(app);
expressConfigurator(app);

app.use(routes);

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));