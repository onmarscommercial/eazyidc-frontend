import axios from "../config/axios";
import authHeader from "./auth-header";

class UserService {
  getBalance() {
    return axios.get("account/balance", { headers: authHeader() })
  }

  getPackage() {
    return axios.get("account/package", { headers: authHeader() })
  }

  createServer(osType, osVersion, ssdType, packageId, hostName, userName, password) {
    return axios.post("account/create-server", {osType, osVersion, ssdType, packageId, hostName, userName, password}, { headers: authHeader() })
  }

  getServer() {
    return axios.get("account/server", { headers: authHeader() })
  }

  getServerDetail(serverId) {
    return axios.get(`account/server-detail/${serverId}`, { headers: authHeader() })
  }
}

export default new UserService();