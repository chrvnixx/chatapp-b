import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export async function signup(req, res) {
  const { fullName, username, password, gender } = req.body;
  try {
    if (!fullName || !username || !password || !gender) {
      res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const userAlreadyExists = await User.findOne({ username });
    if (userAlreadyExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    //https://avatar-placeholder.iran.liara.run/avatar/200/200/any

    const randomProfilePic = ` https://api.dicebear.com/9.x/micah/svg?seed=${username}`;

    const user = new User({
      fullName,
      username,
      password,
      gender,
      profilePic: randomProfilePic,
    });

    await user.save();

    generateToken(user._id, res);

    res.status(201).json({
      message: "new user created",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
    console.log("Error in signup controller", error);
  }
}
export async function logout(req, res) {
  try {
    res.clearCookie("token");
    res.json({ message: "logged out" });
  } catch (error) {
    console.log("Error in logout controller");
  }
}
export async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    const verifyPassword = await user.comparePassword(password);

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!verifyPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      message: "log in successful",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
    console.log("Error in signup controller", error);
  }
}
