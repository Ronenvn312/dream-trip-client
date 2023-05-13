import React, { useEffect, useState } from 'react'
import { Tabheader } from '../components/tabheader/Tabheader';
import './Home.css'
import menu from '../assets/menu.png'
import bro from '../assets/bro.png'
import logo from '../assets/logo.png'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home(props) {

  const [disableMenu, setDisableMenu] = useState(true);
  const [showThongBao, setShowThongBao] = useState(false)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  const onClickMenuBar = () => {
    setDisableMenu(!disableMenu);
  }
  // click xem thong bao
  const handShowThongBao = () => {
    setShowThongBao(!showThongBao)
  }


  return (
    <div className='page-home' >
      {isLoading ? (
        <div className='loading_view'>
          <img className='logo-loading' src={logo} alt='logo' />
          <img className='image-loading' src={bro} alt='img-loading'/>
          <div className='logo-loading' >
          </div>
          <div className="loading">
          </div>
          <h2 className='title-loading'>Loading...</h2>
        </div>
      ) : (
        <div>
          <div className='tav-bar'>
            <div className="custom-toolbar" >
              <button variant="info" className='btn-menu' onClick={() => onClickMenuBar()}>
                <img className='img-wel' src={menu} alt='wel' />
              </button>
              <img className='img-logo' src={'https://firebasestorage.googleapis.com/v0/b/tourapp-d8ea8.appspot.com/o/logo.png?alt=media&token=567974a7-6821-409f-8dcd-7be45456e881'} alt='wel' />
              <h3 style={{ paddingTop: 10 }} className='title-page'>Dream Trip</h3>
            </div>
            <div className="right-widget">
              <Button onClick={() => handShowThongBao()} variant="link" className='btn-about' style={{ color: 'white', flex: 0.5, width: '100%', display: 'flex' }}>
                <img style={{ width: 30, height: 30, marginRight: 10 }} src={require('./../assets/icon_thongbao.png')} alt='icon-thongbao'/>
                About
              </Button>
              <Button href='https://github.com/Ronenvn312/KLTN_Tour' variant="link" className='btn-about' style={{ color: 'white', marginTop: -5, flex: 0.5, width: '100%', display: 'flex' }}>
                Git
              </Button>
              <div className='right-widget-info-log'>
                1
              </div>
              {
                showThongBao ?
                  <div className='right-widget-info-content'>
                    <div key={1} className='info-item'>
                      <div style={{
                        height: 50,
                        width: 70,
                        backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/tourapp-d8ea8.appspot.com/o/landmark.jpg?alt=media&token=526132b1-4f03-48c9-a0e1-eb9b74a46579)`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        margin: 5
                      }} >
                      </div>
                      <p>Người dùng tên Đạt đã gửi yêu cầu đặt tour Sài Gòn 7 Ngày</p>
                      <p style={{ color: 'gray', fontWeight: 200, margin: 2, fontStyle: 'inherit' }}>10 giờ trước</p>
                    </div>
                    <p onClick={() => handShowThongBao()} className='btn-dong-info' >Tắt cửa sổ</p>
                  </div> : ""
              }
            </div>
          </div>
          <Tabheader trigger={disableMenu} />
        </div>
      )}
    </div>
  )
}

export default Home