import React, { Component } from "react";
import { Link } from "react-router-dom"
import Logo from "../assets/images/logo.png"
class Login extends Component {
  render() {
    return (
      <div className="form-wrapper">
        <div className="form-box">
          <Link to={"/"} className="sidebar-header text-center">
            <img src={Logo} alt="eazyidc logo"/>
          </Link>

          <div className="box-white">
            <form action="/index">
              <h4 className="mb-4">เข้าสู่ระบบ</h4>
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="email" placeholder="อีเมล"/>
                <label htmlFor="email">อีเมล</label>
              </div>
              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="password" placeholder="รหัสผ่าน"/>
                <label htmlFor="password">รหัสผ่าน</label>
              </div>
              <button type="submit" className="btn btn-primary btn-lg py-3 w-100 mb-3">เข้าสู่ระบบ</button>
            </form>
            <div className="d-flex justify-content-between">
              <Link to={"/forgot-password"}>ลืมรหัสผ่าน</Link>
              <p className="mb-2">ยังไม่มีบัญชี? <Link to={"/register"}>สมัครสมาชิก</Link></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;