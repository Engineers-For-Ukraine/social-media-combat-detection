module.exports = mongoose => {
    const Message = mongoose.model(
      "message",
      mongoose.Schema(
        {
          location: Array,
          message: String,
        },
      )
    );
  
    return Message;
  };