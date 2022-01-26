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
        localStorage.setItem("login", true);
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
    localStorage.removeItem("login")
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("profile"))
  }

  getResultLogin() {
    return JSON.parse(localStorage.getItem("status"))
  }

  getStatusLogin() {
    return JSON.parse(localStorage.getItem("login"))
  }

  register(email, password, phone, firstname, lastname) {
    return axios.post("account/register", {
      email, password, phone, firstname, lastname
    }).then((res) => {
      if (res.data.code === 0) {

      } else {

      }

      return res.data
    })
  }

  changePassword(newPassword, verifyNewPassword) {
    return axios.post("account/change_pwd", { newPassword, verifyNewPassword }, { headers: authHeader() })
  }

  verify() {

  }
}

export default new AuthService();