const { findOneAndUpdate } = require("../models/User");

var express = req ('express');
var router = express.Router();
var users = req("../models/Users.js");


router.post('/', async function (req, res, next){
    const editUser = new users({
        name: req.body.name,
        email: req.body.email,
        image: req.body.image,
    });
    await editUser.save();
    res.sed(editUser);
});

router.get('/', async function (req,res){
    const editUsers = await users.find();
    res.send(editUsers);
})

router.get('/:id', async function (req,res){
    const editUsers = await users.findById(req.params.id);
    res.send(editUsers);
})

router.put ('/', async function (req, res){
    await editUser,findOneAndUpdate({
        _id: req.body._id,
    },{
        name: req.body.name,
        email: req.body.email,
        image: req.body.image,
    });
    res.send(true);
});

module.export = router;