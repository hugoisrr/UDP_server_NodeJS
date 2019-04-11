const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const entities = require('./routes/api/entities')

const udpServer = require('./udpServer')

// set up express app
const app = express();

// DB Config
const db = require('./config/keys').mongoURI

// Connect to Mongo
mongoose
    .connect(db, { useNewUrlParser: true, useCreateIndex: true, })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

// Middleware Body Parser
app.use(bodyParser.json());

// Middleware Route Handlers
app.use('/api/entities', entities)

// Middleware Error Handling
app.use(function(err, req, res, next){
    res.status(422).send({error: err.message})
})

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server started on port ${port}`))