const API_URL = 'http://localhost:8080/api/auth/';

const AuthService = {
    login: async (username, password) => {
        try {
            const response = await fetch(API_URL + 'signin', {
                method: 'POST',
                Headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (data.accessToken) {
                localStorage.setItem("user", JSON.stringify(data))
            }
            return data;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }

    },

    logout: () => {
        localStorage.removeItem("user");
    },

    register: async (username, email, password) => {
        try {
            const response = await fetch(API_URL + 'signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });
            return await response.json();
        } catch (error) {
            console.error('Error registering: ', error);
            throw error;
        }

    },

    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('user'));
    }
};

export default AuthService;