import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/logo.png"
import Server from "../assets/images/icons/server.svg"
import Wallet from "../assets/images/icons/wallet.svg"
import Profile from "../assets/images/icons/profile.svg"
import Logout from "../assets/images/icons/logout.svg"
import AuthService from "../services/auth"
import UserService from "../services/user"
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const location = useLocation();
  const { pathname } = location;
  const { t } = useTranslation();
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
  }, [])

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
          <p>{t('Balance')}</p>
          <h2>
              <span>{currentBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
              <small> ฿</small>
          </h2>
        </div>
        <div className="main-menu">
          <Link to={"/index"} className={splitLocation[1] === "index" ? "menu-link active" : "menu-link"}>
            <img src={Server} alt="Server"/>
            <span>{t('Server')}</span>
          </Link>
          <Link to={"/topup"} className={splitLocation[1] === "topup" ? "menu-link active" : "menu-link"}>
            <img src={Wallet} alt="Wallet"/>
            <span>{t('Topup')}</span>
          </Link>
          <Link to={"/account"} className={splitLocation[1] === "account" ? "menu-link active" : "menu-link"}>
            <img src={Profile} alt="Profile"/>
            <span>{t('Account')}</span>
          </Link>
          <div className="mt-auto">
            <Link to={"/contact-us"} className="menu-link">
              <span>{t('ContactUs')}</span>
            </Link>

            <Link to={"/"} className="menu-link" onClick={logOut}>
              <img src={Logout} alt="Logout"/>
              <span>{t('Logout')}</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar;