const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars'); // templating
var jsonfile = require('jsonfile')


const application = express();

// 1 - Serve static resources (index.html)
application.use('/', express.static(path.join(__dirname, 'static/client')));

// 2 - Serve definitions as definitions file concatenation (so that the client emits only one request)
application.get('/definitions', function (req, res) {
    jsonfile.readFile('static/definitions/common-definitions.json', function (err, obj) {
        if (err) {
            res.status(500).send('Internal server error');
        } else {

            // TODO: might be very wrong (not async) or even not needed, check me!
            // TODO load other data
            res.send(JSON.stringify(obj));
        }
    });
});


// 3 - Post interface to distant services
// TODO

// 4 - handle standard error cases (last middleware, to be used when no other matched)
application.engine('handlebars', handlebars({layout: false}));
application.set('view engine', 'handlebars');
application.set('views', 'static/client/templates');

application.use(function (request, response, next) {
    response.status(404).render('error.handlebars', {
        title: 'Page not found',
        detail: `404 - Page at "${request.originalUrl}" could not be found`
    });
});

// 5 - start server
application.listen(process.env.PORT || 8080);
