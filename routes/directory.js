var express = require('express');
var router = express.Router();

// add db & model dependencies
// Linked to DB
var mongoose = require('mongoose');
var Directory = require('../models/directory');

/* GET users listing. */
router.get('/directory', function(req, res, next) {
	Directory.find(function(err, businesses) {
		if(err) {
			res.render('error',{error:err});
		}
		else {
			res.render('directory',{businesses:businesses});
			console.log(businesses);
		}
	});
});
router.get('/directory/add', function(req, res, next) {
	res.render('add');
});
router.post('/directory/add', function (req, res, next) {

    // use the Product model to insert a new product
    Directory.create({
        name: req.body.name,
        phone: req.body.phone,
        location: req.body.location,
        website: req.body.website,
        hours: req.body.hours,
        price: req.body.price
    }, function (err, directory) {
        if (err) {
            console.log(err);
            res.render('error', { error: err }) ;
        }
        else {
            console.log('Business saved ' + directory);
            res.render('added', { business: directory.name });
        }
    });
});
// GET intepret GET */
router.get('/directory/edit/:id', function (req, res, next) {
    //store the id from the url in a variable
    var id = req.params.id;

    //use the directory model to look up the specific Directory with this id    
   Directory.findById(id, function (err, directory) {
        if (err) {
            res.send('Product ' + id + ' not found');
        }
        else {
            res.render('edit', { directory: directory });
        }
    });
});

// edit functionality
router.post('/directory/edit/:id', function (req, res, next) {
    var id = req.body.id;

    var directory = {
        _id: req.body.id,        
        name: req.body.name,
        phone: req.body.phone,
        location: req.body.location,
        website: req.body.website,
        hours: req.body.hours,
        price: req.body.price                  
    };

    Directory.update({ _id: id}, directory, function(err) {
        if (err) {
            res.send('Directory ' + req.body.id + ' not updated. Error: ' + err);
        }
        else {
            res.statusCode = 302;
            res.setHeader('Location', 'http://' + req.headers['host'] + '/directory');
            res.end();
        }
    });
});
// Delete functionality
//GET directory delete request - : indicates id is a variable    
router.get('/directory/delete/:id', function (req, res, next) {
    //store the id from the url into a variable
    var id = req.params.id;

    //use our product model to delete
    Directory.remove({ _id: id }, function (err, directory) {
        if (err) {
            res.send('Directory ' + id + ' not found');
        }
        else {
            res.statusCode = 302;
            res.setHeader('Location', 'http://' + req.headers['host'] + '/directory');
            res.end();
        }
    });
});
module.exports = router;