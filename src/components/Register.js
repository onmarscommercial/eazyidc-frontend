import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2";
import Logo from "../assets/images/logo.png"
import AuthService from "../services/auth"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [verifyPassword, setVerifyPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [checked, setChecked] = useState(false)
  let navigate = useNavigate()

  const handleRegister = e => {
    e.preventDefault();
    if (checked === true) {
      if (checkPassword(password) === true) {
        if (password === verifyPassword) {
          AuthService.register(email, password, phone).then((res) => {
            Swal.fire({
              icon: 'success',
              title: res.message
            })
            navigate('/')
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

  return (
    <div className="form-wrapper">
      <div className="form-box">
        <Link to={"/"} className="sidebar-header text-center">
          <img src={Logo} alt="eazyidc logo"/>
        </Link>

        <div className="box-white">
          <form onSubmit={handleRegister}>
            <h4>สมัครสมาชิก</h4>
            <p className="mb-4">กรุณากรอกข้อมูลให้ถูกต้อง</p>
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
            <button type="submit" className="btn btn-primary btn-lg py-3 w-100 mb-3">สมัครสมาชิก</button>
            <Link to={"/"} className="btn btn-light btn-lg w-100">ย้อนกลับ</Link>
          </form>
        </div>
      </div>
    </div>
  )
}