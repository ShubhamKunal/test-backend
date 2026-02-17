const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');

const app = express();

// CORS configuration - Allow all origins for easier Wix integration
// In production, you should specify the Wix domain.
app.use(cors());

app.use(express.json());

app.use('/api/users', userRoutes);

module.exports = app;
