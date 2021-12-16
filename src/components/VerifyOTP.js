import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png"

class VerifyOTP extends Component {
  render() {
    return (
      <div className="form-wrapper">
        <div className="form-box">
          <Link to={"/index"} className="sidebar-header text-center">
              <img src={Logo}  alt="eazyidc logo" />
          </Link>
          <div className="box-white">
            <form action="/">
              <h4>ยืนยันเบอร์โทรศัพท์</h4>
              <p className="mb-4">ระบบได้ส่งรหัสยืนยันไปที่เบอร์โทรศัพท์ <b>0888123401</b></p>
              <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="otp" placeholder="รหัสยืนยัน (Ref. O45N7U)" />
                  <label htmlFor="otp">รหัสยืนยัน (Ref. O45N7U)</label>
              </div>
              <button type="submit" className="btn btn-primary btn-lg py-3 w-100 mb-3">ยืนยัน</button>
              <Link to={"/"} className="btn btn-light btn-lg w-100">ยกเลิก</Link>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default VerifyOTP;