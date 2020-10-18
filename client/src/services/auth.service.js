import {API_URL_2} from '../utils/api';

class AuthService {
    login(username, password) {
        return fetch(API_URL_2 + "/auth/login", {  method: 'POST', body: JSON.stringify({username, password}), headers:{
                'Content-Type': 'application/json'
            }})
            .then((response) => {
                return response.json(); })
            .then((response) => {
                if (response.token) {
                    localStorage.setItem("accessToken", JSON.stringify(response.token));
                }
                return response;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password) {
        return fetch(API_URL_2 + "/auth/signup", {
            username,
            email,
            password,
        });
    }
}

export default new AuthService();