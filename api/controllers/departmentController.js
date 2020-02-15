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

/// DELETE
route.delete('/:id', (req, res) => {
    let id = req.params.id;
    Department.deleteOne({ _id: id }, (err) => {
        if (err) {
            res.status(500);
        } else {
            res.status(200).send({});
        }
    });
});

/// UPDATE
router.patch('/:id', (req, res) => {
    Department.findById(req.params.id, (err, dep) => {
        if (err) {
            res.status(500).send(500);
        } else if (!dep) {
            res.status(404);
        } else {
            dep.name = req.body.name;
            dep.save()
                .then((d) => res.status(200).send(d))
                .catch((e) => res.status(500).send(e));
        }
    });

});

module.exports = router;