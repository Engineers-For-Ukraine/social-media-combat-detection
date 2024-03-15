const db = require("../models");
const Tutorial = db.tutorials;

// Retrieve all message from the database.
exports.findAll = (req, res) => {
  
    Message.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving messages."
        });
      });
  };
