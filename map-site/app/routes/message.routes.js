module.exports = app => {
    const messages = require("../controllers/message.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all Messages
    router.get("/", messages.findAll);
  
    app.use('/api/messages', router);
  };