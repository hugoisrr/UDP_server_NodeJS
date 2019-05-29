const express = require('express');
const router = express.Router();
const Entity = require('../../models/Entity');

/**
 * @route   GET api/entities
 * @desc    Get all entities
 * @access  Public
 */
router.get('/', function(req, res, next){
    Entity.find({}).then(function(entities){
        res.send(entities);
    });
});

/**
 * @route   POST api/entities
 * @desc    Creates a new Entity
 * @access  Public
 */
router.post('/', function(req, res, next){
    Entity.create(req.body).then(function(entities){
        res.send(entities);
    }).catch(next);
});

/**
 * @route   PUT api/entities/:id
 * @desc    Updates an Entity
 * @access  Public
 */
router.put('/:id', function(req, res, next){
    Entity.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Entity.findOne({_id: req.params.id}).then(function(entity){
            res.send(entity);
        });
    }).catch(next);
});

/**
 * @route   DELETE api/entities/:id
 * @desc    Deletes an entity based on id
 * @access  Public
 */
router.delete('/:id', function(req, res, next){
    Entity.findOneAndRemove({_id: req.params.id}).then(function(entity){
        res.send(entity);
    }).catch(next);
});

module.exports = router;