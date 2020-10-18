const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.signup = async (req, res) => {
        const {
            username,
            email,
            password
        } = req.body;

        try {
            let user = await User.findOne({
                email
            });
            if (user) {
                return res.status(400).json({
                    error: "User Already Exists"
                });
            }
            user = new User({
                username,
                email,
                password
            });


            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                process.env.SECRET, {
                    expiresIn: 10000
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        status: "success",
                        token
                    });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).json({status: 'fail', error:err.message});
        }
}

exports.login = async (req, res) => {
console.log("login");
    const {
        username,
        password
    } = req.body;

    try {
        let user = await User.findOne({
            username
        });
        if (!user) {
            return res.status(400).json({
                error: "User Not Exists"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({
                message: "Incorrect Password !"
            });

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            "movieSecret", {
                expiresIn: 10000
            },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    status: "success",
                    token
                });
            }
        );
    } catch (err) {
        console.log(err.message);
        res.status(500).json({status: 'fail', error:err.message});
    }
}