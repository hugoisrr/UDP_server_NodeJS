const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema Entity
const EntitySchema = new Schema({
    name:  {
        type: String, 
        unique: true, 
        required: [true, 'Name field is required']
    },
    entityType: {
        type: String, 
        enum: [
            'hammer',
            'drill', 
            'component'
        ]},
    date: {
        type: Date,
        default: Date.now
    },
    event: [{
        type: Object
    }]
});

const Entity = mongoose.model('entity', EntitySchema);

module.exports = Entity;