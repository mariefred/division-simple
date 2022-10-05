module.exports = app => {

    const user = require("../controllers/user.controller.js");

    var router = require("express").Router();

    // signup route
    router.post("/signup", user.create);

    // login route
    router.post("/login", user.login);

    app.use('/api/users', router);
};
