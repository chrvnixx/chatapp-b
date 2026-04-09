import jwt from "jsonwebtoken";

export default function protectRoute(req, res, next) {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorised - no token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorised - Invalid token" });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    console.log("Error in protect route middleware");
  }
}
