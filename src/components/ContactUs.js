import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import TopMenu from "./TopMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import Line from "../assets/images/icons/line-brands.svg"
import Swal from "sweetalert2";
import AuthService from "../services/auth"
import UserService from "../services/user"
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const [subject, setSubject] = useState("")
  const [detail, setDetail] = useState("")
  const [currentUser, setCurrentUser] = useState(undefined)

  let navigate = useNavigate()

  useEffect(() => {
    let user = AuthService.getCurrentUser()

    if (user) {
      setCurrentUser(user)
    } else {
      navigate('/')
    }
  }, [navigate])

  const clearForm = () => {
    setSubject("")
    setDetail("")
  }

  const handleSubmitProblem = e => {
    e.preventDefault();

    if (subject !== "" && detail !== "") {
      let accountId = currentUser.profile.accountId
      UserService.reportProblem(accountId, subject, detail).then((res) => {
        if(res.data.code === 0) {
          clearForm()
          Swal.fire({
            icon: 'success',
            title: res.data.message
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: res.data.message
          })
        }
      })
    } else {
      Swal.fire({
        icon: "error",
        title: "Please fill out the information completely."
      })
    }
  }

  return (
    <div className="wrapper">
      <Sidebar />
      <div id="content-row">
        <TopMenu />
        <div id="content">
          <h3 className="mb-4">Contact Us</h3>
          <h5 className="mb-4">EazyIDC Contact Center</h5>
          <div className="row eazy-row">
            <div className="col-lg-auto flex-grow-1">
              <div className="box-white">
                <div>
                  <h5><FontAwesomeIcon icon={faEnvelope}/> Email</h5>
                </div>
                <div>
                  support@eazyidc.com
                </div>
              </div>
            </div>
            <div className="col-lg-auto flex-grow-1">
              <div className="box-white">
                <div>
                  <h5><img src={Line} alt="Line"/> Line</h5>
                </div>
                <div>
                  @eazyidc
                </div>
              </div>
            </div>
            <div className="col-lg-auto flex-grow-1">
              <div className="box-white">
                <div>
                  <h5><FontAwesomeIcon icon={faPhoneAlt} /> Telephone</h5>
                </div>
                <div>
                  02-222-2222
                </div>
              </div>
            </div>
          </div>

          {/* report problem form */}
          <div>
            <form onSubmit={handleSubmitProblem}>
              <div className="box-white">
                <div className="mb-3">
                  <h3>Report Form</h3>
                </div>
                <div className="mb-3">
                  <label htmlFor="subject">Subject</label>
                  <input type="text" className="form-control mt-1" id="subject" value={subject} onChange={e => setSubject(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="detail">Detail</label>
                  <textarea className="form-control mt-1" rows="5" id="detail" value={detail} onChange={e => setDetail(e.target.value)}></textarea>
                </div>
                <div>
                  <button type="submit" className="btn btn-eazy">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs