const mongoose = require("mongoose");
const Messages = require("../models/messageSchema");
const { errorLogger } = require("../src/utils/loggers");

class MessagesController {
  constructor() {
    try {
      mongoose.connect(
        "mongodb+srv://franchas123:fran123@cluster0.zqkvn9v.mongodb.net/?retryWrites=true&w=majority"
      ),
        { useNewUrlParser: true };
    } catch (error) {
      errorLogger.error({
        error: error.message,
      });
    }
  }

  async save(message) {
    try {
      let timestamp = new Date();
      message.timestamp = timestamp;
      await Messages.create(message);
      return message;
    } catch (error) {
      errorLogger.error({
        error: error.message,
      });
      // throw Error(error.message);
    }
  }

  async getAll(options) {
    try {
      let messages;
      if (options?.sort == true) {
        messages = await Messages.find({}).sort({ timestamp: -1 });
      } else {
        messages = await Messages.find({});
      }

      return messages;
    } catch (error) {
      errorLogger.error({
        error: error.message,
      });
    }
  }
}

module.exports = MessagesController;
