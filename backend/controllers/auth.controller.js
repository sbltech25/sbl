import User from "../models/User.js";
import jwt from "jsonwebtoken";
import cloudinary from "../lib/cloudinary.js";
import { sendEmail } from "../lib/email.js";
import { passwordGen, userNameGen } from "../lib/gen.js";

export async function signup(req, res) {    
  const { email, fullName } = req.body;
 
  try {
    if (!email || !fullName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "This email is already in use!" });
    }

    const username = userNameGen(fullName)
    const password = passwordGen(fullName, email)
    console.log({username, password})
    const newUser = await User.create({
      email,
      fullName,
      password,
      username,
    });

    if(newUser){
        sendEmail(email, fullName, username, password)
        console.log("Sent email to user!")
    }

  
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevent XSS attacks,
      sameSite: "strict", // prevent CSRF attacks
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
 
export async function login(req, res) {
  try {
    const { email, username, password } = req.body;
    let user 

    if (!email && !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if(email) {
      user = await User.findOne({ email });
    }

    if(username){
      user = await User.findOne({ username });
    }
    
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevent XSS attacks,
      sameSite: "strict", // prevent CSRF attacks
      secure: process.env.NODE_ENV === "production",
    });

    console.log(user)
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export function logout(req, res) {
  res.clearCookie("jwt");
  res.status(200).json({ success: true, message: "Logout successful" });
}

