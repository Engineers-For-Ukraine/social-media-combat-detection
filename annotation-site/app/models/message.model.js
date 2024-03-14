module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("message", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      msg_txt: {
        type: Sequelize.STRING
      },
      annotation: {
        type: Sequelize.INTEGER
      }
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    });
  
    return Message;
  };