const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json({ message: 'Unauthorized'});
        const user = await User.findAll({
            where: {
                refresh_token: refreshToken
            }
        });
        if (!user[0]) return res.status(403).json({ message: 'Forbidden'});
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403);
            const UserId = user[0].id;
            const name = user[0].name;
            const email = user[0].email;
            const accessToken = jwt.sign({ UserId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            });
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error)
    };
};

module.exports = {
    refreshToken
}