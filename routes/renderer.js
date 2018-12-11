var express = require('express');
var router = express.Router();
var fs = require('fs');
var os = require('os');

router.get('/', function (req, res) {
	return res.send("sub thinggg");
});



module.exports = router;
