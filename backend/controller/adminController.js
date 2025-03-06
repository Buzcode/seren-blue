
import User from "../model/user.js";
import { hashPassword } from "../utils/helpers.js";

export const createUserController = async (req, res) => {
  try {
    const { username, firstName, lastName, displayName, password, role, gender } = req.body; 

  
    if (!username || !firstName || !lastName || !password || !role || !gender) { 
      return res
        .status(400)
        .json({ error: "Username, First Name, Last Name, password, role, and gender are required." }); 
    }

    if (!["doctor", "admin"].includes(role)) {
      
      return res
        .status(400)
        .json({
          error:
            "Invalid role. Only 'doctor' or 'admin' roles can be created here.",
        });
    }

    
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists." }); 
    }

    
    const hashedPassword = await hashPassword(password);

  
    const newUser = new User({
      username,
      firstName,
      lastName,
      displayName,
      password: hashedPassword,
      role, 
      gender,    
    });

    await newUser.save();

    return res
      .status(201)
      .json({ message: "User created successfully.", userId: newUser._id }); 
  } catch (error) {
    console.error("Error creating user:", error);
    return res
      .status(500)
      .json({ error: "Failed to create user.", details: error.message }); 
  }
};