const {check, validationResult} = require("express-validator");

exports.signupValidator = async (req, res, next) => {
    check("username", "Please Enter a Valid Username")
        .not()
        .isEmpty();
    check("email", "Please enter a valid email").isEmail();
    check("password", "Please enter a valid password").isLength({
            min: 6
        })
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    next();
}

exports.loginValidator = async (req, res, next) => {

    check("username", "Please enter a valid username").isString();
    check("password", "Please enter a valid password").isLength({
            min: 6
        });
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        next();
}