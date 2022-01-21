import React, { Component } from "react";
import Sidebar from "./Sidebar";
import AuthService from "../services/auth"
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import { faUserShield, faUserCheck, faKey, faIdCard } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

class Account extends Component {
  constructor(props) {
    super(props)
    this.onChangeOldPassword = this.onChangeOldPassword.bind(this)
    this.onChangeNewPassword = this.onChangeNewPassword.bind(this)
    this.onChangeVerifyNewPassword = this.onChangeVerifyNewPassword.bind(this)

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      isLogin: AuthService.getStatusLogin(),
      oldPassword: "",
      newPassword: "",
      verifyNewPassword: ""
    } 
  }

  onChangeOldPassword(e) {
    this.setState({
      oldPassword: e.target.value
    })
  }

  onChangeNewPassword(e) {
    this.setState({
      newPassword: e.target.value
    })
  }

  onChangeVerifyNewPassword(e) {
    this.setState({
      verifyNewPassword: e.target.value
    })
  }

  checkPassword = (password) => {
    var check = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/)
    if (!check.test(password)) {
      return false
    } else {
      return true
    }
  }

  changePassword = () => {
    if (this.checkPassword(this.state.newPassword) === true) {
      AuthService.changePassword(this.state.newPassword, this.state.verifyNewPassword).then((res) => {
        if (res.data.code === 0) {
          Swal.fire({
            icon: 'success',
            title: res.data.message,
          })
          this.setState({
            oldPassword: "",
            newPassword: "",
            verifyNewPassword: ""
          })
        }
      })
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
  }

  render() {
    let { currentUser, isLogin } = this.state

    if (!isLogin) {
      return <Navigate to="/" />
    }

    return (
      <div className="wrapper">
        <Sidebar/>
        <div id="content">
          <div className="row justify-content-center">
            <div className="col-xl-7">
              <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <button className="nav-link active" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="true">
                    <FontAwesomeIcon icon={faUserShield} /> บัญชีผู้ใช้
                  </button>
                  <button className="nav-link" id="nav-verify-tab" data-bs-toggle="tab" data-bs-target="#nav-verify" type="button" role="tab" aria-controls="nav-verify" aria-selected="false">
                    <FontAwesomeIcon icon={faUserCheck} /> การยืนยันตัวตน
                  </button>
                  <button className="nav-link" id="nav-sshkey-tab" data-bs-toggle="tab" data-bs-target="#nav-sshkey" type="button" role="tab" aria-controls="nav-sshkey" aria-selected="false">
                    <FontAwesomeIcon icon={faKey} /> SSH Keys
                  </button>
                </div>
              </nav>
              <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                  <div className="card-no-top-border">
                    <div className="card-body">
                      <h5 className="card-title">ข้อมูลส่วนตัว</h5>
                      <div className="row">
                        <p className="col-5 text-end text-secondary mb-2">อีเมล</p>
                        <p className="col col-xl-7 mb-2">{currentUser.profile.email}</p>
                      </div>
                      <div className="row">
                        <p className="col-5 text-end text-secondary mb-2">รหัสผ่าน</p>
                        <p className="col col-xl-7 mb-2">{"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"}</p>
                      </div>
                      <div className="row">
                        <p className="col-5 text-end text-secondary mb-2">เบอร์โทรศัพท์</p>
                        <p className="col col-xl-7 mb-2">{currentUser.profile.phone}</p>
                      </div>
                      <button type="button" className="btn btn-primary btn-lg w-100 mt-3" data-bs-toggle="modal" data-bs-target="#changePassword">เปลี่ยนรหัสผ่าน</button>
                  
                      <div className="modal fade" id="changePassword" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title">เปลี่ยนรหัสผ่าน</h5>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                              <form>
                                <div className="form-floating mb-3">
                                  <input type="password" className="form-control" id="old-password" placeholder="รหัสผ่านเดิม" value={this.state.oldPassword} onChange={this.onChangeOldPassword} />
                                  <label htmlFor="old-password">รหัสผ่านเดิม</label>
                                </div>
                                <div className="form-floating mb-3">
                                  <input type="password" className="form-control" id="new-password" placeholder="รหัสผ่านใหม่" value={this.state.newPassword} onChange={this.onChangeNewPassword} />
                                  <label htmlFor="new-password">รหัสผ่านใหม่</label>
                                </div>
                                <div className="form-floating mb-3">
                                  <input type="password" className="form-control" id="verify-new-password" placeholder="ยืนยันรหัสผ่านใหม่" value={this.state.verifyNewPassword} onChange={this.onChangeVerifyNewPassword} />
                                  <label htmlFor="verify-new-password">ยืนยันรหัสผ่านใหม่</label>
                                </div>
                                <button type="button" className="btn btn-primary btn-lg w-100 mb-3">เปลี่ยนรหัสผ่าน</button>
                                <button type="button" className="btn btn-outline-primary btn-lg w-100" data-bs-dismiss="modal">ยกเลิก</button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="nav-verify" role="tabpanel" aria-labelledby="nav-verify-tab">
                  <div className="card-no-top-border">
                    <div className="card-body">
                      <h5 className="card-title text-center">
                        <FontAwesomeIcon icon={faIdCard} size="2x"/>
                        <p className="mt-2">การยืนยันตัวตน</p>
                      </h5>
                      <div>
                        <form>
                          <div className="text-center mt-2">
                            เอกสารยืนยันตัวตนของคุณ เช่น บัตรประจำตัวประชาชน, ใบขับขี่ หรือ พาสปอร์ต
                          </div>
                          <div className="row mt-4 ms-5 me-5">
                            <div className="col-md">
                              <input type="file" className="form-control"/>
                            </div>
                          </div>
                          <div className="row mt-5">
                            <div className="text-center">* เมื่อยืนยันตัวตนสำเร็จ คุณจะสามารถสร้างได้สูงสุด 3 เซิร์ฟเวอร์ *</div>
                            <div className="col-md mt-4">
                              <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="accept" />
                                <label className="form-check-label" for="accept">ฉันยอมรับว่าเอกสารถูกต้อง และตกลงให้ความยินยอมรวมถึงอนุญาตตามเงื่อนไขที่กำหนดทั้งหมด</label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md">
                              <button type="button" className="btn btn-primary btn-lg w-100 mt-3">ยืนยัน</button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="nav-sshkey" role="tabpanel" aria-labelledby="nav-sshkey-tab">
                  <div className="card-no-top-border">
                    <div className="card-body">
                      <h5 className="card-title">SSH Keys</h5>

                      {/* กรณีไม่มี ssh key */}
                      {/* <p className="text-secondary text-center mb-3">ไม่พบข้อมูล SSH Keys</p> */}

                      {/* กรณีมี ssh key */}
                      <div className="card mb-3">
                        <div className="card-body">
                          <div className="d-md-flex justify-content-between">
                            <div className="ssh-info mb-3 mb-md-0">
                              <h5>Name SSH Key <span className="text-secondary">(ssh-rsa)</span></h5>
                              <p className="mb-0">
                                  <small>25:34:d1:22:c4:c4:e5:aa:a9:a2:dd:5a:ax:11:32:92</small>
                              </p>
                            </div>
                            <div className="ssh-action">
                              <div className="ssh-action-button">
                                <button type="button" id="editSshBtn" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#editSsh">
                                  <span className="material-icons-outlined">edit</span>
                                </button>
                              </div>
                              <div className="ssh-action-button">
                                <button type="button" className="btn btn-outline-danger">
                                  <span className="material-icons-outlined">delete_outline</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="card mb-3">
                        <div className="card-body">
                          <div className="d-md-flex justify-content-between">
                            <div className="ssh-info mb-3 mb-md-0">
                              <h5>Name SSH Key <span className="text-secondary">(ssh-rsa)</span></h5>
                              <p className="mb-0">
                                  <small>25:34:d1:22:c4:c4:e5:aa:a9:a2:dd:5a:ax:11:32:92</small>
                              </p>
                            </div>
                            <div className="ssh-action">
                              <div className="ssh-action-button">
                                <button type="button" id="editSshBtn" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#editSsh">
                                  <span className="material-icons-outlined">edit</span>
                                </button>
                              </div>
                              <div className="ssh-action-button">
                                <button type="button" className="btn btn-outline-danger">
                                  <span className="material-icons-outlined">delete_outline</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button type="button" className="btn btn-primary btn-lg w-100" data-bs-toggle="modal" data-bs-target="#createSsh">เพิ่ม SSH Key</button>

                      {/* Create Modal */}
                      <div className="modal fade" id="createSsh" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                              <div className="modal-content">
                                  <div className="modal-header">
                                      <h5 className="modal-title">เพิ่ม SSH Key</h5>
                                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>
                                  <div className="modal-body">
                                      <form action="">
                                          <div className="form-floating mb-3">
                                              <input type="text" className="form-control" id="ssh-name" placeholder="Name"/>
                                              <label htmlFor="ssh-name">Name</label>
                                          </div>
                                          <div className="form-floating mb-3">
                                              <textarea className="form-control" id="ssh-public-key" placeholder="Public Key" value={""}></textarea>
                                              <label htmlFor="ssh-public-key">Public Key</label>
                                          </div>
                                          <button type="button" className="btn btn-primary btn-lg w-100 mb-3">เพิ่ม SSH Key</button>
                                          <button type="button" className="btn btn-outline-primary btn-lg w-100" data-bs-dismiss="modal">ยกเลิก</button>
                                      </form>
                                  </div>
                              </div>
                          </div>
                      </div>

                      {/* Edit Modal */}
                      <div className="modal fade" id="editSsh" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">แก้ไข SSH Key</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="ssh-name-edit" placeholder="Name" value="Name SSH Key" />
                                            <label htmlFor="ssh-name-edit">Name</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <textarea className="form-control" id="ssh-public-key-edit" placeholder="Public Key" style={{ height: '130px' }} value="ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCb6Z/VNHzJZ4dbN/NmMYAkE2k8U8viy/ฟ+oauzAyfh1HGg1w/HkYD+2720AOPwdeuVamET1RnlSGyCtguPR4g3uxQt90N5IlqVGLhe+z"></textarea>
                                            <label htmlFor="ssh-public-key-edit">Public Key</label>
                                        </div>
                                        <button type="button" className="btn btn-primary btn-lg w-100 mb-3">แก้ไข SSH Key</button>
                                        <button type="button" className="btn btn-outline-primary btn-lg w-100" data-bs-dismiss="modal">ยกเลิก</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Account;