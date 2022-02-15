import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/logo.png"
import Server from "../assets/images/icons/server.svg"
import Wallet from "../assets/images/icons/wallet.svg"
import Profile from "../assets/images/icons/profile.svg"
import Logout from "../assets/images/icons/logout.svg"
import AuthService from "../services/auth"
import UserService from "../services/user"

export default function Sidebar() {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  let [currentBalance, setCurrentBalance] = useState(0)
  
  const toggleMenuMobile = () => {
    setTimeout(() => {
      const headerMobile = document.getElementById('menuButton');
      const sidebar = document.getElementById('sidebar');
  
      if (headerMobile) {
        headerMobile.addEventListener('click', () => {
          headerMobile.classList.toggle('open');
          sidebar.classList.toggle('show-menu');
        });
      }
    }, 100);
  }

  const logOut = () => {
    AuthService.logout()
  }

  const getBalance = () => {
    UserService.getBalance().then((res) => {
      if (res.data.code === 0) {
        setCurrentBalance(res.data.result.balance)
      } else {
        AuthService.logout()
      }
    })
  }

  useEffect(() => {
    toggleMenuMobile();
    const interval = setInterval(() => getBalance(), 500)
    return () => clearInterval(interval)
  })

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
              <span>{currentBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
              <small> ฿</small>
          </h2>
        </div>
        <div className="main-menu">
          <Link to={"/index"} className={splitLocation[1] === "index" ? "menu-link active" : "menu-link"}>
            <img src={Server} alt="Server"/>
            <span>เซิร์ฟเวอร์</span>
          </Link>
          <Link to={"/topup"} className={splitLocation[1] === "topup" ? "menu-link active" : "menu-link"}>
            <img src={Wallet} alt="Wallet"/>
            <span>เติมเงิน</span>
          </Link>
          <Link to={"/account"} className={splitLocation[1] === "account" ? "menu-link active" : "menu-link"}>
            <img src={Profile} alt="Profile"/>
            <span>บัญชีผู้ใช้</span>
          </Link>
          <Link to={"/"} className="menu-link mt-auto" onClick={logOut}>
            <img src={Logout} alt="Logout"/>
            <span>ออกจากระบบ</span>
          </Link>
        </div>
      </nav>
    </div>
  )
};