const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schemas and Models

const ValueSchema = new Schema({
    value: String,
    delay: Number
})

const EventSchema = new Schema({
    numberValues: Number,
    deviceId: Number,
    values: [ValueSchema]
})

const Event = mongoose.model('event', EventSchema)

module.exports = Event