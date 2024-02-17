// Set dependencies
const express = require('express');

// Link server to route files
const apiRoutes = require('./routes/apiRoutes');
const getRoutes = require('./routes/getRoutes');

// Initialize server via express
const app = express();

// Set PORT
const PORT = process.env.PORT || 3001;

// Parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', getRoutes);

// Set active listener
app.listen(PORT, () => {
    console.log(`Server is now running on Port ${PORT}`);
});