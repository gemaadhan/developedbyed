const router = require("express").Router();
const verify = require("./verifyToken");

router.get("/", verify, (req, res) => {
  // res.send(req.data);
  res.json({ data: "sfafs" });
});

module.exports = router;
