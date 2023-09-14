const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller',);
const userController = require('../controllers/user.controller',);

const { verifySignUp, authJwt } = require('../auth/middlewares/indexjwt');

router.use((req, res, next) => {
    res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type, Accept'
    );
    next();
});

router.post(
    '/signup',
    [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
    controller.signup
);

router.post('/signin', controller.signin);

router.get('/signout', controller.signout);

router.get('/user', [authJwt.verifyToken], userController.userContent);

router.get(
    '/mod',
    [authJwt.verifyToken, authJwt.isModerator],
    userController.moderatorBoard
);

router.get(
    '/admin',
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.adminBoard
);

router.get('/all', userController.allAccess);

router.get('/user-info', [authJwt.verifyToken], userController.userBoard); // Renamed the route

module.exports = router;
