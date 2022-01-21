import React, { Component } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

class Manage extends Component {
  render() {
    return (
      <div className="wrapper">
        <Sidebar />
        <div id="content">
          <div className="d-flex align-items-center justify-content-between mb-4">
              <h3 className="mb-0">Name Server Here</h3>
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
                                  <p>Name Server Here</p>
                              </div>
                              <div className="mb-3">
                                  <p className="mb-0"><small><b>IP Address</b></small></p>
                                  <p>111.111.111.111</p>
                              </div>
                              <div className="mb-3">
                                  <p className="mb-0"><small><b>Username</b></small></p>
                                  <p>Administrator</p>
                              </div>
                              <div className="mb-3 mb-md-0">
                                  <p className="mb-0"><small><b>Password</b></small></p>
                                  <p className="mb-md-0">******</p>
                              </div>
                          </div>
                          <div className="col-md-6">
                              <div className="mb-3">
                                  <p className="mb-0"><small><b>Status</b></small></p>
                                  <p><span className="badge rounded-pill bg-success">Online</span></p>
                              </div>
                              <div className="mb-3">
                                  <p className="mb-0"><small><b>CPU</b></small></p>
                                  <p><b>2</b> vCPUs</p>
                              </div>
                              <div className="mb-3">
                                  <p className="mb-0"><small><b>Memory</b></small></p>
                                  <p><b>2</b> GB</p>
                              </div>
                              <div className="mb-0">
                                  <p className="mb-0"><small><b>Storage</b></small></p>
                                  <p className="mb-0"><b>30</b> GB</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="col-md-4 custom-padding">
                  <h5 className="mt-6 mt-md-0 mb-3 mb-md-4">ควบคุมเซิร์ฟเวอร์</h5>
                  <div className="box-white">
                      <Link to={"/"} className="btn btn-warning mb-2 w-100">รีสตาร์ท</Link>
                      <Link to={"/"} className="btn btn-danger mb-2 w-100">ปิดเครื่อง</Link>
                      <Link to={"/"} className="btn btn-dark mb-2 w-100">คอนโซล</Link>
                  </div>
              </div>
          </div>
          <Link to={"/"} className="btn btn-outline-danger d-inline-block">ลบเซิร์ฟเวอร์</Link>
        </div>
      </div>
    )
  }
}

export default Manage;