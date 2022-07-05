import React, { Component } from "react";
import { Link } from "react-router-dom"
// import Logo from "../assets/images/logo.png"
import ShopLogo from "../assets/images/Shop_Logo.png"

class ForgotPassword extends Component {
  handleResetPassword() {

  }
  
  render() {
    return (
      <div className="form-wrapper-eazy">
        <div className="form-box">
          <div className="box-white">
            <Link to={"/"} className="sidebar-header text-center">
              <img src={ShopLogo} alt="eazyidc logo"/>
            </Link>

            <form>
              <h4>ลืมรหัสผ่าน</h4>
              <p className="mb-4">กรุณากรอกข้อมูลให้ถูกต้องเพื่อรีเซ็ตรหัสผ่าน</p>
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="email" placeholder="อีเมล" />
                <label htmlFor="email">อีเมล</label>
              </div>
              <div className="form-floating mb-3">
                <input type="number" className="form-control" id="tel" placeholder="เบอร์โทรศัพท์" />
                <label htmlFor="tel">เบอร์โทรศัพท์</label>
              </div>

              <button type="submit" className="btn btn-eazy btn-lg py-3 w-100 mb-3">รีเซ็ตรหัสผ่าน</button>
              <Link to={"/"} className="btn btn-light btn-lg w-100">ย้อนกลับ</Link>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default ForgotPassword