const List = require("../models/List");


const createList = async (req, res) => {
    const newList = new List({
        title: req.body.title,
        user: req.body.user,
    });
    try {
        const savedList = await newList.save();
        return res.status(200).json({
            ok: true,
            todo: savedList
        });
    } catch (err) {
        return res.status(503).json({
            ok: false,
            message: "Something happened"
        })
    }
};


module.exports = {createList};