const jwt = require("jsonwebtoken");
const pool = require("../database/db");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const client = await pool.connect();
      const user = await client.query(
        'SELECT uId, name, email, image FROM "User" WHERE uid = $1',
        [decoded.id]
      );
      req.user = user.rows[0];
      console.log(req.user);

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized,token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorised, no token");
  }
});

module.exports = { protect };
