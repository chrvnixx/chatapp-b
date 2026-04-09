import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

export async function sendMessage(req, res) {
  const senderId = req.userId;
  const receiverId = req.params.id;
  const { message } = req.body;
  try {
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    conversation.messages.push(newMessage);

    await conversation.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    console.log("Error in sendMessage Controller", error);
  }
}

export async function getMessage(req, res) {
  const userToChatId = req.params.id;
  const senderId = req.userId;
  try {
    const conversation = await Conversation.findOne({
      participants: { $all: [userToChatId, senderId] },
    });

    if (!conversation) {
      return res.status(200).json({ message: "No messages found" });
    }

   const messages = await Message.findById(conversation.messages)

   res.status(200).json(messages)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    console.log("Error in sendMessage Controller", error);
  }
}
