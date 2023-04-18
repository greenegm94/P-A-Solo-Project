const User = require("../models/user.models.js");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = {

    createUser: (req, res) => {
        console.log(req.body);
        User.create(req.body)
        .then(user => {
            const userToken = jwt.sign({
                id: user._id
            }, process.env.FIRST_SECRET_KEY);
    
            res
                .cookie("usertoken", userToken, {
                    httpOnly: true
                })
                .json({ msg: "success!", user: user });
        })
        .catch(err => res.json(err));
    },

    loginUser: async(req, res) => {
        console.log(req.body);
        const user = await User.findOne({ email: req.body.email });
        if(user === null) {
            return res.sendStatus(400);
        }

        const correctPassword = await bcrypt.compare(req.body.password, user.password);
        if(!correctPassword) {
            return res.sendStatus(400);
        }

        const userToken = jwt.sign({
            id: user._id
        }, process.env.FIRST_SECRET_KEY);
 
        res
            .cookie("usertoken", userToken, {
            httpOnly: true
            })
            .json({ msg: "success!", user: user });
    },

    logoutUser: (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    }


};