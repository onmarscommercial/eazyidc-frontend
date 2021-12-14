import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png"

class TermOfService extends Component {
  render() {
    return (
      <div className="form-term-of-service">
        <div className="form-term-of-service-box">
          <Link to={"/"} className="sidebar-header text-center">
            <img src={Logo} alt="eazyidc logo"/>
          </Link>
          <div className="form-term-of-service-box-white ms-4 me-4 pt-2 pb-2">
            <h4 className="text-center mt-3">TERMS OF SERVICE</h4>
            <h5 className="text-center">(เงื่อนไขการให้บริการ)</h5>
            <div className="ms-4 me-4 mt-4">
              <div className="firstp">
                ข้อตกลงนี้เป็นข้อตกลงระหว่าง EAZYIDC และคุณ (“ลูกค้า” หรือ “ผู้ใช้บริการ”) โดยผู้ใช้บริการรับทราบและยินยอมปฏิบัติตามนโยบาย 
                และข้อตกลงในการให้บริการของ EAZYIDC ซึ่งบริหารงานโดย บริษัท ออน มาร์ส คอมเมอร์เชียล จำกัด ผู้ใช้บริการจะต้องรับทราบและยินยอมปฏิบัติตาม กฎระเบียบที่ออกโดย EAZYIDC ดังต่อไปนี้
              </div>
              <div className="mt-2">
                <ol>
                  <li>
                    ผู้ใช้บริการ กรณีสมัครครั้งแรก จะต้องส่งเอกสารเพื่อยืนยันตัวตนเพื่อป้องกันผู้ไม่หวังดีนำชื่อของบุคคลอื่น มาเปิดบริการที่ <br/>
                    ผิดกฏหมาย โดยเอกสารที่ใช้จะมี ดังนี้ 
                    <u>กรณีใช้บริการในนามบุคคล</u> <br/>
                      <ul style={{ listStyleType: 'initial'}}>
                        <li>
                          สำเนาประจำตัวประชาชนที่มีรูปถ่ายซึ่งออกโดยทางราชการ <br/>
                        </li>
                        <li>
                          สำเนาใบอนุญาตขับขี่ที่ออกโดยทางราชการ <br/>
                        </li>
                      </ul>
                    <u>กรณีเป็นนิติบุคคล</u> <br/>
                    <ul style={{ listStyleType: 'initial'}}>
                      <li>
                        หนังสือรับรองบริษัท
                      </li>
                    </ul>
                    ทั้งนี้หากมีการยกเลิกบริการทางผู้ให้บริการจะทำลายเอกสารทันที
                  </li>
                  <li>
                    ผู้ใช้บริการ จะต้องแจ้งข้อมูลกับผู้ให้บริการ ซึ่งจะต้องเป็นข้อมูลที่เป็นจริงและถูกต้อง หากผู้ใช้บริการแจ้งข้อมูลที่ไม่ถูกต้อง <br />
                    หรือข้อมูลที่เป็นเท็จ ผู้ให้บริการจะไม่จัดทำตามคำขอ
                  </li>
                  <li>
                    ผู้ให้บริการ จะดำเนินการเปิดการใช้งานบริการให้ทันที หรือภายใน 24 ชั่วโมง ในวันที่ทำการสั่งซื้อบริการเข้ามา โดยจะดำเนินการ <br /> 
                    หลังจากที่ได้รับหลักฐานการชำระค่าบริการที่ระบุข้อมูลคำสั่งซื้ออย่างครบถ้วน หากชำระค่าบริการมาแล้วแต่ส่งรายละเอียดไม่ครบถ้วน <br /> 
                    อาทิ เช่น ไม่ได้ระบุหมายเลขการสั่งซื้อหรือชื่อโดเมนหรือเบอร์ติดต่อกลับ หรือ ขาดการติดต่อภายในระยะเวลา 1 เดือน <br /> 
                    ผู้ให้บริการจำเป็นต้องดำเนินการยกเลิกการสั่งซื้อนั้น ๆ
                  </li>
                  <li>
                    ผู้ให้บริการ ไม่มีนโยบายการคืนเงินค่าบริการให้ในกรณีใด ๆ ทั้งสิ้น ยกเว้นการละเมิดเงื่อนไขโดยผู้ให้บริการ
                  </li>
                  <li>
                    ผู้ให้บริการ ไม่มีนโยบายเปิดให้บริการกับเว็บไซต์ในลักษณะ ดังต่อไปนี้ <br/>
                    <u>ลักษณะการใช้งานที่ไม่เปิดให้บริการ</u>
                    <ul style={{ listStyleType: 'initial'}}>
                      <li>เว็บไซต์/เซิร์ฟเวอร์ ซึ่งนำมาถึงความเสื่อมเสียให้แก่ “ผู้ให้บริการ”</li>
                      <li>เว็บไซต์/เซิร์ฟเวอร์ ที่มีความผิด ตามพระราชบัญญัติ ว่าด้วยการกระทำความผิดเกี่ยวกับคอมพิวเตอร์ พ.ศ. 2550</li>
                      <li>เว็บไซต์/เซิร์ฟเวอร์ ที่ผิดกฎหมาย ที่เกี่ยวข้องกับการโจมตีระบบเซิร์ฟเวอร์ หรือวิธีอื่นๆ ที่มีจุดประสงค์คล้ายกัน</li>
                      <li>เว็บไซต์/เซิร์ฟเวอร์ ที่สร้างความเสื่อมเสียชื่อเสียงให้แก่ผู้อื่น หรือ ทำลายความมั่นคง ต่อสถาบันชาติ ศาสนา และพระมหากษัตริย์</li>
                      <li>เว็บไซต์/เซิร์ฟเวอร์ ที่เกี่ยวข้องกับ สื่อลามก อนาจาร หรืออื่นๆ ที่มีจุดประสงค์คล้ายกัน</li>
                      <li>เว็บไซต์/เซิร์ฟเวอร์ ที่เกี่ยวข้องกับการพนัน ทุกรูปแบบ</li>
                      <li>เว็บไซต์/เซิร์ฟเวอร์ ที่ส่ง E-mail เป็นจำนวนมาก (Spam mail)</li>
                      <li>เว็บไซต์/เซิร์ฟเวอร์ ที่เกี่ยวข้องกับการเจาะระบบ การเผยแพร่ไวรัสคอมพิวเตอร์ทุกชนิด หรือการเผยแพร่ใด ๆ ที่เป็น <br/>สิ่งผิดกฎหมาย ผิดศีลธรรมสร้างความวุ่นวาย และ ความเดือดร้อน ให้แก่ผู้อื่น</li>
                      <li>เว็บไซต์/เซิร์ฟเวอร์ ที่ละเมิดเครื่องหมายการค้า ลิขสิทธิ์ หรือ ทรัพย์สินทางปัญญา ของผู้อื่นหรือคณะบุคคลอื่นในทุกประเทศ <br/>ทั่วโลก</li>
                      <li>เว็บไซต์/เซิร์ฟเวอร์ เกี่ยวข้องกับ ยาเสพติด หรืออื่นๆ ที่มีจุดประสงค์คล้ายกัน</li>
                    </ul>
                    ผู้ให้บริการ ขอสงวนสิทธิ์ที่จะบอกเลิกสัญญา หรือ ปิดเว็บไซต์โดยมิต้องแจ้งล่วงหน้า โดยไม่มีการคืนค่าบริการใด ๆ ทั้งสิ้น <br />
                    หากผู้ใช้บริการ มีการกระทำที่ขัดต่อนโยบายการใช้บริการดังที่กล่าวมาข้างต้น ผู้ให้บริการขอสงวนสิทธิ์ในการเป็นผู้พิจารณาว่า <br /> สิ่งที่ผู้ใช้บริการกระทำนั้นเป็นการผิดกฎระเบียบข้อบังคับหรือไม่
                  </li>
                  <li>
                    ผู้ให้บริการ ไม่รับผิดชอบเกี่ยวกับประสิทธิภาพ ความล่าช้า รวมถึงการสูญเสียข้อมูลที่อยู่นอกเหนือการความคุมของผู้ให้บริการ
                  </li>
                  <li>
                    ผู้ให้บริการไม่ได้เป็นผู้ให้บริการด้าน Software ดังนั้น ปัญหาในการใช้งานด้านต่างๆ ที่เกี่ยวกับ Software ผู้ให้บริการขอสงวนสิทธิ์ <br />ในการช่วยเหลือเฉพาะปัญหาจากเซิร์ฟเวอร์เท่านั้น
                  </li>
                  <li>
                    ผู้ให้บริการ มีสิทธิ์ในการเข้าตรวจสอบข้อมูลหรือไฟล์ต่างๆ ในเซิร์ฟเวอร์ของผู้ใช้บริการหากเกิดปัญหา โดยไม่ต้องแจ้งให้ทราบล่วงหน้า
                  </li>
                  <li>
                    ไฟล์ใด ๆ ที่ผู้ใช้บริการใช้งานอยู่บน เว็บไซต์/เซิร์ฟเวอร์  เช่น Website Files, E-Mail Files, Database Files เป็นต้น <br />หากมีการติดไวรัสเกิดขึ้น จะถูกลบออกจากระบบโดยอัตโนมัติโดยมิจำเป็นต้องแจ้งให้ทราบ ล่วงหน้า
                  </li>
                  <li>
                    ผู้ให้บริการสงวนสิทธิ์ในการเปลี่ยนแปลงข้อตกลงในการให้บริการนี้ได้ตลอดเวลา โดยไม่ต้องแจ้งให้ผู้ใช้บริการทราบล่วงหน้า
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TermOfService;