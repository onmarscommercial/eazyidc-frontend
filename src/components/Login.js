import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2";
import Logo from "../assets/images/logo.png"
import AuthService from "../services/auth"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  let navigate = useNavigate()

  useEffect(() => {

  })

  const handleLogin = e => {
    e.preventDefault();
    AuthService.login(email, password).then(() => {
      let resultLogin = AuthService.getResultLogin()
      if (resultLogin.code === 0) {
        navigate('/index')
        Swal.fire({
          icon: 'success',
          title: resultLogin.message
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: resultLogin.message
        })
      }
    })
  }

  return (
    <div className="form-wrapper">
      <div className="form-box">
        <Link to={"/"} className="sidebar-header text-center">
          <img src={Logo} alt="eazyidc logo"/>
        </Link>

        <div className="box-white">
          <form onSubmit={handleLogin}>
            <h4 className="mb-4">เข้าสู่ระบบ</h4>
            <div className="form-floating mb-3">
              <input type="email" className="form-control" id="email" placeholder="อีเมล" value={email} onChange={e => setEmail(e.target.value)}/>
              <label htmlFor="email">อีเมล</label>
            </div>
            <div className="form-floating mb-3">
              <input type="password" className="form-control" id="password" placeholder="รหัสผ่าน" value={password} onChange={e => setPassword(e.target.value)}/>
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