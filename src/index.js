const express = require('express');
const path = require('path');

const handlebarsConfigurator = require('./config/handlebarsConfig');
const expressConfigurator = require('./config/expressConfig')

const routes = require('./routes');

const PORT = 3030;
const app = express();

handlebarsConfigurator(app);
expressConfigurator(app)

app.use(routes);

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));