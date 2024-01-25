const hbs = require('express-handlebars');
const path = require('path');

function handlebarsConfigurator(app) {
    app.engine('hbs', hbs.engine({
        extname: 'hbs',
    }));
    app.set('view engine', 'hbs');
    app.set('views', path.join(__dirname, '../', 'views'));

    return app;
};

module.exports = handlebarsConfigurator;