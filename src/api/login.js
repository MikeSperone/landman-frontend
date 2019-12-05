function login(email, password) {
        return new Promise((resolve, reject) => {
            xhr("POST", LOGIN_URL, 'm='+email+'&s='+ password)
                .then(d => {
                    if (!validateResponse(d)) return resolve({});
                    const data = d.data;
                    if (validateUserData(data)) {
                        console.info(d);
                        user.login(data.access_token.token, data.user);
                        return (user.isLoggedIn) ?
                            resolve(data) :
                            reject({
                                message: {
                                    error: 'Invalid User'
                                },
                                data: {}
                            });
                    }
                });
        });
}
