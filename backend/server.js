const express = require('express');
const cors = require('cors');
// const contactsRoutes = require('./routes/contact');

const app = express();
const port = process.env.PORT || 8080;

// const swaggerAutogen = require('swagger-autogen')();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use('/', require('./routes'))    
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    // .use('/contacts', contactsRoutes)

const db = require('./models');
db.mongoose
    .connect(db.url)
    .then(() => {
        console.log('Database connected successfully!');
    })
    .catch((err) => {
        console.log('Failed to connect to the database:', err);
        process.exit();
    });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});