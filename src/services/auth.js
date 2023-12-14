import axios from "axios";
import { LOGIN_URL } from "./config";


class AuthService {
    async login(username, password) {
        const {data} = await axios.post(LOGIN_URL, {username, password});
        return data['access_token'];
    }   
}

const authService = new AuthService();
export default authService;