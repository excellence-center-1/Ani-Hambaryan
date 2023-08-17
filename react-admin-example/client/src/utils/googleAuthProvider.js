
//googleAuthProvider.js
export const authProvider = (googleClientId) => {
    return {
        login: () => {
            // Redirect the user to Google login page
            window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=http://localhost:5000/google-callback`;
            return Promise.resolve();
        },

        logout: () => {
            // Handle logout if needed
            // Clear local storage or perform other logout actions
            return Promise.resolve();
        },

        checkAuth: () => {
            // Check if the user is authenticated
            const googleToken = localStorage.getItem('googleToken');
            return googleToken ? Promise.resolve() : Promise.reject();
        },

        checkError: (error) => {
            // Handle error status codes
            // For example, check if the error status is 401 or 403
            return Promise.reject(error);
        },

        getPermissions: () => {
            // Return user permissions if needed
            return Promise.resolve();
        },

        // Other methods as needed
    };
};
