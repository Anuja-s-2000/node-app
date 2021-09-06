const { check, validationResult } = require('express-validator');
exports.validateUser = [
    check('name')
        .trim()
        .escape()
        .not()
        .isEmpty().withMessage('User name cannot be empty!')
        .bail()
        .isLength({ min: 3 }).withMessage('Minimum 3 characters required!')
        .bail(),
    check('email')
        .trim()
        .isEmail().withMessage('Invalid email address!')
        .not()
        .isEmpty().withMessage('Email cannot be empty!')
        .bail(),
    check('mobile')
        .trim()
        .isNumeric().withMessage('Only numbers allowed in phone number!')
        .not()
        .isEmpty().withMessage('Phone number cannot be empty!')
        .isLength({ min: 10 }).withMessage('Phone number must be 10 numbers only!')
        .isLength({ max: 10 }).withMessage('Phone number must be 10 numbers only!')
        .bail(),
    check('password')
        .not()
        .isEmpty().withMessage('Password cannot be empty!')
        .isLength({ min: 5 }).withMessage('Password must be more that 5 characters!'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    },
];