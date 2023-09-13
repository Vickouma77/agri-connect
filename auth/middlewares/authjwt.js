const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
        return res.status(403).send({
            message: "No token provided!",
        });
    }
  
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!",
            });
        }
        req.userId = decoded.id;
        next();
    });
}

isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            return res.status(500).send({
                message: err,
            });
        }
  
        if (user.role === "admin") {
            next();
            return;
        }
  
        return res.status(403).send({
            message: "Require Admin Role!",
        });
    });
}

isModerator = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            return res.status(500).send({
                message: err,
            });
        }
  
        if (user.role === "moderator") {
            next();
            return;
        }
  
        return res.status(403).send({
            message: "Require Moderator Role!",
        });
    });
}

isModeratorOrAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            return res.status(500).send({
                message: err,
            });
        }
  
        if (user.role === "moderator" || user.role === "admin") {
            next();
            return;
        }
  
        return res.status(403).send({
            message: "Require Moderator or Admin Role!",
        });
    });
}

const authJwt = {
    verifyToken,
    isAdmin,
    isModerator,
    isModeratorOrAdmin,
}

module.exports = authJwt