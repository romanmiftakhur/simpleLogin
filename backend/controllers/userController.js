const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUser = async( req, res) => {
    try {
        const user = await User.findAll({
            attributes: ['id', 'name', 'email']
        });
        res.json(user);
    } catch (error) {
        res.json({ message: error});
    }
};

const Register = async( req, res) => {
    const { name, email, password, confPassword } = req.body;
    if (email == '') return res.status(400).json({ message: 'Email belum diisi'})
    if (password !== confPassword) return res.status(400).json({ message: 'Password dan konfirmasi Password tidak sama' });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        await User.create({
            name: name,
            email: email,
            password: hashPassword
        });
        res.status(200).json({ message: 'Register Berhasil' })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const Login = async( req, res) => {
    try {
        const user = await User.findAll({
            where: {
                email: req.body.email
            }
        });

        //cek password sesuai dengan database
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if (!match) return res.status(400).json({ message: 'Password Salah' });

        const userId = user[0].id;
        const name = user[0].name
        const email = user[0].email;
        const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        await User.update({ refresh_token: refreshToken }, {
            where: {
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({ message: "Email Tidak Ditemukan" });
    }
};

const Logout = async( req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await User.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    if (!user[0]) return res.sendStatus(403);
    const userId = user[0].id
    await User.update({ refresh_token: null }, {
        where: {
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.status(200).json({ message: 'Anda Telah Keluar' })
};

module.exports = {
    getUser,
    Register,
    Login,
    Logout
};