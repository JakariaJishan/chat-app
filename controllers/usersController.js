const bcrypt = require('bcrypt')

function getUsers(req, res, next) {
    res.render("users");
  }

const addUser = async (req, res, next) => {
  let newUser ;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  if(req.files && req.files.length > 0) {
    newUser = new User({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashedPassword
    })
  }else{
    newUser = new User({
      ...req.body,
      password: hashedPassword,
    })
  }

  try {
    const result = await newUser.save();
    res.status(200).json({
      message: "User saved successfully"
    })
  } catch (error) {
    res.status(500).json({
      errors:{
        common:{
          message: "unknown error occured!!!"
        }
      }
    })
  }
}
  
  module.exports = {
    getUsers,
    addUser
  };
  