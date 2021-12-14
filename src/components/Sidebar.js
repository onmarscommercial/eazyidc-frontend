import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png"
import Server from "../assets/images/icons/server.svg"
import Wallet from "../assets/images/icons/wallet.svg"
import Profile from "../assets/images/icons/profile.svg"
import Logout from "../assets/images/icons/logout.svg"

class Sidebar extends Component {
  render() {
    return (
      <div>
        <header className="header-mobile">
          <Link to={"/index"} className="sidebar-header mb-0">
            <img src={Logo} alt="eazyidc logo"/>
          </Link>
          <div id="menuButton">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </header>
        
        <nav id="sidebar">
          <Link to={"/index"} className="sidebar-header d-none d-lg-block">
            <img src={Logo} alt="eazyidc logo"/>
          </Link>
          <div className="amount-wrapper">
            <p>ยอดเงินคงเหลือ</p>
            <h2>
                <span>0.00</span>
                <small>฿</small>
            </h2>
          </div>
          <div className="main-menu">
            <Link to={"/index"} className="menu-link">
              <img src={Server} alt="Server"/>
              <span>เซิร์ฟเวอร์</span>
            </Link>
            <Link to={"/topup"} className="menu-link">
              <img src={Wallet} alt="Wallet"/>
              <span>เติมเงิน</span>
            </Link>
            <Link to={"/account"} className="menu-link">
              <img src={Profile} alt="Profile"/>
              <span>บัญชีผู้ใช้</span>
            </Link>
            <Link to={"/"} className="menu-link mt-auto">
              <img src={Logout} alt="Logout"/>
              <span>ออกจากระบบ</span>
            </Link>
          </div>
        </nav>
      </div>
    )
  }
}

export default Sidebar;