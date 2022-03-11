import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import AuthService from "../services/auth"
import UserService from "../services/user"
import Swal from "sweetalert2";

export default function CreateServer() {
    const [os, setOs] = useState("Window Server")
    const [versionOs, setVersionOs] = useState("2012 R2")
    const [ssdType, setSsdType] = useState("NVME")
    const [packageList, setPackageList] = useState([])
    const [packages, setPackages] = useState(0)
    const [hostName, setHostname] = useState("")
    const [userName, setUsername] = useState("Administrator")
    const [password, setPassword] = useState("")

    let navigate = useNavigate()

    useEffect(() => {
        let isLogin = AuthService.getStatusLogin()

        if (!isLogin) {
            navigate('/')
        } 

        getPackage()
        setHostname(randomText(6))
    }, [navigate])

    const onOsChange = e => {
        setOs(e.target.value)
    }

    const onVersionChange = e => {
        setVersionOs(e.target.value)
    }

    const onSsdTypeChange = e => {
        setSsdType(e.target.value)
        console.log(e.target.value)
        getPackage(e.target.value)
    }

    const onPackageChange = e => {
        setPackages(e.target.value)
    }

    const getPackage = (ssdType) => {
        if (ssdType === undefined) {
            UserService.getPackage().then((res) => {
                if (res.data.code === 0) {
                    setPackageList(res.data.result.package)
                }
            })
        } else {
            UserService.getPackageBySsdType(ssdType).then((res) => {
                if (res.data.code === 0) {
                    setPackageList(res.data.result.package)
                }
            })
        }
    }

    const randomText = (length) => {
        var result = 'eazyidc-';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        var charactersLength = characters.length
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        return result
    }

    const handleCreateServer = e => {
        e.preventDefault();
        if (packages !== "" && password !== "") {
            UserService.createServer(os, versionOs, ssdType, packages, hostName, userName, password).then((res) => {
                if (res.data.code === 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'สร้างเซิร์ฟเวอร์สำเร็จ'
                    })
                    navigate('/index')
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'สร้างเซิร์ฟเวอร์ไม่สำเร็จ'
                    })
                }
            })
            console.log("os:", os, "versionOs:", versionOs, "ssdType:", ssdType, "packages:", packages, "hostName:", hostName, "userName:", userName, "password:", password)
        } else if (packages === "" && password !== "") {
            Swal.fire({
                icon: "error",
                title: "กรุณาเลือกแพ็คเกจ"
            })
        } else if (packages !== "" && password === "") {
            Swal.fire({
                icon: "error",
                title: "กรุณาระบุ Password"
            })
        } else {
            Swal.fire({
                icon: "error",
                html: "<p class='fs-3'>กรุณาเลือกแพ็คเกจและระบุ Password</p>"
            })
        }
    }

    return (
      <div className="wrapper">
        <Sidebar />
        <div id="content">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h3 className="mb-0">สร้างเซิร์ฟเวอร์</h3>
            <Link to={"/index"} className="btn btn-outline-primary">ย้อนกลับ</Link>
          </div>

          <form onSubmit={handleCreateServer}>
            <div className="box-white">
              <p>เลือกระบบปฏิบัติการ (OS)</p>
              <ul className="nav nav-pills nav-select-server row mb-4" id="pills-tab" role="tablist">
                <li className="nav-item col-md-4 mb-3 mb-md-0" role="presentation">
                  <input type="radio" className="btn-check" name="options-os" id="options-windows" autoComplete="off" data-bs-toggle="pill" data-bs-target="#pills-windows" value="Window Server" onChange={onOsChange} defaultChecked/>
                  <label className="btn btn-outline-primary" htmlFor="options-windows">
                      <i className="fab fa-windows"></i>
                      <div>Windows Server</div>
                  </label>
                </li>
                <li className="nav-item col-md-4 mb-3 mb-md-0" role="presentation">
                  <input type="radio" className="btn-check" name="options-os" id="options-ubuntu" autoComplete="off" data-bs-toggle="pill" data-bs-target="#pills-ubuntu" value="Ubuntu" onChange={onOsChange}/>
                  <label className="btn btn-outline-primary" htmlFor="options-ubuntu">
                      <i className="fab fa-ubuntu"></i>
                      <div>Ubuntu</div>
                  </label>
                </li>
                <li className="nav-item col-md-4 mb-3 mb-md-0" role="presentation">
                  <input type="radio" className="btn-check" name="options-os" id="options-centos" autoComplete="off" data-bs-toggle="pill" data-bs-target="#pills-centos" value="Centos" onChange={onOsChange}/>
                  <label className="btn btn-outline-primary" htmlFor="options-centos">
                      <i className="fab fa-centos"></i>
                      <div>CentOS</div>
                  </label>
                </li>
              </ul>

              <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-windows" role="tabpanel">
                    <p>เลือกเวอร์ชั่น <span className="badge bg-secondary">*No Windows License included.</span></p>
                    <ul className="nav nav-pills nav-select-server row" id="pills-tab" role="tablist">
                        <li className="nav-item col-md-4 mb-3 mb-md-0" role="presentation">
                            <input type="radio" className="btn-check" name="options-version" id="options-2012-r2" autoComplete="off" data-bs-toggle="pill" data-bs-target="#pills-home" value="2012 R2" onChange={onVersionChange} defaultChecked/>
                            <label className="btn btn-outline-primary w-100" htmlFor="options-2012-r2">
                                <div>2012 R2</div>
                            </label>
                        </li>
                        <li className="nav-item col-md-4 mb-3 mb-md-0" role="presentation">
                            <input type="radio" className="btn-check" name="options-version" id="options-2016" autoComplete="off" data-bs-toggle="pill" data-bs-target="#pills-profile" value="2016" onChange={onVersionChange}/>
                            <label className="btn btn-outline-primary w-100" htmlFor="options-2016">
                                <div>2016</div>
                            </label>
                        </li>
                    </ul>
                </div>

                <div className="tab-pane fade" id="pills-ubuntu" role="tabpanel">
                    <p>เลือกเวอร์ชั่น</p>
                    <ul className="nav nav-pills nav-select-server row" id="pills-tab" role="tablist">
                        <li className="nav-item col-md-4 mb-3 mb-md-0" role="presentation">
                            <input type="radio" className="btn-check" name="options-version" id="options-2004-lts" autoComplete="off" data-bs-toggle="pill" data-bs-target="#pills-home" value="20.04 LTS" onChange={onVersionChange}/>
                            <label className="btn btn-outline-primary w-100" htmlFor="options-2004-lts">
                                <div>20.04 LTS</div>
                            </label>
                        </li>
                        <li className="nav-item col-md-4 mb-3 mb-md-0" role="presentation">
                            <input type="radio" className="btn-check" name="options-version" id="options-1804-lts" autoComplete="off" data-bs-toggle="pill" data-bs-target="#pills-profile" value="18.04 LTS" onChange={onVersionChange}/>
                            <label className="btn btn-outline-primary w-100" htmlFor="options-2016">
                                <div>18.04 LTS</div>
                            </label>
                        </li>
                    </ul>
                </div>

                <div className="tab-pane fade" id="pills-centos" role="tabpanel">
                    <p>เลือกเวอร์ชั่น</p>
                    <ul className="nav nav-pills nav-select-server row" id="pills-tab" role="tablist">
                        <li className="nav-item col-md-4 mb-3 mb-md-0" role="presentation">
                            <input type="radio" className="btn-check" name="options-version" id="options-8-stream-x64" autoComplete="off" data-bs-toggle="pill" data-bs-target="#pills-home" value="8 Stream x64" onChange={onVersionChange}/>
                            <label className="btn btn-outline-primary w-100" htmlFor="options-8-stream-x64">
                                <div>8 Stream x64</div>
                            </label>
                        </li>
                        <li className="nav-item col-md-4 mb-3 mb-md-0" role="presentation">
                            <input type="radio" className="btn-check" name="options-version" id="options-8.3-x64" autoComplete="off" data-bs-toggle="pill" data-bs-target="#pills-profile" value="8.3 x64" onChange={onVersionChange}/>
                            <label className="btn btn-outline-primary w-100" htmlFor="options-8.3-x64">
                                <div>8.3 x64</div>
                            </label>
                        </li>
                        <li className="nav-item col-md-4 mb-3 mb-md-0" role="presentation">
                            <input type="radio" className="btn-check" name="options-version" id="options-7-x64" autoComplete="off" data-bs-toggle="pill" data-bs-target="#pills-profile" value="7 x64" onChange={onVersionChange}/>
                            <label className="btn btn-outline-primary w-100" htmlFor="options-7-x64">
                                <div>7 x64</div>
                            </label>
                        </li>
                    </ul>
                </div>
              </div>
            </div>

            <div className="box-white">
              <p>เลือกประเภท SSD</p>
              <ul className="nav nav-pills nav-select-server row" id="pills-tab">
                <li className="nav-item col-md-4 mb-3 mb-md-0">
                    <input type="radio" className="btn-check" name="options-ssd" id="options-ssd-nvme" autoComplete="off" value="NVME" onChange={onSsdTypeChange} checked={ssdType === 'NVME'}/>
                    <label className="btn btn-outline-primary w-100" htmlFor="options-ssd-nvme">
                        <div>SSD NVME</div>
                    </label>
                </li>
                <li className="nav-item col-md-4 mb-3 mb-md-0">
                    <input type="radio" className="btn-check" name="options-ssd" id="options-ssd" autoComplete="off" value="Normal" onChange={onSsdTypeChange} checked={ssdType === 'Normal'}/>
                    <label className="btn btn-outline-primary w-100" htmlFor="options-ssd">
                        <div>SSD ปกติ</div>
                    </label>
                </li>
              </ul>
            </div>

            <div className="box-white">
              <p>เลือกแพ็คเกจ</p>
              <div className="row">
                {packageList && packageList.map((packages, index) => (
                <div className="col-6 col-md-4 col-xl-2" key={index}>
                    <div className="package-card">
                        <input type="radio" className="btn-check" name="options-plan" id={`options-plan-${index+1}`} value={packages.packageId} onChange={onPackageChange} autoComplete="off" />
                        <label className="btn btn-outline-primary w-100" htmlFor={`options-plan-${index+1}`}>
                            <h6>Plan {index+1}</h6>
                            <div className="text-list">
                                <span>CPU</span>
                                <span><b>{packages.cpu_unit}</b> {packages.cpu_unit < 2 ? "vCPU" : "vCPUs"} </span>
                            </div>
                            <div className="text-list">
                                <span>Memory</span>
                                <span><b>{packages.memory_unit}</b> GB</span>
                            </div>
                            <div className="text-list">
                                <span>SSD</span>
                                <span><b>{packages.ssd_unit}</b> GB</span>
                            </div>
                            <div className="text-list">
                                <span>Transfer</span>
                                <span><b>{packages.transfer_unit}</b> GB</span>
                            </div>
                            <hr/>
                            <div className="text-list">
                                <span>เดือน</span>
                                <span><b>{packages.price}</b> <small>฿</small></span>
                            </div>
                        </label>
                    </div>
                </div>
                ))}
                {/* <div className="col-6 col-md-4 col-xl-2">
                    <div className="package-card">
                        <input type="radio" className="btn-check" name="options-plan" id="options-plan-1" autoComplete="off" />
                        <label className="btn btn-outline-primary w-100" htmlFor="options-plan-1">
                            <h6>Plan 1</h6>
                            <div className="text-list">
                                <span>CPU</span>
                                <span><b>1</b> vCPU</span>
                            </div>
                            <div className="text-list">
                                <span>Memory</span>
                                <span><b>1</b> GB</span>
                            </div>
                            <div className="text-list">
                                <span>SSD</span>
                                <span><b>10</b> GB</span>
                            </div>
                            <div className="text-list">
                                <span>Transfer</span>
                                <span><b>1</b> GB</span>
                            </div>
                            <hr/>
                            <div className="text-list">
                                <span>เดือน</span>
                                <span><b>265</b> <small>฿</small></span>
                            </div>
                        </label>
                    </div>
                </div>
                <div className="col-6 col-md-4 col-xl-2">
                    <div className="package-card">
                        <input type="radio" className="btn-check" name="options-plan" id="options-plan-2" autoComplete="off"/>
                        <label className="btn btn-outline-primary w-100" htmlFor="options-plan-2">
                            <h6>Plan 2</h6>
                            <div className="text-list">
                                <span>CPU</span>
                                <span><b>2</b> vCPUs</span>
                            </div>
                            <div className="text-list">
                                <span>Memory</span>
                                <span><b>1</b> GB</span>
                            </div>
                            <div className="text-list">
                                <span>SSD</span>
                                <span><b>10</b> GB</span>
                            </div>
                            <div className="text-list">
                                <span>Transfer</span>
                                <span><b>1</b> GB</span>
                            </div>
                            <hr/>
                            <div className="text-list">
                                <span>เดือน</span>
                                <span><b>265</b> <small>฿</small></span>
                            </div>
                        </label>
                    </div>
                </div>
                <div className="col-6 col-md-4 col-xl-2">
                    <div className="package-card">
                        <input type="radio" className="btn-check" name="options-plan" id="options-plan-3" autoComplete="off" />
                        <label className="btn btn-outline-primary w-100" htmlFor="options-plan-3">
                            <h6>Plan 3</h6>
                            <div className="text-list">
                                <span>CPU</span>
                                <span><b>2</b> vCPUs</span>
                            </div>
                            <div className="text-list">
                                <span>Memory</span>
                                <span><b>1</b> GB</span>
                            </div>
                            <div className="text-list">
                                <span>SSD</span>
                                <span><b>10</b> GB</span>
                            </div>
                            <div className="text-list">
                                <span>Transfer</span>
                                <span><b>1</b> GB</span>
                            </div>
                            <hr />
                            <div className="text-list">
                                <span>เดือน</span>
                                <span><b>265</b> <small>฿</small></span>
                            </div>
                        </label>
                    </div>
                </div>
                <div className="col-6 col-md-4 col-xl-2">
                    <div className="package-card">
                        <input type="radio" className="btn-check" name="options-plan" id="options-plan-4" autoComplete="off" />
                        <label className="btn btn-outline-primary w-100" htmlFor="options-plan-4">
                            <h6>Plan 4</h6>
                            <div className="text-list">
                                <span>CPU</span>
                                <span><b>2</b> vCPUs</span>
                            </div>
                            <div className="text-list">
                                <span>Memory</span>
                                <span><b>1</b> GB</span>
                            </div>
                            <div className="text-list">
                                <span>SSD</span>
                                <span><b>10</b> GB</span>
                            </div>
                            <div className="text-list">
                                <span>Transfer</span>
                                <span><b>1</b> GB</span>
                            </div>
                            <hr />
                            <div className="text-list">
                                <span>เดือน</span>
                                <span><b>265</b> <small>฿</small></span>
                            </div>
                        </label>
                    </div>
                </div>
                <div className="col-6 col-md-4 col-xl-2">
                    <div className="package-card">
                        <input type="radio" className="btn-check" name="options-plan" id="options-plan-5" autoComplete="off" />
                        <label className="btn btn-outline-primary w-100" htmlFor="options-plan-5">
                            <h6>Plan 5</h6>
                            <div className="text-list">
                                <span>CPU</span>
                                <span><b>2</b> vCPUs</span>
                            </div>
                            <div className="text-list">
                                <span>Memory</span>
                                <span><b>1</b> GB</span>
                            </div>
                            <div className="text-list">
                                <span>SSD</span>
                                <span><b>10</b> GB</span>
                            </div>
                            <div className="text-list">
                                <span>Transfer</span>
                                <span><b>1</b> GB</span>
                            </div>
                            <hr />
                            <div className="text-list">
                                <span>เดือน</span>
                                <span><b>265</b> <small>฿</small></span>
                            </div>
                        </label>
                    </div>
                </div>
                <div className="col-6 col-md-4 col-xl-2">
                    <div className="package-card">
                        <input type="radio" className="btn-check" name="options-plan" id="options-plan-6" autoComplete="off" />
                        <label className="btn btn-outline-primary w-100" htmlFor="options-plan-6">
                            <h6>Plan 6</h6>
                            <div className="text-list">
                                <span>CPU</span>
                                <span><b>2</b> vCPUs</span>
                            </div>
                            <div className="text-list">
                                <span>Memory</span>
                                <span><b>1</b> GB</span>
                            </div>
                            <div className="text-list">
                                <span>SSD</span>
                                <span><b>10</b> GB</span>
                            </div>
                            <div className="text-list">
                                <span>Transfer</span>
                                <span><b>1</b> GB</span>
                            </div>
                            <hr />
                            <div className="text-list">
                                <span>เดือน</span>
                                <span><b>265</b> <small>฿</small></span>
                            </div>
                        </label>
                    </div>
                </div>
                <div className="col-6 col-md-4 col-xl-2">
                    <div className="package-card">
                        <input type="radio" className="btn-check" name="options-plan" id="options-plan-7" autoComplete="off" />
                        <label className="btn btn-outline-primary w-100" htmlFor="options-plan-7">
                            <h6>Plan 7</h6>
                            <div className="text-list">
                                <span>CPU</span>
                                <span><b>2</b> vCPUs</span>
                            </div>
                            <div className="text-list">
                                <span>Memory</span>
                                <span><b>1</b> GB</span>
                            </div>
                            <div className="text-list">
                                <span>SSD</span>
                                <span><b>10</b> GB</span>
                            </div>
                            <div className="text-list">
                                <span>Transfer</span>
                                <span><b>1</b> GB</span>
                            </div>
                            <hr/>
                            <div className="text-list">
                                <span>เดือน</span>
                                <span><b>265</b> <small>฿</small></span>
                            </div>
                        </label>
                    </div>
                </div> */}
                
              </div>
            </div>

            <div className="box-white">
              <p>ตั้งค่าเซิร์ฟเวอร์</p>
              <div className="row flex-column">
                <div className="col-xl-4">
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="hostname" placeholder="Hostname" value={hostName} onChange={e => setHostname(e.target.value)} />
                        <label htmlFor="hostname">Hostname</label>
                    </div>
                </div>
                <div className="col-xl-4">
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="username" placeholder="Username" value={os === "Window Server" ? userName : "root"} onChange={e => setUsername(e.target.value)} disabled/>
                        <label htmlFor="username">Username</label>
                    </div>
                </div>
                <div className="col-xl-4">
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                        <label htmlFor="password">Password</label>
                        <small className="text-danger d-block mt-2">*โปรดจัดเก็บรหัสผ่านของท่านไว้ เนื่องจากระบบไม่สามารถกู้คืนได้</small>
                    </div>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-lg">สร้างเซิร์ฟเวอร์</button>
          </form>
        </div>
      </div>
    )
};