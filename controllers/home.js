const jwt = require("jsonwebtoken");
const Doctor = require("../models/model");
module.exports.home = (req, res) => {
  try {
    res.status(200).send("<h1>this is our home page</h1>this is home page");
  } catch (err) {
    return res.status(400).json("message:", err);
  }
};
module.exports.profile = (req, res) => {
  try {
    res
      .status(200)
      .send("<h1>this is our profile page</h1>this is profile page");
  } catch (err) {
    return res.status(400).json("message:", err);
  }
};

module.exports.signIn = (req, res) => {
  return res.status(200).render('home') ;  
};
module.exports.post_signIn = async (req, res) => {
  //
  const doctor = await Doctor.findOne({ email: req.body.email });
  if (doctor) return res.status(400).send("user exits");
 
  try {
    const doctorData = new Doctor(req.body);
    await doctorData.save();
    return res.status(200).send("<h1>Welcome to our site</h1>")
  } catch (err) {
    return res.status(400).json({
      error:err,
       message:'user not save'
    });
  }
};

module.exports.createSession = async (req, res) => {
  try {
    let doctor = await Doctor.findOne({ email: req.body.email });
    if (!doctor || doctor.password!=req.body.password) {
      return res.status(422).json({
        message: "Invalid username or password",
      });
    }
      return res.status(200).json({
        message: "Sign in successfully",
        data: {
          token: jwt.sign(doctor.toJSON(), "codial", { expiresIn: "100000" }),
        }
      });
    
  } catch (err) {
    return res.status(400).json({
      status:false,
      message:'Internal error',
      error:err
    });
  }
};
