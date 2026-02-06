const Joi = require('joi');

const validateRegister = (req, res, next) => {
    console.log("Joi is checking this data:", req.body);
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string()
            .min(8)
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
            .required()
            .messages({
                'string.pattern.base': 'Password must be at least 8 characters, include one uppercase letter, one number, and one special character.'
            }),
        phone: Joi.string().optional(),
        avatarUrl: Joi.string().optional()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

module.exports = { validateRegister };