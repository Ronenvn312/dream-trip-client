import React, { useEffect, useState } from 'react'
import './Login.css'
import logo from '../assets/logo.png'
import bro from '../assets/bro.png'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { logginTaiKhoan } from '../util/ApiRouter'
function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  //event get values
  const [validateEmail, setValidateEmail] = useState({
    "status": true,
    "content": ""
  })
  const [validatePassword, setValidatePassword] = useState({
    "status": true,
    "content": ""
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get(logginTaiKhoan, {
      params: {
        userName: email,
        password: password
      }
    }).then((res) => {
      if (res.data) {
        localStorage.setItem("email", JSON.stringify({ userName: res.data.userName }))
        console.log(validateEmail.status + "" + validatePassword.status)
        console.log(res)
        navigate('/home')
      }
      else {
        setValidateEmail({
          "status": true,
          "content": "Email hoặc mật khẩu của bạn chưa chính xác!"
        })
        setValidatePassword({
          "status": true,
          "content": "Email hoặc mật khẩu của bạn chưa chính xác!"
        })
      }
    })
  };

  const handleChangeEmail = (event) => {
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    setEmail(event.target.value)
    if (!event.target.value.match(validRegex)) {
      setValidateEmail({
        "status": true,
        "content": "Email chưa đúng định dạng VD: abc@gmail.com"
      })
    }
    else {
      setValidateEmail({
        "status": false,
        "content": "Nhập hợp lệ!"
      })
    }
  }
  const handleChangePassword = (event) => {
    let validPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    setPassword(event.target.value)
    if (!event.target.value.match(validPassword)) {
      setValidatePassword({
        "status": true,
        "content": "Phải chứa ít nhất một số và một chữ hoa và chữ thường và ít nhất 8 ký tự trở lên"
      })
    } else {
      setValidatePassword({
        "status": false,
        "content": "Nhập hợp lệ!"
      })
    }

  }
  // const handleValidation = () => {

  // }
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
    const email = localStorage.getItem("email")
    if (email) {
      navigate("/home")
      // localStorage.removeItem("email")
    }
  }, [])
  return (

    <div className='Login'>
      {isLoading ? (
        <div className='loading_view'>
          <img className='logo-loading' src={logo} alt='logo' />
          <img className='image-loading' src={bro} alt='img-loading' />
          <div className='logo-loading' >
          </div>
          <div className="loading">
          </div>
          <h2 className='title-loading'>Đang đăng xuất...</h2>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
          <div className='Login-left'>
            <img className='Logo-left' src={logo} alt='' />
            <h1 className='Login-title'>Sign In</h1>

            <Form className='group-control' onSubmit={(e) => handleSubmit(e)} >
              <Form.Label className='label-login'>Email address</Form.Label>
              <Form.Group id='form-group' controlId="formBasicEmail">
                <div style={{ minWidth: 350, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Form.Control
                    name='email'
                    value={email}
                    onChange={e => handleChangeEmail(e)}
                    type="text" placeholder="Enter email" required />

                  {
                    validateEmail.content != "" ? (
                      validateEmail.status ? <img className='Logo-left' style={{ marginLeft: 10, width: 30, height: 30 }} src={require('../assets/validation/erro_checked.png')} alt='' />
                        : <img style={{ marginLeft: 10, width: 30, height: 30 }} className='Logo-left' src={require('../assets/validation/success_checked.png')} alt='' />
                    ) : ""
                  }
                </div>
                {
                  validateEmail.status ? <p style={{ maxWidth: 350, color: "red", alignItems: 'flex-start', float: "left", paddingLeft: 10 }}>
                    {validateEmail.content}
                  </p> : ""
                }
              </Form.Group>
              <Form.Label className='label-login'>Password</Form.Label>
              <Form.Group id='form-group' className="mb-3" controlId="formBasicPassword">
                <div style={{ minWidth: 350, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Form.Control
                    name='password'
                    value={password}

                    onChange={e => handleChangePassword(e)}
                    type="password" placeholder="Password" required />
                  {
                    validatePassword.content != "" ? (
                      validatePassword.status ? <img className='Logo-left' style={{ marginLeft: 10, width: 30, height: 30 }} src={require('../assets/validation/erro_checked.png')} alt='' />
                        : <img style={{ marginLeft: 10, width: 30, height: 30 }} className='Logo-left' src={require('../assets/validation/success_checked.png')} alt='' />
                    ) : ""
                  }
                </div>

                {validatePassword.status ?
                  <p style={{ maxWidth: 350, color: "red", alignItems: 'flex-start', float: "left", paddingLeft: 10 }}>
                    {validatePassword.content}
                  </p> : ""
                }

              </Form.Group>
              <Form.Group id='form-group' className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  className='label-login' type="checkbox" label="Ghi nhớ thông tin đăng nhập" />
              </Form.Group>
              <Button variant="primary" type="submit" >
                Đăng nhập
              </Button>
            </Form>
          </div>
          <div className='Login-right'>
          </div>
        </div>)}
    </div>
  )
}

export default Login