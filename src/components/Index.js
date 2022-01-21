import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddServer from "../assets/images/add-server.png"
import Sidebar from "./Sidebar";
import AuthService from "../services/auth"
import Swal from "sweetalert2";

export default function Index() {
  const [serverCurrent, setServerCurrent] = useState("0");
  const [serverMax, setServerMax] = useState("1")

  let navigate = useNavigate()

  useEffect(() => {
    let user = AuthService.getCurrentUser()

    if (!user) {
      navigate('/')
    } else {
      if (user.profile.status === 0) {
        setServerCurrent(user.profile.serverUnit)
        Swal.fire({
          icon: 'warning',
          title: 'กรุณายืนยันตัวตนของคุณ',
          html: '<div class="text-start">กรุณายืนยันตัวตนของคุณเพื่อรับจำนวนสำหรับสร้างเซิร์ฟเวอร์เพิ่มเติม</div>',
          confirmButtonColor: '#221eaa',
          confirmButtonText: 'ยืนยัน'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/account")
          }
        })
      } else {
        setServerMax("3")
        setServerCurrent(user.profile.serverUnit)
      }
    }

    generateBar()
  }, [navigate])

  const generateBar = () => {
    const bars = document.querySelectorAll('.progress-bar')

    if (bars) {
      bars.forEach(bar => {
        const current = bar.dataset.current;
        const max = bar.dataset.max;
        const width = (current / max) * 100;

        bar.style.width = width + '%';
        bar.parentNode.parentNode.querySelector('.number').textContent = current + ' / ' + max;
      })
    }
  }

  return (
    <div className="wrapper">
        <Sidebar/>
        <div id="content">
          <h3 className="mb-4">สถานะ</h3>
          <div className="row eazy-row">
            <div className="col-lg-auto flex-grow-1">
              <div className="box-white">
                <div className="d-flex justify-content-between">
                  <p>เซิร์ฟเวอร์</p>
                  <p className="number"></p>
                </div>
                <div className="progress">
                  <div className="progress-bar" role="progressbar" data-current={serverCurrent} data-max={serverMax} ></div>
                </div>
              </div>
            </div>
            <div className="col-lg-auto flex-grow-1">
              <div className="box-white">
                <div className="d-flex justify-content-between">
                  <p>SSH Key</p>
                  <p className="number"></p>
                </div>
                <div className="progress">
                  <div className="progress-bar bg-info" role="progressbar" data-current="0" data-max="10"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-between mb-4">
            <h3 className="mb-0">เซิร์ฟเวอร์</h3>
            <Link to={"/create-server"} className="btn btn-primary">สร้างเซิร์ฟเวอร์</Link>
          </div>

          {/* กรณี : ไม่มีเครื่องเซิร์ฟเวอร์ */}
          <div className="box-white" style={{display: 'none'}}>
            <div className="empty-server">
              <div>
                <img src={AddServer} alt=""/>
              </div>
              <div>
                <h3>ไม่มีเซิร์ฟเวอร์</h3>
                <p>ดูเหมือนว่าคุณยังไม่มีอินสแตนซ์ใดๆ <br className="d-md-none"/>กรุณาสร้างเซิร์ฟเวอร์</p>
                <Link to={"/"} className="btn btn-primary">สร้างเซิร์ฟเวอร์</Link>
              </div>
            </div>
          </div>

          {/* กรณี : มีเครื่องเซิร์ฟเวอร์ */}
          <div className="box-white d-md-flex">
            <div className="d-flex align-items-center tablet-max-width-50">
              <div className="server-status online">
                <i className="fab fa-windows"></i>
              </div>
              <div className="server-info">
                <h5>Name Server Here</h5>
                <p>111.111.111.111</p>
                <p>
                    <b>1</b> vCPUs /
                    Ram <b>2</b> GB /
                    SSD <b>30</b> GB
                </p>
              </div>
            </div>
            <div className="ms-auto align-self-md-center mt-3 mt-lg-0">
              <Link to={"/manage"} className="btn btn-primary mobile-w-100 me-2">จัดการ</Link>
              <Link to={"/"} className="btn btn-warning d-none d-md-inline me-2">รีสตาร์ท</Link>
              <Link to={"/"} className="btn btn-danger d-none d-md-inline me-2">ปิดเครื่อง</Link>
              <Link to={"/"} className="btn btn-dark d-none d-md-inline">คอนโซล</Link>
            </div>
          </div>

          <div className="box-white d-md-flex">
            <div className="d-flex align-items-center tablet-max-width-50">
              <div className="server-status offline">
                <i className="fab fa-ubuntu"></i>
              </div>
              <div className="server-info">
                <h5>Name Server Here</h5>
                <p>111.111.111.111</p>
                <p>
                    <b>1</b> vCPUs /
                    Ram <b>2</b> GB /
                    SSD <b>30</b> GB
                </p>
              </div>
            </div>
            <div className="ms-auto align-self-md-center mt-3 mt-lg-0">
              <Link to={"/manage"} className="btn btn-primary mobile-w-100 me-2">จัดการ</Link>
              <Link to={"/"} className="btn btn-warning d-none d-md-inline me-2">รีสตาร์ท</Link>
              <Link to={"/"} className="btn btn-success d-none d-md-inline me-2">เปิดเครื่อง</Link>
              <Link to={"/"} className="btn btn-dark d-none d-md-inline">คอนโซล</Link>
            </div>
          </div>
        </div>
      </div>
  )
};