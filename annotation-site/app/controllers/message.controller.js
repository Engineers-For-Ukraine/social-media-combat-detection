const db = require("../models");
const Message = db.messages;
const Op = db.Sequelize.Op;

// Find a Message with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    
    Message.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Message with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Message with id=" + id
        });
      });
};

// Update a Message by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Message.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Message was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Message with id=${id}. Maybe Message was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Message with id=" + id
        });
      });
};
