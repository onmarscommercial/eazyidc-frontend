import React, { Component } from "react";
import { Route, Routes } from "react-router-dom"
import './assets/css/app.css'
import Account from "./components/Account";
import CreateServer from "./components/CreateServer";
import ForgotPassword from "./components/ForgotPassword";
import Index from "./components/Index";
import Login from "./components/Login";
import Manage from "./components/Manage";
import Register from "./components/Register";
import TermOfService from "./components/TermOfService";
import Topup from "./components/Topup";
import VerifyOTP from "./components/VerifyOTP";
class App extends Component {
  render() {
    return (
      <div>
        <Routes>
          <Route exact path="/" element={<Login />}/>
          <Route exact path="/register" element={<Register />}/>
          <Route exact path="/forgot-password" element={<ForgotPassword />}/>
          <Route exact path="/index" element={<Index />}/>
          <Route exact path="/account" element={<Account />}/>
          <Route exact path="/topup" element={<Topup />}/>
          <Route exact path="/create-server" element={<CreateServer />}/>
          <Route exact path="/manage" element={<Manage />}/>
          <Route exact path="/verify-otp" element={<VerifyOTP />}/>
          <Route exact path="/term-of-service" element={<TermOfService />}/>
        </Routes>
      </div>
    )
  }
}

export default App;