//service/token-service.js
const jwt = require('jsonwebtoken');
const db = require('../models');
const tokenModel = require('../models/token-model');
const Token = db.TokenSchema;
require('dotenv').config();

class TokenService {
    generateTokens(payload) { 
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15s' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
        return {
            accessToken,
            refreshToken
        };
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            console.error("Error validating access token:", e);
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({ where: { userId } });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await Token.create({ userId, refreshToken }); // Set the userId here
        return token;
    }

    async removeToken(refreshToken) {
        const deletedTokenCount = await Token.destroy({ where: { refreshToken } });
        return deletedTokenCount;
    }

    async findToken(refreshToken) {
        const tokenData = await Token.findOne({ where: { refreshToken } });
        return tokenData;
    }

}

module.exports = new TokenService();
