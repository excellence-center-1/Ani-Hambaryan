
//client/src/services/user.service.js
import { authHeader } from './auth-header';

const API_URL = 'http://localhost:4000/test/';

const UserService = {
    getPublicContent: async () => {
        const response = await fetch(API_URL + 'all')
        return response.json();
    },

    getUserBoard: async() =>  {
        const response = await fetch(API_URL + 'user');
        return response.json();
    },

    getModeratorBoard: async() => {
        const response = await fetch(API_URL + 'mod');
        return response.json();
    },

    getAdminBoard: async() =>  {
        const response = await fetch(API_URL + 'admin');
        return response.json();
    }
}

export default UserService;