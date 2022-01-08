import axios from "../config/axios";
import authHeader from "./auth-header";

class AuthService {
  login(email, password) {
    return axios.post("account/login", {
      email,
      password
    }).then((res) => {
      if (res.data.code === 0) {
        localStorage.setItem("profile", JSON.stringify(res.data.result))
        localStorage.setItem("status", JSON.stringify({
          code: res.data.code,
          status: res.data.status,
          message: res.data.message
        }))
      } else {
        localStorage.setItem("status", JSON.stringify({
          code: res.data.code,
          status: res.data.status,
          message: res.data.message
        }))
      }

      return res.data
    })
  }

  logout() {
    localStorage.removeItem("profile")
    localStorage.removeItem("status")
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("profile"))
  }

  getResultLogin() {
    return JSON.parse(localStorage.getItem("status"))
  }

  register(email, password, phone) {
    return axios.post("account/register", {
      email, password, phone
    }).then((res) => {
      if (res.data.code === 0) {

      } else {

      }

      return res.data
    })
  }

  changePassword(password1, password2) {
    return axios.post("account/change_pwd", { password1, password2 }, { headers: authHeader() })
  }
}

export default new AuthService();