import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } =
      req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match!!" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username already existed!!" });
    }

    // Hash Password Here
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashPassword,
      gender,
      profilepic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      // Generate JWT tokens

      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilepic: newUser.profilepic,
      });
    } else {
      res.status(400).json({ error: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Error in signing up new user", error.message);
    res.send(500).json({ error: "Internal Server Error!!!" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if ( !isPasswordCorrect  || !user ) {
      return res.status(400).json({ error: "Invalid User or Password!!" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilepic: user.profilepic,
    });
  } catch (error) {
    console.log("Error in logging controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {maxAge: 0});
    res.status(200).json({ message: "Logged Out Successfully!!" });
  } catch (error) {
    console.log("Error in logging out controller", error);
    res.status(400).json({ error: "Internal Server Error" });
  }
};
