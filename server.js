const express = require('express');
const handlebars = require('express-handlebars'); // templating
const path = require('path');
const fspromise = require('fs-promise');


const application = express();

/**
 * Server definition files
 */
const definitionFiles = {
    root: "static/definitions",
    common: "common-definitions.json",
    backend: "backend-definitions.json",
    servicesRoot: "services"
};

// 1 - Serve static resources (index.html)
application.use('/', express.static(path.join(__dirname, 'static/client')));

// 2 - Serve definitions as definitions file concatenation (so that the client emits only one request)
application.get('/definitions', function (req, res) {

    // 1 - list files in services definition folder
    let servicesRoot = `${definitionFiles.root}/${definitionFiles.servicesRoot}`;
    fspromise.readdir(servicesRoot).then(files => {
        // prepare files to read
        let serviceFiles = files
            .filter(fileName => fileName.match(/.*\.json/))
            .map(fileName => `${servicesRoot}/${fileName}`);
        let filesToLoad = [
            `${definitionFiles.root}/${definitionFiles.common}`,
            `${definitionFiles.root}/${definitionFiles.backend}`,
        ].concat(serviceFiles);

        // read all
        Promise.all(filesToLoad.map(filePath => fspromise.readFile(filePath)))
            .then(loadedFiles => {
                let asJSONObjects = loadedFiles.map(content => JSON.parse(content));
                let responseObject = (([commonDefinitions, backendDefinition, ...serviceDefinitions]) => {
                    // bundle the object together
                    let responseObject= {};
                    Object.assign(responseObject, commonDefinitions);
                    Object.assign(responseObject, backendDefinition);
                    responseObject.services = serviceDefinitions;
                    return responseObject
                })(asJSONObjects);
                res.send(responseObject);
            }).catch(e => {
            console.error(e);
            sendErrorMessage(500, res, "The server failed loading definition files. Please check server resources");
        });

    }).catch(e => {
        console.error(e);
        sendErrorMessage(500, res, "The server failed listing service definition files. Please check server resources");
    });

    /*Promise.all([
     fspromise.readFile('static/definitions/')
     ]).then(([commonDefinitionData]) => {
     res.send(commonDefinitionData).end();
     }).catch(() =>
     */
});

function sendErrorMessage(code, res, message) {
    res.writeHead(code, message, {'content-type': 'text/plain'});
    res.end(message);
};


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
