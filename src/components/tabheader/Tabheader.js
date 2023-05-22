import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import bro from '../../assets/bro.png'
import './Tabheader.css'
import ScreenThongKe from '../ScreenThongKe/ScreenThongKe';
import ListGroup from 'react-bootstrap/ListGroup';
import Popup from '../Popup/PopupInfo';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import TourContent from '../tourContent/TourContent';
import MapBox from './MapBox';
import ScreenTaiKhoan from '../ScreenTaiKhoan/ScreenTaiKhoan';
import axios from 'axios';
import PopupNote from '../Popup/PopupNote';
import { findNguoiDungByEmail } from '../../util/ApiRouter';
export const Tabheader = (props) => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const email = JSON.parse(localStorage.getItem("email"));
  const [showInfoPopup, setshowInfoPopup] = useState(false)
  const [values, setValues] = useState({ email: "", password: "" })
  const [showTours, setShowTours] = useState(true)
  const [showThemTours, setShowThemTours] = useState(false)
  const [showThongKe, setShowThongKe] = useState(false)
  const [showTaiKhoan, setShowTaiKhoan] = useState(false)
  const [thongTinUser, setThongTinUser] = useState({})
  const [isLogoutPopup, setIsLogoutPopup] = useState(false)

  // click item DASHBOARD
  const handShowActionThemTour = () => {
    setTimeout(() => setIsLoading(true), 10);
    setTimeout(() => setIsLoading(false), 1000);
    setShowTours(false)
    setShowThemTours(true)
    setShowThongKe(false)
    setShowTaiKhoan(false)
  }
  const handShowAllTour = () => {
    setTimeout(() => setIsLoading(true), 10);
    setTimeout(() => setIsLoading(false), 1000);
    setShowTours(true)
    setShowThemTours(false)
    setShowThongKe(false)
    setShowTaiKhoan(false)
  }
  const handShowThongKe = () => {
    setTimeout(() => setIsLoading(true), 10);
    setTimeout(() => setIsLoading(false), 1000);
    setShowThongKe(true)
    setShowThemTours(false)
    setShowTours(false)
    setShowTaiKhoan(false)
  }
  const handleShowTaiKhoan = () => {
    setTimeout(() => setIsLoading(true), 10);
    setTimeout(() => setIsLoading(false), 1000);
    setShowThongKe(false)
    setShowThemTours(false)
    setShowTours(false)
    setShowTaiKhoan(true)
  }
  // handle thong tin user
  const handleThongTinUser = async () => {
    if (email != null) {
      console.log(email)
      const result = await axios.get(findNguoiDungByEmail, {
        params: {
          email: email.userName,
        }
      })
      if (result.data) {
        setThongTinUser(result.data)
        console.log(result.data)
      }
    } else {
      navigate("/")
    }
  }
  //hand Click show Alert 

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    navigate("/home")

    setValidated(true);
  };
  const handleDangXuat = () => {
    localStorage.removeItem("email")
    navigate("/")
  }
  //event get values
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
    handleThongTinUser()
  }, [])
  return (
    <div className='container-home'>
      {
        props.trigger ?
          <div className='left-contain'>
            <div className='left-header-contain'>
              <div className='user-container' >
                <img className='user-avatar' src={thongTinUser.avatar} alt="user avatar" />
                <h1 className='user-name'>{thongTinUser.ten}</h1>
                <div className="user-email">{thongTinUser.email}</div>
                <button type="button" className="btn btn-danger" onClick={() => setIsLogoutPopup(true)}>Đăng xuất</button>
              </div>
              <PopupNote className="xoa_popub" showInfoPopup={isLogoutPopup} trigger={isLogoutPopup} setTrigger={setIsLogoutPopup} >
                <div
                  style={{
                    minHeight: '200px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 22
                  }}>
                  <div style={{ width: "100%", flexDirection: "row", display: "flex", justifyContent: "center" }}>
                    <p style={{ color: 'gray', flex: 0.9 }}> Đăng xuất </p>
                    <Button variant="danger" style={{ fontSize: 16 }} onClick={() => setIsLogoutPopup(false)}>x</Button>
                  </div>
                  <p style={{ color: "red", fontSize: 14 }}>Bạn có muốn đăng xuất không!</p>

                  <div style={{ marginTop: 30, display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Button style={{ marginRight: 20, width: 140 }} variant='outline-secondary' onClick={() => setIsLogoutPopup(false)}>No</Button>
                    <Button style={{ marginRight: 20, width: 140 }} variant='danger' onClick={() => handleDangXuat()}>Yes</Button>
                  </div>
                </div>
              </PopupNote>
              <ListGroup style={{ background: '#27a9e3'}} className='action-menu' defaultActiveKey="#bangdieukhien">
                <ListGroup.Item onClick={() => handShowAllTour()} style={{ background: 'none', fontWeight: 'bold', fontFamily: 'cursive' }} action href="#bangdieukhien">
                  <img className='icon-tab' style={{ width: 30, height: 30, marginRight: 10 }} src='https://firebasestorage.googleapis.com/v0/b/tourapp-d8ea8.appspot.com/o/asset%2Fbangdieukhien-icon.png?alt=media&token=5ea1af23-a7da-47fe-b731-6822fc9b0015' alt="use" />
                  Bảng điều khiển
                </ListGroup.Item>
                <ListGroup.Item onClick={() => handShowActionThemTour()} style={{ background: 'none', fontWeight: 'bold', fontFamily: 'cursive' }} action href="#thongtintour">
                  <img className='icon-tab' style={{ width: 30, height: 30, marginRight: 10 }} src='https://firebasestorage.googleapis.com/v0/b/tourapp-d8ea8.appspot.com/o/asset%2Fquanlytour-icon.png?alt=media&token=e8508cf5-147d-48f7-924e-18eb4916fbe2' alt="use" />
                  Quản lý Tour
                </ListGroup.Item>
                <ListGroup.Item onClick={() => handShowThongKe()} style={{ background: 'none', fontWeight: 'bold', fontFamily: 'cursive', display: 'flex', flexDirection: 'row' }} action href='#thongke'>
                  <img className='icon-tab' style={{ width: 30, height: 30, marginRight: 10 }} src='https://firebasestorage.googleapis.com/v0/b/tourapp-d8ea8.appspot.com/o/asset%2Fthongke-icon.png?alt=media&token=de6d6a5b-f4cb-4993-a2d0-1d0abc9babce' alt="use" />
                  Quản lý thống kê
                </ListGroup.Item>
                <ListGroup.Item onClick={() => handleShowTaiKhoan()} style={{ background: 'none', fontWeight: 'bold', fontFamily: 'cursive' }} action href='#taikhoan'>
                  <img className='icon-tab' style={{ width: 30, height: 30, marginRight: 10 }} src='https://firebasestorage.googleapis.com/v0/b/tourapp-d8ea8.appspot.com/o/asset%2Fquanlytaikhoan-icon.png?alt=media&token=64489909-4477-4f9c-a43f-055e8708c511' alt="use" />
                  Quản lý tài khoản
                </ListGroup.Item>

              </ListGroup>
              {/* Danh sách tour được cập nhật gần đây */}
              <div>
                <p style={{ color: 'white' }}>tours cập nhật gần đây  </p>
                <hr style={{ color: 'white' }}></hr>
                <div>

                </div>
              </div>
              {/* Popup for action đổi mật khẩu */}
              <Popup className="infor_popub" showInfoPopup={showInfoPopup} trigger={showInfoPopup} setTrigger={setshowInfoPopup}>
                <h5>Đổi mật khẩu</h5>
                <Form className='group-control' noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
                  <Form.Group id='form-group' className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='label-login'>Old Password</Form.Label>
                    <Form.Control
                      name='email'
                      value={values.email}
                      onChange={e => handleChange(e)}
                      type="email" placeholder="Enter old password" required />

                  </Form.Group>
                  <Form.Group id='form-group' className="mb-3" controlId="formBasicPassword">
                    <Form.Label className='label-login'>New Password</Form.Label>
                    <Form.Control
                      name='password'
                      value={values.password}
                      onChange={e => handleChange(e)}
                      type="password" placeholder="Password" required />
                    <Form.Control.Feedback type="invalid">
                      Please provide a password
                    </Form.Control.Feedback>

                  </Form.Group>
                  <Form.Group id='form-group' className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                      className='label-login' type="checkbox" label="Check me out" />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Cập nhật
                  </Button>
                </Form>
              </Popup>
            </div>
          </div> : ""
      }
      {/* right content in Bảng điều khiển */}
      {isLoading ? (
        <div className='loading_view'>
          {/* <img className='logo-loading' src={logo} alt='logo' /> */}
          <img className='image-loading' src={bro} alt='img-loading' />
          <div className='logo-loading' >
          </div>
          <div className="loading">
          </div>
          <h2 className='title-loading'>Loading...</h2>
        </div>
      ) : (
        <div className='right-contain' >
          {
            showTours ?
              <TourContent /> : ""
          }
          {
            showThemTours ?
              <MapBox />
              : ""
          }
          {
            showThongKe ?
              <ScreenThongKe />
              : ""
          }
          {
            showTaiKhoan ?
              <ScreenTaiKhoan nguoiDung={thongTinUser} setThongTinUser={setThongTinUser} />
              : ""
          }
        </div>)}
    </div>

  );
};