import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import AuthService from "../services/auth"
import UserService from "../services/user"
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
import { faUserShield, faUserCheck, faKey, faIdCard } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import FormData from "form-data";

export default function Account() {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [verifyNewPassword, setVerifyNewPassword] = useState("")
  const [currentUser, setCurrentUser] = useState(undefined)
  const [file, setFile] = useState(null)
  const [checked, setChecked] = useState(false)
  const [nameSshKey, setNameSshKey] = useState("")
  const [publicSshKey, setPublicSshKey] = useState("")
  const [editNameSshKey, setEditNameSshKey] = useState("Name SSH Key")
  const [editPublicSshKey, setEditPublicSshKey] = useState("ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCb6Z/VNHzJZ4dbN/NmMYAkE2k8U8viy/ฟ+oauzAyfh1HGg1w/HkYD+2720AOPwdeuVamET1RnlSGyCtguPR4g3uxQt90N5IlqVGLhe+z")

  let navigate = useNavigate()

  let email, phone;

  useEffect(() => {
    let user = AuthService.getCurrentUser()

    if (user) {
      setCurrentUser(user)
    } else {
      navigate('/')
    }
  }, [navigate])

  const checkPassword = (password) => {
    var check = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/)
    if (!check.test(password)) {
      return false
    } else {
      return true
    }
  }

  const handleChangePassword = e => {
    e.preventDefault();
    if (checkPassword(newPassword) === true) {
      AuthService.changePassword(newPassword, verifyNewPassword).then((res) => {
        if (res.data.code === 0) {
          Swal.fire({
            icon: 'success',
            title: res.data.message,
          })
          setOldPassword("")
          setNewPassword("")
          setVerifyNewPassword("")
        } else {
          Swal.fire({
            icon: 'error',
            title: res.data.message,
          })
          setOldPassword("")
          setNewPassword("")
          setVerifyNewPassword("")
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

  const handleChecked = () => setChecked(!checked)

  const onChangeFile = e => {
    setFile(e.target.files[0])
  }

  const handleConfirmVerify = async (e) => {
    e.preventDefault()


    // if (checked === true) {
    //   if (file) {
    //     const data = new FormData()
    //     data.append("file", file)
    //     data.append("fileName", fileName)
    //     console.log("data:", data)
    //     UserService.verify(data).then((res) => {
    //       console.log(res);
    //       // if (res.data.code === 0) {
    //       //   alert("success")
    //       //   console.log(res);
    //       // } else {
    //       //   alert("fail")
    //       // }
    //     })

        

    //     //alert(fileName)
    //   } else {
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'กรุณาเพิ่มไฟล์'
    //     })
    //   }
    // } else {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'โปรดคลิกยอมรับ เพื่อดำเนินการต่อไป'
    //   })
    // }
  }

  if (currentUser) {
    email = currentUser.profile.email;
    phone = currentUser.profile.phone;
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
                      <p className="col col-xl-7 mb-2">{email}</p>
                    </div>
                    <div className="row">
                      <p className="col-5 text-end text-secondary mb-2">รหัสผ่าน</p>
                      <p className="col col-xl-7 mb-2">{"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"}</p>
                    </div>
                    <div className="row">
                      <p className="col-5 text-end text-secondary mb-2">เบอร์โทรศัพท์</p>
                      <p className="col col-xl-7 mb-2">{phone}</p>
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
                            <form onSubmit={handleChangePassword}>
                              <div className="form-floating mb-3">
                                <input type="password" className="form-control" id="old-password" placeholder="รหัสผ่านเดิม" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
                                <label htmlFor="old-password">รหัสผ่านเดิม</label>
                              </div>
                              <div className="form-floating mb-3">
                                <input type="password" className="form-control" id="new-password" placeholder="รหัสผ่านใหม่" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                                <label htmlFor="new-password">รหัสผ่านใหม่</label>
                              </div>
                              <div className="form-floating mb-3">
                                <input type="password" className="form-control" id="verify-new-password" placeholder="ยืนยันรหัสผ่านใหม่" value={verifyNewPassword} onChange={e => setVerifyNewPassword(e.target.value)} />
                                <label htmlFor="verify-new-password">ยืนยันรหัสผ่านใหม่</label>
                              </div>
                              <button type="submit" className="btn btn-primary btn-lg w-100 mb-3">เปลี่ยนรหัสผ่าน</button>
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
                      <form onSubmit={handleConfirmVerify}>
                        <div className="text-center mt-2">
                          เอกสารยืนยันตัวตนของคุณ เช่น บัตรประจำตัวประชาชน, ใบขับขี่ หรือ พาสปอร์ต
                        </div>
                        <div className="row mt-4 ms-5 me-5">
                          <div className="col-md">
                            <input type="file" id="file" name="file" className="form-control" onChange={onChangeFile} />
                          </div>
                        </div>
                        <div className="row mt-5">
                          <div className="text-center">* เมื่อยืนยันตัวตนสำเร็จ คุณจะสามารถสร้างได้สูงสุด 3 เซิร์ฟเวอร์ *</div>
                          <div className="col-md mt-4">
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" id="accept" checked={checked} onChange={handleChecked}/>
                              <label className="form-check-label" htmlFor="accept">ฉันยอมรับว่าเอกสารถูกต้อง และตกลงให้ความยินยอมรวมถึงอนุญาตตามเงื่อนไขที่กำหนดทั้งหมด</label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md">
                            <button type="submit" className="btn btn-primary btn-lg w-100 mt-3">ยืนยัน</button>
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
                                            <input type="text" className="form-control" id="ssh-name" placeholder="Name" value={nameSshKey} onChange={e => setNameSshKey(e.target.value)}/>
                                            <label htmlFor="ssh-name">Name</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <textarea className="form-control" id="ssh-public-key" placeholder="Public Key" value={publicSshKey} onChange={e => setPublicSshKey(e.target.value)}></textarea>
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
                                          <input type="text" className="form-control" id="ssh-name-edit" placeholder="Name" value={editNameSshKey} onChange={e => setEditNameSshKey(e.target.value)}/>
                                          <label htmlFor="ssh-name-edit">Name</label>
                                      </div>
                                      <div className="form-floating mb-3">
                                          <textarea className="form-control" id="ssh-public-key-edit" placeholder="Public Key" style={{ height: '130px' }} value={editPublicSshKey} onChange={e => setEditPublicSshKey(e.target.value)}></textarea>
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