let express = require('express');
let router = express.Router();
let Department = require('../model/department');


/// POST
router.post('/', function (req, res, next) {
    console.log(req.body);
    let d = new Department({
        name: req.body.name
    });

    d.save((err, dep) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(dep);
        }
    })
});

/// GET All
router.get('/', function (req, res, next) {
    Department.find().exec((err, deps) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(deps);
        }
    });
});