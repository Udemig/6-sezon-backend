const User = require("../models/userModel.js");

exports.signUp = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    res.status(200).json({
      message: "Hesabınız başarıyla oluşturuldu",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Hesap oluşturulurken bir hata meydana geldi",
      error: error.message,
    });
  }
};
exports.login = (req, res) => {
  res.status(200).json("login çalıştı");
};

exports.logout = (req, res) => {
  res.status(200).json("logout çalıştı");
};
