const userModel = require('../models/user.model');
const foodPartnerModel = require('../models/foodpartner.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// =======================
//  GENERATE TOKEN
// =======================
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// =======================
//  USER REGISTER
// =======================
async function registerUser(req, res) {
  try {
    const { fullName, email, password } = req.body;

    // validation
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }

    const isUserAlreadyExists = await userModel.findOne({ email });

    if (isUserAlreadyExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      fullName,
      email,
      password: hashedPassword
    });

    const token = generateToken(user._id);

    //  cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, //  change to true in production
      sameSite: "strict"
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error"
    });
  }
}

// =======================
// USER LOGIN
// =======================
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, //  change to true in production
      sameSite: "strict"
    });

    res.status(200).json({
      message: "User logged in successfully",
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error"
    });
  }
}

// =======================
//  USER LOGOUT
// =======================
async function logoutUser(req, res) {
  try {
    res.clearCookie("token");

    res.status(200).json({
      message: "User logged out successfully"
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error"
    });
  }
}

// =======================
//  FOOD PARTNER REGISTER
// =======================
async function registerFoodPartner(req, res) {
  try {
    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }

    const isAccountAlreadyExists = await foodPartnerModel.findOne({ email });

    if (isAccountAlreadyExists) {
      return res.status(400).json({
        message: "Food partner already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({
      name,
      email,
      password: hashedPassword
    });

    const token = generateToken(foodPartner._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict"
    });

    res.status(201).json({
      message: "Food partner registered successfully",
      token,
      foodPartner: {
        _id: foodPartner._id,
        name: foodPartner.name,
        email: foodPartner.email
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error"
    });
  }
}

// =======================
//  FOOD PARTNER LOGIN
// =======================
async function loginFoodPartner(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const foodPartner = await foodPartnerModel.findOne({ email });

    if (!foodPartner) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const token = generateToken(foodPartner._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict"
    });

    res.status(200).json({
      message: "Food partner logged in successfully",
      token,
      foodPartner: {
        _id: foodPartner._id,
        name: foodPartner.name,
        email: foodPartner.email
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error"
    });
  }
}
  // =======================
//  FOOD PARTNER LOGOUT
// =======================
async function logoutFoodPartner(req, res) {
  try {
    res.clearCookie("token");

    res.status(200).json({
      message: "Food partner logged out successfully"
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error"
    });
  }
}


//  EXPORTS

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner
};