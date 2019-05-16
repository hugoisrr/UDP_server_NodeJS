const express = require('express');
const connectDB = require('./config/db');

const connectUDP = require('./udpServer');

const app = express();

// Connect Database
connectDB();

// Connect to UDP Server
connectUDP();

// Init Middleware
app.use(express.json({ extended: false }));

// Middleware Route Handlers
app.use('/api/entities', require('./routes/api/entities'));

// Middleware Error Handling
app.use(function(err, req, res, next) {
  res.status(422).send({ error: err.message });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
