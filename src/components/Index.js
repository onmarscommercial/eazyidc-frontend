import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddServer from "../assets/images/add-server.png"
import Sidebar from "./Sidebar";
import AuthService from "../services/auth"
import UserService from "../services/user"
import Swal from "sweetalert2";

export default function Index() {
  const [currentUser, setCurrentUser] = useState(undefined)
  const [serverList, setServerList] = useState([])
  const [serverCurrent, setServerCurrent] = useState(0);
  const [serverMax, setServerMax] = useState(1)

  let navigate = useNavigate()

  useEffect(() => {
    let profile = AuthService.getCurrentUser()
    
    if (profile) {
      setCurrentUser(profile)
      getServer()
      if (profile.profile.status === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'กรุณายืนยันตัวตนของคุณ',
          html: '<div class="text-start">กรุณายืนยันตัวตนของคุณเพื่อรับจำนวนสำหรับสร้างเซิร์ฟเวอร์เพิ่มเติม</div>',
          confirmButtonColor: '#221eaa',
          confirmButtonText: 'ยืนยัน',
          showCloseButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/account")
          }
        })        
      } else {
        setServerMax(3)
      }
    } else {
      navigate('/')
      setCurrentUser(undefined)
    }

    generateBar()
  }, [navigate, serverCurrent])

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

  const getServer = () => {
    UserService.getServer().then((res) => {
      if (res.data.code === 0) {
        setServerList(res.data.result.serverList)
        setServerCurrent(res.data.result.serverUnit)
      }
    })
  }

  const restartServer = () => {
    alert("restart")
  }

  const shutdownServer = () => {
    alert("shutdown")
  }

  const consoleServer = () => {
    alert("console")
  }

  let isHaveServer = (
    <div className="box-white">
      <div className="empty-server">
        <div>
          <img src={AddServer} alt="AddServer"/>
        </div>
        <div>
          <h3>ไม่มีเซิร์ฟเวอร์</h3>
          <p>ดูเหมือนว่าคุณยังไม่มีอินสแตนซ์ใดๆ <br className="d-md-none"/>กรุณาสร้างเซิร์ฟเวอร์</p>
          <Link to={"/create-server"} className="btn btn-primary">สร้างเซิร์ฟเวอร์</Link>
        </div>
      </div>
    </div>
  )

  if (currentUser) {
    if (serverCurrent > 0) {
      isHaveServer = (
        <div>
          {serverList && serverList.map((server, index) => (
          <div className="box-white d-md-flex" key={index}>
            <div className="d-flex align-items-center tablet-max-width-50">
              <div className={server.status === 1 ? "server-status online" : "server-status offline"}>
                <i className={server.os_type === "Window Server" ? "fab fa-windows" : server.os_type === "Ubuntu" ? "fab fa-ubuntu" : "fab fa-centos"}></i>
              </div>
              <div className="server-info">
                <h5>{server.hostname}</h5>
                <p>{server.ip_address}</p>
                <p>
                    <b>{server.cpu_unit}</b> vCPUs / Ram <b>{server.memory_unit}</b> GB / SSD <b>{server.ssd_unit}</b> GB
                </p>
              </div>
            </div>
            <div className="ms-auto align-self-md-center mt-3 mt-lg-0">
              <Link to={"/manage/" + server.serverId} className="btn btn-primary mobile-w-100 me-2">จัดการ</Link>
              <button className="btn btn-warning d-none d-md-inline me-2" onClick={restartServer}>รีสตาร์ท</button>
              <button className={server.status === 1 ? "btn btn-danger d-none d-md-inline me-2" : "btn btn-success d-none d-md-inline me-2"} onClick={shutdownServer}>{server.status === 1 ?"ปิดเครื่อง" : "เปิดเครื่อง"}</button>
              <button className="btn btn-dark d-none d-md-inline" onClick={consoleServer}>คอนโซล</button>
            </div>
          </div>
          ))}
        </div>
      )
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

          {isHaveServer}
        </div>
      </div>
  )
};