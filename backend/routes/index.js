const routes = require('express').Router();
const contact = require('./contact');

routes.use('/', require('./swagger'));
routes.use('/contacts', contact);
routes.use(
    '/',
    (docData = (req, res) => {
        let docData = {
            documentationURL: 'https://angelasmilford.github.io/cse341-w04-contacts-api',
        };
        res.send(docData);
    })
);

module.exports = routes;