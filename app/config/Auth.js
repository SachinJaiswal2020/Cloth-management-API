const User = require("../model/User");
const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;


// User Register function

const userRegister = async (userRegData, role, res) => {
    try{ 
            let usernameExist = await validateUsername(userRegData.username);
            if (usernameExist) {
              return res.status(400).json({
                message: "Username exist, please pick different username.",
                success: false,
              });
            }

            let emailExist = await validateEmail(userRegData.email);
            if (emailExist) {
              return res.status(400).json({
                message:
                  "Email already registered, use different email or login.",
                success: false,
              });
            }

            const hashedPassword = await bcrypt.hash(userRegData.password, 12);

            const newUser = new User({
              username: userRegData.username,
              name: userRegData.name,
              email: userRegData.email,
              role,
              password: hashedPassword,
            });
            await newUser.save();
            return res.status(201).json({
              message: "Registered successfully",
              success: true
            });

    } catch(err){
        return res.status(500).json({
          message: "Something went wrong",
          success: false
        });
    }

}

//validating Username if exist
const validateUsername = async username => {
    const user = await User.findOne({ username });
    return user ?  true : false;
}

//validating Email if exist
const validateEmail = async email => {
  const user = await User.findOne({ email });
  return user ? true : false;
};


// User Login function
const userLogin = async (userLogData, res) => {
  let { username, password } = userLogData;
  const user = await User.findOne({ username });
  if(!user){
    return res.status(404).json({
      message: "Invalid credential",
      success: false
    });
  }

  let isMatch = await bcrypt.compare(password, user.password);
  if(isMatch){
    let token = jwt.sign(
      {
        user_id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      SECRET,
      { expiresIn: "7 days" }
    );

      let result = {
        username: user.username,
        email: user.email,
        role: user.role,
        token: `Bearer ${token}`,
        expiresIn: 168,
      };

      return res.status(200).json({
        ...result,
        message: "Successfully Logged In",
        success: true
      });

  } else {
     return res.status(403).json({
       message: "Invalid credential",
       success: false,
     });
  }
};

// Passport Implementation
const userAuth = passport.authenticate("jwt", { session: false });

const serializeUser = user =>{
    return{
      username: user.username,
      email: user.email,
      _id: user._id,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt
    };
};

// Middleware
const checkRole = roles => (req, res, next) =>{
  if(roles.includes(req.user.role)){
    return next();
  }
  return res.status(401).json({
    message: "Unauthorized",
    success: false
  });
}

module.exports = { userRegister, userLogin, userAuth, serializeUser, checkRole };