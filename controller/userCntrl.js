const Users = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userCntrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await Users.findOne({ email });
      if (user) return res.status(400).json({ msg: 'email existed' });
      let regex =
        /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/;
      if (password.length <= 7) {
        return res.status(400).send(`password must be greater than seven`);
      }
      if (!regex.test(password)) {
        return res
          .status(400)
          .send(
            'Password must have at least one Uppercase,lowercase,special char and number.'
          );
      }
      const passwordcode = await bcrypt.hash(password, 10);
      const newUser = new Users({
        name,
        email,
        password: passwordcode,
      });

      newUser.save();

      //Token
      const access = accessToken({ id: newUser._id });
      const refresh = refreshToken({ id: newUser._id });
      res.cookie('refresh', refresh, {
        httpOnly: true,
        path: './user/token',
      });

      return res.status(200).json({ msg: `data saves` });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },
  token: async (req, res) => {
    try {
      const rf_token = req.cookies.refresh;
      if (!rf_token) {
        return res
          .status(400)
          .json({ msg: `please provide a login details or sign up` });
      }
      jwt.verify(rf_token, process.env.REFRESH_TOKEN, (err, user) => {
        if (err) {
          return res
            .status(400)
            .json({ msg: `please provide a login details or sign up` });
        }
        const access = accessToken({ id: user.id });
        res.json({ user, access });
      });

      // return res.json({ rf_token });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },
};
const accessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '1d' });
};
const refreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN, { expiresIn: '7d' });
};
module.exports = userCntrl;
