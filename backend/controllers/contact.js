const db = require('../models');
const Contact = db.contacts;

const apiKey = 'mySuperSecretApiKey123456';

exports.create = (req, res) => {
    // Validate request
    if (
        !req.body.contact_id ||
        !req.body.firstName || 
        !req.body.lastName || 
        !req.body.email || 
        !req.body.favoriteColor || 
        !req.body.birthday
    ) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
    }

    // Create a Contact
    const contact = new Contact({
        contact_id: req.body.contact_id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
    });
    // Save Contact in the database
    contact
        .save(contact)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: 
                    err.message || 'Some error occured while creating the Contact.',
            });
        });
};

exports.findAll = (req, res) => {
    console.log(req.header('apiKey'));
    if(req.header('apiKey') === apiKey) {
        Contact.find(
            {},
            {
                contact_id: 1,
                firstName: 1,
                lastName: 1,
                email: 1,
                favoriteColor: 1,
                birthday: 1,
                _id: 0,
            }
        )
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message || 'Some error occured while retrieving contacts.',
                });
            });
    } else {
        res.send('Invalid apiKey, please read the documentation.');
    }
};

// Find a single Contact with an id
exports.findOne = (req, res) => {
    const contact_id = req.params.contact_id;
    if(req.header('apiKey') === apiKey) {
        Contact.find({ contact_id: contact_id })
            .then((data) => {
                if(!data)
                    res
                        .status(404)
                        .send({ message: 'Not found Contact with id' + contact_id });
                else res.send(data[0]);
            })
            .catch((err) => {
                res.status(500).send({
                    message: 'Error retrieving Contact with contact_id=' + contact_id,
                });
            });
    } else {
        res.send('Invalid apiKey, please read the documentation.');
    }
};

// Update a Contact by the id in the request
exports.update = (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: 'Data to update can not be empty!',
        });
    }

    const contact_id = req.params.contact_id;

    Contact.findOneAndUpdate(
        { contact_id: contact_id },
        req.body,
        { new: true }
    )
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Contact with contact_id=${contact_id}.`,
                });
            } else {
                res.send({
                    message: 'Contact was updated successfully.',
                    data
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating Contact with contact_id=' + contact_id,
            });
        });
};

// Delete a Contact with the specified id in the request
exports.delete = (req, res) => {
    const contact_id = req.params.contact_id;

    Contact.findOneAndDelete({ contact_id: contact_id })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Contact with contact_id=${contact_id}.`,
                });
            } else {
                res.send({
                    message: 'Contact was deleted successfully!',
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Could not delete Contact with contact_id=' + contact_id,
            });
        });
};

// Delete all Contacts from the database.
exports.deleteAll = (req, res) => {
    Contact.deleteMany({})
        .then((data) => {
            res.send({
                message: `${data.deletedCount} Contacts were deleted successfully!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while removing all contact.',
            });
        });
};

// Find all published contacts
exports.findAllPublished = (req, res) => {
    Contact.find({ published: true })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving contact.',
            });
        });
};