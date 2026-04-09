import User from "../models/User.js";

export async function getUsersForSidebar(req, res) {
  try {
    const userId = req.userId;

    const filteredUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password",
    );

    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    console.log("Error in sendMessage Controller", error);
  }
}
