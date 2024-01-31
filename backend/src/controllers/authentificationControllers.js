const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const tables = require("../tables");

const login = async (req, res, next) => {
  try {
    const user = await tables.user.findUserByMail(req.body.email);
    if (user == null) {
      res.sendStatus(422);
      return;
    }
    const verified = await argon2.verify(user.password, req.body.password);

    if (verified) {
      delete user.password;

      const token = await jwt.sign(
        { sub: user.id, isAdmin: user.isAdmin },
        process.env.APP_SECRET,
        { expiresIn: "1h" }
      );
      delete user.created_at;
      delete user.is_admin;

      res.json({ user, token });
    } else {
      res.sendStatus(422);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
