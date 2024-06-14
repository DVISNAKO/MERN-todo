const { Router } = require("express");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = Router();

// Регистрация пользователя
router.post(
  "/registration",
  [
    check("email", "Некорректный email").isEmail(),
    check("password", "Некорректный пароль").isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные при регистрации"
        });
      }

      const { email, password } = req.body;

      const isUsed = await User.findOne({ email });
      if (isUsed) {
        return res.status(400).json({ message: "Данный email уже используется" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        email,
        password: hashedPassword
      });
      await user.save();

      res.status(201).json({ message: "Пользователь создан" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }
);

//login router

router.post("/login",
[
    check('email', 'Неккоректный email').isEmail(),
    check('password', 'Неккоректный пароль').exists()
],
async (req, res) =>{
try{
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректные данные при входе'
    });
}

const {email, password} = req.body;
const user = await User.findOne({email})
if(!user){
    return res.status(400).json({message: 'Такого Email нет'})
}

const isMatch = await bcrypt.compare(password, user.password)
if(!isMatch){
    return res.status(400).json({message: 'Пароли не совпадают'})
}

const jwtSecret = 'fgdfrtreytr432vcdbdsghgfghfgjfgjhfj'
const token = jwt.sign(
    {userID: user.id},
    jwtSecret,
    {expiresIn: '1h'}
)

res.json({token, userId: user.id})

}
catch(e){
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
}
}
)

module.exports = router;
