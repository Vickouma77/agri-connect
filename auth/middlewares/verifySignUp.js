const db = require('../../models/init');
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        // Check if username is already in use
        const existingUserByUsername = await User.findOne({ username: req.body.username }).exec();
        if (existingUserByUsername) {
            return res.status(400).send({ message: 'Failed! Username is already in use!' });
        }

        // Check if email is already in use
        const existingUserByEmail = await User.findOne({ email: req.body.email }).exec();
        if (existingUserByEmail) {
            return res.status(400).send({ message: 'Failed! Email is already in use!' });
        }

        // If neither username nor email is in use, proceed to the next middleware
        next();
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};

const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i += 1) {
            if (!ROLES.includes(req.body.roles[i])) {
                return res.status(400).send({
                    message: `Failed! Role ${req.body.roles[i]} does not exist!`,
                });
            }
        }
    }

    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted,
};

module.exports = verifySignUp;
