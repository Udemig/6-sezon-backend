const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const validator = require("validator");

//kullanıcı şema
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Kullanıcı isim değerine sahip olmalıdır."],
  },
  email: {
    type: String,
    required: [true, "Kullanıcı email değerine sahip olmalıdır."],
    unique: [true, "Bu eposta adresine ait kayıtlı bir hesap bulunmaktadır."],
    validate: [validator.isEmail, "Lütfen geçerli bir email giriniz."],
  },
  photo: {
    type: String,
    default: "defaultpic.webp",
  },
  //!
  role: {
    type: String,
    enum: ["user", "guide", "lead-quide", "admin"],
    default: "user",
  },
  active: {
    type: Boolean,
    default: true,
  },
  password: {
    type: String,
    required: [true, "Kullanıcı şifre değerine sahip olmalıdır."],
    minLength: [8, "Şifre en az 8 karakter içermelidir."],
    validate: [validator.isStrongPassword, "Şifreniz yeterince güçlü değil"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Lütfen şifrenizi onaylayın"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Onay şifreniz eşleşmiyor",
    },
  },
});

//1) veritabanına kullanıcıyı kaydetmeden önce
// * password alanını şifreleme algoritmalarndan geçir,
// * passwordConfirm alanını kaldır.
userSchema.pre("save", async function (next) {
  //daha önce parola hashlendiyse aşağıdaki adımları atla
  if (!this.isModified("password")) return next();

  //şfreyi hashla ve saltla
  this.password = await bcrypt.hash(this.password, 12);

  //onay şifresinş kaldır
  this.passwordConfirm = undefined;
});

//kullanıcı modeli
const User = model("User", userSchema);

module.exports = User;
