const User = require('../models/userModel');

const verifyRegister = async(req, res, next) => {

    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(err => {
        if (err) {
            res.status(400).send({
                message: "Email telah digunakan"
            });
            return;
        }
        next();
    });
};

module.exports = {verifyRegister};