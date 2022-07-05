import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2";
// import Logo from "../assets/images/logo.png"
import ShopLogo from "../assets/images/Shop_Logo.png"
import AuthService from "../services/auth"

export default function Register() {
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [taxId, setTaxId] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [verifyPassword, setVerifyPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [checked, setChecked] = useState(false)
  const [customerType, setCustomerType] = useState("O")
  let navigate = useNavigate()

  const handleRegister = e => {
    e.preventDefault();
    if (checked === true) {
      if (checkPassword(password) === true) {
        if (password === verifyPassword) {
          AuthService.register(email, password, phone, firstname, lastname, customerType, companyName, taxId).then((res) => {
            if (res.data.code === 0) {
              Swal.fire({
                icon: 'success',
                title: res.data.message
              })
              navigate('/')
            } else {
              Swal.fire({
                icon: 'error',
                title: res.data.message
              })
            }
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: `Passwords don't match`
          })
        }
      } else {
        Swal.fire({
          icon: 'error',
          html: `รหัสผ่านต้องมีความยาว 8-16 ตัวอักษร
                 <ul class="text-start">
                  <li>ต้องมีตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว</li>
                  <li>ต้องมีตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว</li>
                  <li>ต้องมีตัวเลขอย่างน้อย 1 ตัว</li>
                  <li>ต้องมีอักขระพิเศษอย่างน้อย 1 ตัว</li>
                 </ul>`
        })
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'โปรดคลิกยอมรับข้อตกลง เพื่อดำเนินการต่อไป'
      })
    }
  }

  const handleChecked = () => setChecked(!checked)

  const checkPassword = (password) => {
    var check = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/)
    if (!check.test(password)) {
      return false
    } else {
      return true
    }
  }

  const changeCustomerType = e => {
    setCustomerType(e.target.value)
  }

  const changeTaxId = e => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setTaxId(e.target.value)
    }
  }

  return (
    <div className="form-register-eazy">
      <div className="form-register-box-eazy mt-4">
        <div className="box-white">
          <Link to={"/"} className="sidebar-header text-center">
            <img src={ShopLogo} alt="eazyidc logo"/>
          </Link>
          <form onSubmit={handleRegister}>
            <h4>สมัครสมาชิก</h4>
            <p className="mb-2">กรุณากรอกข้อมูลให้ถูกต้อง</p>
            <fieldset className="mb-3">
              <legend className="col-form-label">ประเภทธุรกิจ</legend>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" id="ordinary" name="customerType" value="O" checked={customerType === 'O'} onChange={changeCustomerType} />
                <label className="form-check-label" htmlFor="ordinary">บุคคลธรรมดา</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" id="juristic" name="customerType" value="J" checked={customerType === 'J'} onChange={changeCustomerType} />
                <label className="form-check-label" htmlFor="juristic">นิติบุคคล</label>
              </div>
            </fieldset>
            <div className="form-floating mb-3" style={{display: customerType === "O" ? "none" : ""}}>
              <input type="text" className="form-control" id="companyName" placeholder="ชื่อบริษัท" value={companyName} onChange={e => setCompanyName(e.target.value)} />
              <label htmlFor="companyName">ชื่อบริษัท</label>
            </div>
            <div className="form-floating mb-3" style={{display: customerType === "O" ? "none" : ""}}>
              <input type="text" className="form-control" id="taxId" placeholder="เลขประจำตัวผู้เสียภาษี" value={taxId} onChange={changeTaxId} maxLength="13"/>
              <label htmlFor="taxId">เลขประจำตัวผู้เสียภาษี</label>
            </div>
            <div className="form-floating mb-3" style={{display: customerType === "J" ? "none" : ""}}>
              <input type="text" className="form-control" id="firstname" placeholder="ชื่อ" value={firstname} onChange={e => setFirstname(e.target.value)} />
              <label htmlFor="firstname">ชื่อ</label>
            </div>
            <div className="form-floating mb-3" style={{display: customerType === "J" ? "none" : ""}}>
              <input type="text" className="form-control" id="lastname" placeholder="นามสกุล" value={lastname} onChange={e => setLastname(e.target.value)} />
              <label htmlFor="lastname">นามสกุล</label>
            </div>
            <div className="form-floating mb-3">
              <input type="email" className="form-control" id="email" placeholder="อีเมล" value={email} onChange={e => setEmail(e.target.value)} />
              <label htmlFor="email">อีเมล</label>
            </div>
            <div className="form-floating mb-3">
              <input type="password" className="form-control" id="password" placeholder="รหัสผ่าน" value={password} onChange={e => setPassword(e.target.value)} />
              <label htmlFor="password">รหัสผ่านใหม่</label>
            </div>
            <div className="form-floating mb-3">
              <input type="password" className="form-control" id="verify-password" placeholder="รหัสผ่าน" value={verifyPassword} onChange={e => setVerifyPassword(e.target.value)} />
              <label htmlFor="verify-password">ยืนยันรหัสผ่าน</label>
            </div>
            <div className="form-floating mb-3">
              <input type="number" className="form-control" id="tel" placeholder="เบอร์โทรศัพท์" value={phone} onChange={e => setPhone(e.target.value)} />
              <label htmlFor="tel">เบอร์โทรศัพท์</label>
            </div>
            <div className="form-check mb-4">
              <input className="form-check-input" type="checkbox" checked={checked} id="flexCheckDefault" onChange={handleChecked} />
              <label className="form-check-label">
                ฉันได้อ่านและยอมรับ <Link to={"/term-of-service"}>เงื่อนไขและข้อตกลงการให้บริการ</Link>
              </label>
            </div>
            <button type="submit" className="btn btn-eazy btn-lg py-3 w-100 mb-3">สมัครสมาชิก</button>
            <Link to={"/"} className="btn btn-light btn-lg w-100">ย้อนกลับ</Link>
          </form>
        </div>
      </div>
    </div>
  )
}