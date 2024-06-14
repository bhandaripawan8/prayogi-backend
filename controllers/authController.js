
import User from '../model/User.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs'


export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already exists, please login!', success: false });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
    });

    // Return success response with user details and token
    res.status(201).json({
      message: 'User registered successfully, Please login',
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      success: true,
    });
  } catch (error) {
    console.error('Error registering the user!', error.message);
    res.status(500).json({ message: 'Error registering the user', success: false, error: error.message });
  }
};


// Controller to handle user login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });
    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Send token and user details in response
    res.status(200).json({message: 'Logged in successfully',
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Logout User with Token Blacklist
export const Logout = (req, res) => {
  try {
    res.clearCookie('token'); 
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error during logout:', error.message);
    res.status(500).json({ message: 'Server error during logout', error: error.message });
  }
};


