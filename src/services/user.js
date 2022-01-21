import axios from "../config/axios";
import authHeader from "./auth-header";

class UserService {
  getBalance() {
    return axios.get("account/balance", { headers: authHeader() })
  }

  getPackage() {
    return axios.get("account/package", { headers: authHeader() })
  }
}

export default new UserService();