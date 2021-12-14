import React, { Component } from "react";
import Sidebar from "./Sidebar";

class Topup extends Component {
  render() {
    return (
      <div className="wrapper">
        <Sidebar />
        <div id="content">
          <div className="row justify-content-center">
              <div className="col-xl-7">
                  <div className="row">
                      <div className="col-12">
                          <h3 className="mb-4">เติมเงิน</h3>
                      </div>
                      <div className="col-md-5">
                          <div className="box-white">
                              <p>เลือกช่องทางการชำระเงิน</p>
                              <ul className="nav nav-pills nav-fill nav-payment" id="pills-tab" role="tablist">
                                  <li className="nav-item">
                                      <button className="nav-link active" data-bs-toggle="pill" data-bs-target="#pills-truewallet" type="button" role="tab" aria-controls="pills-truewallet" aria-selected="true">
                                          <span className="material-icons-outlined">account_balance_wallet</span>
                                          <span>ทรูมันนี่วอลเล็ท</span>
                                      </button>
                                  </li>
                                  <li className="nav-item">
                                      <button className="nav-link" data-bs-toggle="pill" data-bs-target="#pills-promptpay" type="button" role="tab" aria-controls="pills-promptpay" aria-selected="false">
                                          <span className="material-icons-outlined">qr_code_scanner</span>
                                          <span>พร้อมเพย์ (QR Code)</span>
                                      </button>
                                  </li>
                                  <li className="nav-item">
                                      <button className="nav-link" data-bs-toggle="pill" data-bs-target="#pills-internet-banking" type="button" role="tab" aria-controls="pills-internet-banking" aria-selected="false">
                                          <span className="material-icons-outlined">account_balance</span>
                                          <span>อินเทอร์เน็ตแบงก์กิ้ง</span>
                                      </button>
                                  </li>
                                  <li className="nav-item">
                                      <button className="nav-link" data-bs-toggle="pill" data-bs-target="#pills-credit-card" type="button" role="tab" aria-controls="pills-credit-card" aria-selected="false">
                                          <span className="material-icons-outlined">credit_card</span>
                                          <span>บัตรเครดิต</span>
                                      </button>
                                  </li>
                                  <li className="nav-item mb-0">
                                      <button className="nav-link" data-bs-toggle="pill" data-bs-target="#pills-coupon" type="button" role="tab" aria-controls="pills-coupon" aria-selected="false">
                                          <span className="material-icons-outlined">card_giftcard</span>
                                          <span>คูปองส่วนลด</span>
                                      </button>
                                  </li>
                              </ul>
                          </div>
                      </div>
                      <div className="col-md-7">
                          <div className="tab-content box-white" id="pills-tabContent">
                              <div className="tab-pane fade show active" id="pills-truewallet" role="tabpanel">
                                  <form action="#">
                                      <p>กรอกรายละเอียดการเติมเงินให้ครบถ้วน</p>
                                      <div className="form-floating mb-3">
                                          <input type="text" className="form-control" id="wallet-phone-number" placeholder="เบอร์โทรศัพท์"/>
                                          <label htmlFor="wallet-phone-number">เบอร์โทรศัพท์</label>
                                      </div>
                                      <div className="form-floating mb-3">
                                          <input type="number" className="form-control" id="wallet-amount" placeholder="จำนวนเงิน (บาท)"/>
                                          <label htmlFor="wallet-amount">จำนวนเงิน (บาท)</label>
                                      </div>
                                      <button type="submit" className="btn btn-primary btn-lg w-100">เติมเงิน</button>
                                  </form>
                              </div>
                              <div className="tab-pane fade" id="pills-promptpay" role="tabpanel">
                                  <form action="#">
                                      <p>กรอกรายละเอียดการเติมเงินให้ครบถ้วน</p>
                                      <div className="form-floating mb-3">
                                          <input type="number" className="form-control" id="promptpay-amount" placeholder="จำนวนเงิน (บาท)"/>
                                          <label htmlFor="promptpay-amount">จำนวนเงิน (บาท)</label>
                                      </div>
                                      <button type="submit" className="btn btn-primary btn-lg w-100">เติมเงิน</button>
                                  </form>
                              </div>
                              <div className="tab-pane fade" id="pills-internet-banking" role="tabpanel">
                                  <form action="#">
                                      <p>กรอกรายละเอียดการเติมเงินให้ครบถ้วน</p>
                                      <div className="form-floating mb-3">
                                          <select className="form-select" id="bank-selector" aria-label="Floating label select example">
                                              <option value="internet_banking_scb">ธนาคารไทยพาณิชย์ (SCB)</option>
                                              <option value="internet_banking_ktb">ธนาคารกรุงไทย (KTB)</option>
                                              <option value="internet_banking_bbl">ธนาคารกรุงเทพ (BBL)</option>
                                              <option value="internet_banking_bay">ธนาคารกรุงศรีอยุธยา (BAY)</option>
                                          </select>
                                          <label htmlFor="bank-selector">ธนาคาร</label>
                                      </div>
                                      <div className="form-floating mb-3">
                                          <input type="number" className="form-control" id="internet-banking-amount" placeholder="จำนวนเงิน (บาท)"/>
                                          <label htmlFor="internet-banking-amount">จำนวนเงิน (บาท)</label>
                                      </div>
                                      <button type="submit" className="btn btn-primary btn-lg w-100">เติมเงิน</button>
                                  </form>
                              </div>
                              <div className="tab-pane fade" id="pills-credit-card" role="tabpanel">
                                  <form action="#">
                                      <p>กรอกรายละเอียดการเติมเงินให้ครบถ้วน</p>
                                      <div className="form-floating mb-3">
                                          <input type="text" className="form-control" id="credit-card-id" placeholder="หมายเลขบัตร"/>
                                          <label htmlFor="credit-card-id">หมายเลขบัตร</label>
                                      </div>
                                      <div className="form-floating mb-3">
                                          <input type="text" className="form-control" id="credit-card-name" placeholder="ชื่อบนบัตร"/>
                                          <label htmlFor="credit-card">ชื่อบนบัตร</label>
                                      </div>
                                      <div className="row">
                                          <div className="col-6">
                                              <div className="form-floating mb-3">
                                                  <input type="text" className="form-control" id="credit-card-expire" placeholder="วันหมดอายุบัตร"/>
                                                  <label htmlFor="credit-card-expire">วันหมดอายุบัตร</label>
                                              </div>
                                          </div>
                                          <div className="col-6">
                                              <div className="form-floating mb-3">
                                                  <input type="password" className="form-control" id="credit-card-cvv" placeholder="CVV"/>
                                                  <label htmlFor="credit-card-cvv">CVV</label>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="form-floating mb-3">
                                          <input type="number" className="form-control" id="credit-card-amount" placeholder="จำนวนเงิน (บาท)" />
                                          <label htmlFor="credit-card-amount">จำนวนเงิน (บาท)</label>
                                      </div>
                                      <button type="submit" className="btn btn-primary btn-lg w-100">เติมเงิน</button>
                                  </form>
                              </div>
                              <div className="tab-pane fade" id="pills-coupon" role="tabpanel">
                                  <form action="#">
                                      <p>กรอกคูปองส่วนลดที่ได้จากกิจกรรม</p>
                                      <div className="form-floating mb-3">
                                          <input type="text" className="form-control" id="coupon-code" placeholder="คูปองส่วนลด"/>
                                          <label htmlFor="coupon-code">คูปองส่วนลด</label>
                                      </div>
                                      <button type="submit" className="btn btn-primary btn-lg w-100">ใช้งาน</button>
                                  </form>
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

export default Topup;