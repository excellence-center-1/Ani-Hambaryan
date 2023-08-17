
//authProvider.js

export const authProvider = {
    login: () => {
        const request = new Request("http://localhost:5000/auth/login/success", {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true,
            },
          });
          return fetch(request)
            .then((response) => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(auth => {
                localStorage.setItem('auth', JSON.stringify(auth));
            })
            .catch((err) => {
              console.log(err);
            });
        
      },


      checkAuth: () => {
        // Check if the user is authenticated, e.g., by verifying the Google token
        return localStorage.getItem('auth')
          ? Promise.resolve()
          : Promise.reject();
      },
    

    logout: () => {
        localStorage.removeItem('auth');
        return Promise.resolve();
    },

    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('auth');
            return Promise.reject();
        }
    },
    getPermissions: async () => {
        // Return the user's permissions if needed
    },


};
