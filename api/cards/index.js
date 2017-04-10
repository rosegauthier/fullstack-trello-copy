var express = require('express');
var router = new express.Router();

var controller = require('./controller');


router.get('/', controller.index);

router.delete('/delete/:id', controller.destroy);

router.put('/:id', controller.updateUser);

module.exports = router;