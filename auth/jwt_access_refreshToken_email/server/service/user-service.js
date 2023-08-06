//service/user-service.js
const db = require("../models");
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const MailService = require('./mail-service');
const TokenService = require('../service/token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require("../exceptions/api-error");
const tokenService = require("../service/token-service");

const User = db.UserModel;

class UserService {
    async registration(email, password) {
        try {
            const candidate = await User.findOne({ where: { email } });
            if (candidate) {
                throw ApiError.BadRequest(`User with email ${email} already exists`);
            }
            const hashPassword = await bcrypt.hash(password, 8);
            const activationLink = uuid.v4();
            console.log(activationLink)
            const user = await User.create({ email, password: hashPassword, activationLink });
            //const tokenData = await TokenService.saveToken(user.id, tokens.refreshToken); 
            await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
            const userDto = new UserDto(user);
            const tokens = TokenService.generateTokens({ ...userDto });
            await TokenService.saveToken(user.id, tokens.refreshToken);
            return { ...tokens, user: userDto };
        } catch (error) {
            console.error("Error in user registration:", error);
            throw error;
        }
    }


    async activate(activationLink) {
        const user = await User.findOne({ where: { activationLink } });
        if (!user) {
            throw ApiError.BadRequest('user dont found')
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw ApiError.BadRequest("Uncorrect email or password")
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest("Uncorrect email or password")
        }
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({ ...userDto });
        await TokenService.saveToken(user.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await User.findOne({ where: { id: userData.id } });
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({ ...userDto });
        await TokenService.saveToken(user.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }

    async getAllUsers() {
        const users = await User.findAll();
        return users;
    }
}

module.exports = new UserService();
