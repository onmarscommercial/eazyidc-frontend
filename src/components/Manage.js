import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import AuthService from "../services/auth"
import UserService from "../services/user"
import Swal from "sweetalert2";

export default function Manage() {
  const [serverDetail, setServerDetail] = useState({})
  let { serverId } = useParams()

  let navigate = useNavigate()

  useEffect(() => {
    let user = AuthService.getCurrentUser()

    if (user) {
      getServerDetail(serverId)
    } else {
      navigate('/')
    }
    
  }, [navigate, serverId])

  const getServerDetail = (serverId) => {
    UserService.getServerDetail(serverId).then(res => {
      setServerDetail(res.data.result.server)
    })
  }

  const shutdownServer = (serverId) => {
    UserService.shutdownServer(serverId).then((res) => {
      if (res.data.code === 0) {
        Swal.fire({
          icon: 'success',
          title: res.data.message
        })
        getServerDetail(serverId)
      }
    })
  }

  const openServer = (serverId) => {
    UserService.openServer(serverId).then((res) => {
      if (res.data.code === 0) {
        Swal.fire({
          icon: 'success',
          title: res.data.message
        })
        getServerDetail(serverId)
      }
    })
  }

  const restartServer = () => {
    let timerInterval
    Swal.fire({
      title: 'กำลังรีสตาร์ทเซิร์ฟเวอร์',
      timer: 5000,
      didOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {

        })
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        //command restart server
        Swal.fire({
          icon: 'success',
          title: "รีสตาร์ทเซิร์ฟเวอร์สำเร็จ"
        })
      }
    })
  }

  const consoleServer = () => {
    let timerInterval
    Swal.fire({
      title: "กำลังเปิดคอนโซล",
      timer: 5000,
      didOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {

        })
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        //command open console
      }
    })
  }

  const deleteServer = (serverId) => {
    Swal.fire({
      icon: 'warning',
      title: 'ต้องการลบเซิร์ฟเวอร์หรือไม่',
      showCancelButton: true,
      confirmButtonText: "ตกลง",
      confirmButtonColor: "#221eaa",
      cancelButtonText: "ยกเลิก",
      cancelButtonColor: "#dc3545"
    }).then((result) => {
      if (result.isConfirmed) {
        UserService.deleteServer(serverId).then((res) => {
          if (res.data.code === 0) {
            Swal.fire({
              icon: 'success',
              title: res.data.message
            })
          }
        })
      }
    })
  }
  
  return (
    <div className="wrapper">
      <Sidebar />
      <div id="content">
        <div className="d-flex align-items-center justify-content-between mb-4">
            <h3 className="mb-0">{serverDetail.hostname}</h3>
            <Link to={"/index"} className="btn btn-outline-primary">ย้อนกลับ</Link>
        </div>
        <div className="row custom-row">
            <div className="col-lg-4 custom-padding">
                <div className="box-white">
                    <p className="mb-1">CPU ที่ใช้งาน</p>
                    <h2 className="text-primary mb-0">12.25 <small className="fs-6">%</small></h2>
                </div>
            </div>
            <div className="col-lg-4 custom-padding">
                <div className="box-white">
                    <p className="mb-1">Memory ที่ใช้งาน</p>
                    <h2 className="text-primary mb-0">52.25 <small className="fs-6">%</small></h2>
                </div>
            </div>
            {/* <div className="col-lg-4 custom-padding">
                <div className="box-white">
                    <p className="mb-1">ค่าใช้จ่ายปัจจุบัน</p>
                    <h2 className="text-primary mb-0">2,340.34 <small className="fs-6">฿</small></h2>
                </div>
            </div> */}
        </div>

        <div className="row custom-row">
            <div className="col-md-8 custom-padding">
                <h5 className="mt-6 mt-md-0 mb-3 mb-md-4">รายละเอียดเซิร์ฟเวอร์</h5>
                <div className="box-white">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <p className="mb-0"><small><b>Hostname</b></small></p>
                                <p>{serverDetail.hostname}</p>
                            </div>
                            <div className="mb-3">
                                <p className="mb-0"><small><b>IP Address</b></small></p>
                                <p>{serverDetail.ip_address}</p>
                            </div>
                            <div className="mb-3">
                                <p className="mb-0"><small><b>Username</b></small></p>
                                <p>{serverDetail.username}</p>
                            </div>
                            <div className="mb-3 mb-md-0">
                                <p className="mb-0"><small><b>Password</b></small></p>
                                <p className="mb-md-0">{"********"}</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <p className="mb-0"><small><b>Status</b></small></p>
                                <p><span className={serverDetail.status === 1 ? "badge rounded-pill bg-success" : "badge rounded-pill bg-danger"}>{serverDetail.status === 1 ? "Online" : "Offline"}</span></p>
                            </div>
                            <div className="mb-3">
                                <p className="mb-0"><small><b>CPU</b></small></p>
                                <p><b>{serverDetail.cpu_unit}</b> vCPUs</p>
                            </div>
                            <div className="mb-3">
                                <p className="mb-0"><small><b>Memory</b></small></p>
                                <p><b>{serverDetail.memory_unit}</b> GB</p>
                            </div>
                            <div className="mb-0">
                                <p className="mb-0"><small><b>Storage</b></small></p>
                                <p className="mb-0"><b>{serverDetail.ssd_unit}</b> GB</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-4 custom-padding">
                <h5 className="mt-6 mt-md-0 mb-3 mb-md-4">ควบคุมเซิร์ฟเวอร์</h5>
                <div className="box-white">
                    <button className="btn btn-warning mb-2 w-100" onClick={() => restartServer()}>รีสตาร์ท</button>
                    <button className={serverDetail.status === 1 ? "btn btn-danger mb-2 w-100" : "btn btn-success mb-2 w-100"} onClick={serverDetail.status === 1 ? () => shutdownServer(serverId) : () => openServer(serverId)}>
                        {serverDetail.status === 1 ? "ปิดเครื่อง" : "เปิดเครื่อง"}
                    </button>
                    <button className="btn btn-dark mb-2 w-100" onClick={() => consoleServer()}>คอนโซล</button>
                </div>
            </div>
        </div>
        <button className="btn btn-outline-danger d-inline-block" onClick={() => deleteServer(serverId)}>ลบเซิร์ฟเวอร์</button>
      </div>
    </div>
  )
}

