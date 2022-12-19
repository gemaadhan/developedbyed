const router = require("express").Router();
const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// VALIDATION

router.post("/register", async (req, res) => {
  // validate data before add user
  const { value, error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if email exist
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("email already exist");

  // Hash passowrd
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // add user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  // validate data before add user
  const { value, error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if user exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is not extist");

  // compare password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid Pass");

  // Create aand assing token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  // res.header("auth-token", token).json(token);
  res.json({ token: token });

  // res.json("logged in");
});

module.exports = router;
