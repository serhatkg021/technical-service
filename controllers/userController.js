const bcrypt = require("bcryptjs");
const userService = require('../services/userService');
const tokenController = require('../controllers/tokenController');

exports.singUpUser = async (req, res) => {
    const { name, surname, phone, email, password } = req.body;
    const salt = bcrypt.genSaltSync();

    if (!name || !surname || !phone || !email || !password)
        return res.status(400).json({
            success: false,
            message: 'Lütfen bütün alanları doldurunuz.'
        });

    try {
        if (await userService.getUserByEmail(email)) {
            return res.status(409).json({
                success: false,
                message: 'Bu e-posta adresiyle zaten bir kullanıcı kayıtlı.'
            });
        }

        if (await userService.getUserByPhone(phone)) {
            return res.status(409).json({
                success: false,
                message: 'Bu telefon numarası ile zaten bir kullanıcı kayıtlı.'
            });
        }

        await userService.createUser({
            name,
            surName: surname,
            phone, email: email.toLowerCase(),
            password: bcrypt.hashSync(password, salt)
        });

        return res.status(201).json({
            success: true,
            message: `${name} kullanıcı kayıt oldu`
        });

    }
    catch (error) {
        res.status(422).json({
            success: false,
            message: `${name} kullanıcısı kaydolurken şu hata meydana geldi : -  ${error}`
        });
    }

};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({
            success: false,
            message: 'Lütfen bütün alanları doldurunuz.'
        });

    try {
        let user = await userService.getUserByEmail(email);
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                const newToken = tokenController.createToken({
                    name: user.name,
                    surName: user.surName,
                    phone: user.phone,
                    email: user.email,
                    id: user._id
                });

                return res.status(200).json({
                    success: true,
                    message: `${user.name} ${user.surName} kullanıcısı giriş yaptı`,
                    data: {
                        id: user._id,
                        name: user.name,
                        surName: user.surName,
                        phone: user.phone,
                        email: user.email,
                        token: newToken
                    }
                });
            }
            else {
                return res.status(200).json({
                    success: false,
                    message: 'Hatalı şifre'
                });
            }
        }
        else {
            return res.status(200).json({
                success: false,
                message: 'Böyle bir kullanıcı mevcut değil'
            });
        }
    } catch (error) {
        console.log(error);
    }

};

exports.getAllUsers = async (req, res) => {
    return res.status(200).json({
        success: false,
        message: 'Hatalı şifre'
    });
};