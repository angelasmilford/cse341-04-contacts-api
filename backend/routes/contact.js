const routes = require('express').Router();
const contacts = require('../controllers/contact.js');

// GET all contacts
routes.get('/', contacts.findAll);

// GET contact by ID
routes.get('/:contact_id', contacts.findOne);

// POST contact
routes.post('/', contacts.create);

// PUT contact
routes.put('/:contact_id', contacts.update);

// DELETE contact
routes.delete('/:contact_id', contacts.delete);

// DELETE all contacts
routes.delete('/', contacts.deleteAll);

// GET all published contacts
routes.get('/', contacts.findAllPublished);

module.exports = routes;
