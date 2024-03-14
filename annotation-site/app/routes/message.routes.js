module.exports = app => {
    const messages = require("../controllers/message.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve a single message with id
    router.get("/:id", messages.findOne);
  
    // Update a message with id
    router.put("/:id", messages.update);
  
    app.use('/api/messages', router);
  };