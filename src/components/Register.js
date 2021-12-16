import React, { Component } from "react";
import { Link } from "react-router-dom"
import Logo from "../assets/images/logo.png"
class Register extends Component {
  render() {
    return (
      <div className="form-wrapper">
        <div className="form-box">
          <Link to={"/"} className="sidebar-header text-center">
            <img src={Logo} alt="eazyidc logo"/>
          </Link>

          <div className="box-white">
            <form action="/verify-otp">
              <h4>สมัครสมาชิก</h4>
              <p className="mb-4">กรุณากรอกข้อมูลให้ถูกต้อง</p>
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="email" placeholder="อีเมล" />
                <label htmlFor="email">อีเมล</label>
              </div>
              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="password" placeholder="รหัสผ่าน" />
                <label htmlFor="password">รหัสผ่านใหม่</label>
              </div>
              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="verify-password" placeholder="รหัสผ่าน" />
                <label htmlFor="verify-password">ยืนยันรหัสผ่าน</label>
              </div>
              <div className="form-floating mb-3">
                <input type="number" className="form-control" id="tel" placeholder="เบอร์โทรศัพท์" />
                <label htmlFor="tel">เบอร์โทรศัพท์</label>
              </div>
              <div className="form-check mb-4">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                <label className="form-check-label">
                  ฉันได้อ่านและยอมรับ <Link to={"/term-of-service"}>เงื่อนไขและข้อตกลงการให้บริการ</Link>
                </label>
              </div>
              <button type="submit" className="btn btn-primary btn-lg py-3 w-100 mb-3">สมัครสมาชิก</button>
              <Link to={"/"} className="btn btn-light btn-lg w-100">ย้อนกลับ</Link>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Register;