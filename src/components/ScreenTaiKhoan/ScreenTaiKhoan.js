import React, { useEffect, useState } from 'react'
import './ScreenTaiKhoan.css'
import Accordion from 'react-bootstrap/Accordion';
import { firebase } from '../../util/config';
import axios from 'axios';
import PopupNote from '../Popup/PopupNote';
import { logginTaiKhoan, updateMK, updateUser } from '../../util/ApiRouter';
import { Button } from 'react-bootstrap';

export default function ScreenTaiKhoan(props) {
    const [image, setImage] = useState(null);
    const storage = firebase.storage()
    const [nguoiDung, setNguoiDung] = useState(props.nguoiDung)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [renewPassword, setRenewPassword] = useState("")
    const [isUpdatePopup, setIsUpdatePopup] = useState(false)
    const [isErrorUpdate, setIsErrorUpdate] = useState(false)
    const [isUpdateMatKhauPopup, setIsUpdateMatKhauPopup] = useState(false)
    // thông tin validate 
    const [validateTen, setValidateTen] = useState({
        "status": false,
        "content": ""
    })
    const [validateDiaChi, setValidateDiaChi] = useState({
        "status": false,
        "content": ""
    })
    const [validateSdt, setValidateSdt] = useState({
        "status": false,
        "content": ""
    })
    // thong tin validate password
    const [validateOldPassword, setValidateOldPassword] = useState({
        "status": false,
        "content": ""
    })
    const [validateNewPassword, setValidateNewPassword] = useState({
        "status": false,
        "content": ""
    })
    const [validateReNewPassword, setValidateReNewPassword] = useState({
        "status": false,
        "content": ""
    })

    // thông tin người dùng
    const [ten, setTen] = useState(nguoiDung.ten)
    const [diaChi, setDiaChi] = useState(nguoiDung.diaChi)
    const [email, setEmail] = useState(nguoiDung.email)
    const [sdt, setSdt] = useState(nguoiDung.sdt)
    const [url, setUrl] = useState(nguoiDung.avatar);

    const handleShowPopupUpdateTaiKhoan = () => {
        setIsUpdatePopup(!isUpdatePopup)
    }
    const onChangeOldPassword = (e) => {
        let opw = e.target.value
        setOldPassword(opw)
        let validPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        if (!opw.match(validPassword)) {
            setValidateOldPassword({
                "status": true,
                "content": "Phải chứa ít nhất một số và một chữ hoa và chữ thường và ít nhất 8 ký tự trở lên"
            })
        } else {
            setValidateOldPassword({
                "status": false,
                "content": "correct!"
            })
        }
    }
    const onChangeNewPassword = (e) => {
        let npw = e.target.value
        setNewPassword(npw)
        let validPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        if (!npw.match(validPassword)) {
            setValidateNewPassword({
                "status": true,
                "content": "Phải chứa ít nhất một số và một chữ hoa và chữ thường và ít nhất 8 ký tự trở lên"
            })
        } else {
            setValidateNewPassword({
                "status": false,
                "content": "correct!"
            })
        }
    }
    const onChangeRenewPassword = (e) => {
        let rnpw = e.target.value
        setRenewPassword(rnpw)
        let validPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        if (newPassword != rnpw) {
            setValidateReNewPassword({
                "status": true,
                "content": "Nhập lại mật khẩu chưa chùng khớp!"
            })
        }
        else if (!rnpw.match(validPassword)) {
            setValidateReNewPassword({
                "status": true,
                "content": "Phải chứa ít nhất một số và một chữ hoa và chữ thường và ít nhất 8 ký tự trở lên"
            })
        } else {
            setValidateReNewPassword({
                "status": false,
                "content": "correct!"
            })
        }
    }
    useEffect(() => {
        setNguoiDung(props.nguoiDung)
    }, [])

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // progress function
            },
            (error) => {
                // error function
                console.log(image)
                console.log(error);
            },
            () => {
                // complete function
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {
                        setUrl(url);
                        console.log(url)
                    });
            }
        );
    };
    const updateNguoiDung = async () => {
        let user = ({
            "document_id": nguoiDung.document_id,
            "ten": ten,
            "diaChi": diaChi,
            "email": email,
            "sdt": sdt,
            "avatar": url
        })
        const result = await axios.put(updateUser, user)
        if (result.data) {
            console.log(result.data)
            console.log(user)
            props.setThongTinUser(user)
            setIsUpdatePopup(false)
        } else {
            console.log("Update Error")
        }
    }
    // handle update Password
    const handleUpdatePassword = async (event) => {
        event.preventDefault();
        const res = await axios.get(logginTaiKhoan, {
            params: {
                userName: email,
                password: oldPassword
            }
        })
        if (res.data && oldPassword != newPassword) {
            res.data.password = newPassword
            console.log(res.data)
            axios.put(updateMK, res.data)
                .then((result) => {
                    console.log(result.data)
                    setIsUpdateMatKhauPopup(false)
                })
                .catch((error) => {
                    setIsUpdateMatKhauPopup(false)
                    setIsErrorUpdate(true)
                    console.log(error)
                })
        } else {
            setIsUpdateMatKhauPopup(false)
            setIsErrorUpdate(true)
            console.log("Loi doi mật khẩu")
        }
    };
    const handleRespacePW = () => {
        setOldPassword("")
        setNewPassword("")
        setRenewPassword("")
    }
    const handleRespaceUser = () => {
        setTen("")
        setDiaChi("")
        setSdt("")
    }
    const handleChangeTen = (e) => {
        let new_ten = e.target.value
        setTen(new_ten)
        let validRegex = /[^A-e]/g;
        if (!new_ten.match(validRegex)) {
            setValidateTen({
                "status": true,
                "content": "Không được bỏ trống Tên"
            })
        } else {
            setValidateTen({
                "status": false,
                "content": "correct!"
            })
        }
    }
    const handleChangeDC = (e) => {
        let new_dc = e.target.value
        setDiaChi(new_dc)
        let validRegex = /[^A-e]/g;
        if (!new_dc.match(validRegex)) {
            setValidateDiaChi({
                "status": true,
                "content": "Không được bỏ trống Địa chỉ"
            })
        } else {
            setValidateDiaChi({
                "status": false,
                "content": "correct!"
            })
        }
    }
    const handleChangeSDT = (e) => {
        let new_sdt = e.target.value
        setSdt(new_sdt)
        let validRegex = /^[0-9]{10}$/;
        if (!new_sdt.match(validRegex)) {
            setValidateSdt({
                "status": true,
                "content": "Không được bỏ trống Địa chỉ"
            })
        } else {
            setValidateSdt({
                "status": false,
                "content": "correct!"
            })
        }
    }
    return (
        <div className='tai-khoan-container'>
            <div className='thongke-header'>
                <a>Home/ Quản lý tài khoản</a>
            </div>
            <div className='info-tai-khoan'>
                <h5>Quản lý tài khoản & thông tin người dùng</h5>
                <hr />
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Thông tin (ID Thông tin người dùng) * : {nguoiDung.document_id} </Accordion.Header>
                        <Accordion.Body>
                            <div className='info-content'>
                                <div className='avatar-view'>
                                    <div className='avatar-image'>
                                        <img className='avatar' src={url} alt="user avatar" />
                                    </div>
                                    <label for="file-upload" class="custom-file-upload">
                                        <i class="fa fa-cloud-upload"></i> Chọn ảnh
                                    </label>
                                    <input id="file-upload" className='input-file' type='file' onChange={handleChange} alt='uri image' ></input>
                                    <Button variant="outline-secondary" style={{ margin: 5 }} onClick={handleUpload}>Upload Image</Button>{' '}
                                </div>
                                <div className='info-form'>
                                    <p>Email {"(Email)"}*: {email}</p>
                                    <p>Tên người dùng {"(Full Name)"}*: {ten}</p>
                                    <div className='group-input' style={{ flexDirection: "row", display: "flex" }}>
                                        <input type='text' className='inp-text' placeholder='Nhập tên người dùng' onChange={(e) => handleChangeTen(e)} value={ten} />
                                        {
                                            validateTen.content != "" ? (
                                                validateTen.status ? <p style={{ color: "red", marginLeft: 10 }}> {validateTen.content}</p> : <p style={{ color: "green", marginLeft: 10 }}>correct!</p>
                                            ) : ""
                                        }
                                    </div>
                                    <p>Địa chỉ {"(Address)"}*: {diaChi}</p>
                                    <div className='group-input' style={{ flexDirection: "row", display: "flex" }}>
                                        <input type='text' className='inp-text' placeholder='Nhập địa chỉ' onChange={(e) => handleChangeDC(e)} value={diaChi} />

                                        {
                                            validateDiaChi.content != "" ? (
                                                validateDiaChi.status ? <p style={{ color: "red", marginLeft: 10 }}> {validateDiaChi.content}</p> : <p style={{ color: "green", marginLeft: 10 }}>correct!</p>
                                            ) : ""
                                        }
                                    </div>
                                    <p>Điện thoại {"(Phone number)"}*: {sdt}</p>
                                    <div className='group-input' style={{ flexDirection: "row", display: "flex" }}>
                                        <input type='text' className='inp-text' placeholder='Nhập số điện thoại' onChange={(e) => handleChangeSDT(e)} value={sdt} />
                                        {
                                            validateSdt.content != "" ? (
                                                validateSdt.status ? <p style={{ color: "red", marginLeft: 10 }}> {validateSdt.content}</p> : <p style={{ color: "green", marginLeft: 10 }}>correct!</p>
                                            ) : ""
                                        }
                                    </div>
                                    <hr />
                                    <div>
                                        <Button variant="outline-secondary" onClick={() => handleRespaceUser()}>Xóa trắng</Button>{' '}
                                        <Button variant='outline-warning' onClick={() => handleShowPopupUpdateTaiKhoan()}> Cập nhật</Button>
                                    </div>
                                    <PopupNote className="update_popup" showInfoPopup={isUpdatePopup} trigger={isUpdatePopup} setTrigger={setIsUpdatePopup} >
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
                                                <p style={{ color: 'gray', flex: 0.9 }}> Update Data </p>
                                                <Button variant="danger" style={{ fontSize: 16 }} onClick={() => setIsUpdatePopup(false)}>x</Button>
                                            </div>
                                            <p style={{ color: "red", fontSize: 14 }}>Thông tin tour sẽ cập nhật vào dữ liệu</p>
                                            {/* <p style={{ color: "gray" }}>Mã tour: {tourClicked.document_id}</p>
                                            <p style={{ color: "gray" }}>Tên tour: {tourClicked.tenTour}</p> */}
                                            <div style={{ marginTop: 30, display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                                                <Button style={{ marginRight: 20, width: 140 }} variant='outline-secondary' onClick={() => setIsUpdatePopup(false)}>Cancel</Button>
                                                <Button style={{ marginRight: 20, width: 140 }} variant='danger' onClick={() => updateNguoiDung()}>Start Update</Button>
                                            </div>
                                        </div>
                                    </PopupNote>

                                </div>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Cập nhật mật khẩu</Accordion.Header>
                        <Accordion.Body>
                            <div className='cap-nhat-mat-khau-view'>
                                <div className='title-cap-nhat-mat-khau'>
                                    <h5>Cập nhật mật khẩu</h5>
                                </div>
                                <div>
                                    <p>ID tài khoản (document_id) * : {nguoiDung.email}</p>
                                    <p>Mật khẩu cũ (Older Password) * : </p>
                                    <div className='group-input' style={{ flexDirection: "row", display: "flex" }}>
                                        <input
                                            className='inp-text'
                                            type='password'
                                            placeholder='Aa87654321'
                                            onChange={e => onChangeOldPassword(e)}
                                            value={oldPassword} />
                                        {
                                            validateOldPassword.content != "" ? (
                                                validateOldPassword.status ? <p style={{ color: "red", marginLeft: 10 }}> {validateOldPassword.content}</p> : <p style={{ color: "green", marginLeft: 10 }}>correct!</p>
                                            ) : ""
                                        }
                                    </div>

                                    <p>Mật khẩu mới {"(New Password)"}*:</p>
                                    <div className='group-input' style={{ flexDirection: "row", display: "flex" }}>
                                        <input
                                            className='inp-text'
                                            placeholder='Aa12345678'
                                            type='password'
                                            onChange={e => onChangeNewPassword(e)}
                                            value={newPassword} />
                                        {
                                            validateNewPassword.content != "" ? (
                                                validateNewPassword.status ? <p style={{ color: "red", marginLeft: 10 }}> {validateNewPassword.content}</p> : <p style={{ color: "green", marginLeft: 10 }}>correct!</p>
                                            ) : ""
                                        }
                                    </div>

                                    <p>Nhập lại mật khẩu mới {"(New Password)"}*:</p>
                                    <div className='group-input' style={{ flexDirection: "row", display: "flex" }}>
                                        <input
                                            className='inp-text'
                                            placeholder='Aa12345678'
                                            type='password'
                                            onChange={e => onChangeRenewPassword(e)}
                                            value={renewPassword} />
                                        {
                                            validateReNewPassword.content != "" ? (
                                                validateReNewPassword.status ? <p style={{ color: "red", marginLeft: 10 }}> {validateReNewPassword.content}</p> : <p style={{ color: "green", marginLeft: 10 }}>correct!</p>
                                            ) : ""
                                        }
                                    </div>

                                    <hr />
                                    <div>
                                        <Button variant="outline-secondary" onClick={() => handleRespacePW()}>Xóa trắng</Button>{' '}
                                        <Button variant='outline-warning' onClick={() => setIsUpdateMatKhauPopup(true)}> Cập nhật</Button>
                                    </div>
                                    <PopupNote className="updateMK_popub" showInfoPopup={isUpdateMatKhauPopup} trigger={isUpdateMatKhauPopup} setTrigger={setIsUpdateMatKhauPopup} >
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
                                                <p style={{ color: 'gray', flex: 0.9 }}> Update Data </p>
                                                <Button variant="danger" style={{ fontSize: 16 }} onClick={() => setIsUpdateMatKhauPopup(false)}>x</Button>
                                            </div>
                                            <p style={{ color: "red", fontSize: 14 }}>Thông tin tour sẽ cập nhật vào dữ liệu</p>
                                            {/* <p style={{ color: "gray" }}>Mã tour: {tourClicked.document_id}</p>
                                            <p style={{ color: "gray" }}>Tên tour: {tourClicked.tenTour}</p> */}
                                            <div style={{ marginTop: 30, display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                                                <Button style={{ marginRight: 20, width: 140 }} variant='outline-secondary' onClick={() => setIsUpdateMatKhauPopup(false)}>Cancel</Button>
                                                <Button style={{ marginRight: 20, width: 140 }} variant='danger' onClick={(e) => handleUpdatePassword(e)}>Start Update</Button>
                                            </div>
                                        </div>
                                    </PopupNote>
                                    <PopupNote className="erro_popup" showInfoPopup={isErrorUpdate} trigger={isErrorUpdate} setTrigger={setIsErrorUpdate} >
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
                                                <p style={{ color: 'gray', flex: 0.9 }}> Update Error! </p>
                                                <Button variant="danger" style={{ fontSize: 16 }} onClick={() => setIsErrorUpdate(false)}>x</Button>
                                            </div>
                                            <p style={{ color: "red", fontSize: 14 }}>Mật khẩu cũ hoặc thông tin nhập vào chưa đúng!</p>
                                            {/* <p style={{ color: "gray" }}>Mã tour: {tourClicked.document_id}</p>
                                            <p style={{ color: "gray" }}>Tên tour: {tourClicked.tenTour}</p> */}
                                            <div style={{ marginTop: 30, display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                                                <Button style={{ marginRight: 20, width: 140 }} variant='outline-secondary' onClick={() => setIsErrorUpdate(false)}>OK</Button>
                                            </div>
                                        </div>
                                    </PopupNote>
                                </div>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    {/* <Accordion.Item eventKey="2">
                        <Accordion.Header>Danh sách tài khoản người dùng</Accordion.Header>
                        <Accordion.Body>
                            <div className='cap-nhat-mat-khau-view'>
                                <div className='title-cap-nhat-mat-khau'>
                                    <h5>Tài khoản sử dụng ứng dụng Dream Trip</h5>
                                </div>
                                <div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>tên tài khoản</th>
                                                <th>password</th>
                                                <th>status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>nguoidung07@gmail.com</td>
                                                <td>Aa12345678</td>
                                                <td>true</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item> */}
                </Accordion>
                <div className='thong-tin-nguoi-dung'>
                    {/* Begin thông tin người dùng */}

                    {/* begin form update */}
                </div>
            </div>

        </div>
    )
}
