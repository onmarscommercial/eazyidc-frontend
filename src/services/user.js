import axios from "../config/axios";
import authHeader from "./auth-header";

class UserService {
  getBalance() {
    return axios.get("account/balance", { headers: authHeader() })
  }

  getProfile() {
    return axios.get("account/profile", { headers: authHeader() })
  }
}

export default new UserService();