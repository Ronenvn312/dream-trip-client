import React, { useEffect, useState } from 'react'
import { Accordion, Button, Form } from 'react-bootstrap';
import './screenThongKe.css'
import Chart from './ChartThongKe/Chart'
import axios from 'axios';
import PopupInfo from '../Popup/PopupInfo'
import { checkDatTour, findAllTour, findAllTuongTac, findByNam, findByNamAndTourId, findDatTour, findThongKeTheoThang } from '../../util/ApiRouter';
import PopupTuongTac from '../Popup/PopupTuongTac';
export default function ScreenThongKe() {

    const dsTour = localStorage.getItem("dsTour")
    const [listTour, setListTour] = useState([])
    const handleShowListTour = () => {
        if (dsTour != null) {
            const list = JSON.parse(dsTour);
            setListTour(list)
        }
    }
    const [selectedThang, setSelectedThang] = useState(5);
    const [selectedNam, setSelectedNam] = useState(2023);
    const [selectedNamOfOne, setSelectedNameOfOne] = useState(2023);
    const [selectedHieuQua, setSelectedHieuQua] = useState("tot nhat");
    const [listNam, setListNam] = useState([])
    const [listThang, setListThang] = useState([])
    const [listThongKe, setListThongKe] = useState([])
    const [data, setData] = useState([])
    const [dataOfOne, setDataOfOne] = useState([])
    const [tongTuongTac, setTongTuongTac] = useState(0)
    const [tongLuotThich, setTongLuotThich] = useState(0)
    const [tongDatTour, setTongDatTour] = useState(0)
    const [danhSachTour, setDanhSachTour] = useState([])
    // thong ke tuong tac
    const [tuongTac, setTuongTac] = useState({
        "tourId": "",
        "userDaThich": [
        ],
        "userDaDat": [],
        "userLenKeHoach": []
    })
    const [isListDatTourPopup, setIsListDatTourPopup] = useState(false)
    const [listDatTour, setListDatTour] = useState([])
    const handleShowListDatTour = async (item, userId) => {
        getListDatTour(item, userId)
        handleShowDatTourPopup()
    }
    const getListDatTour = async (item, userId) => {
        const result = await axios.get(findDatTour, {
            params: {
                "tourId": item.tourId,
                "userId": userId
            }
        })

        if (result.data != null) {
            setListDatTour(result.data)
        } else {
            console.log("Không thể tìm thấy danh sách đã đặt này!")
        }
    }
    const handleShowDatTourPopup = () => {
        setIsListDatTourPopup(!isListDatTourPopup)
    }
    const handleCheckedDonDatTour = async (item) => {
        const result = await axios.put(checkDatTour, item)
        if (result.data) {
            console.log(result)
            item.status = result
            getListDatTour(tuongTac, item.nguoiDungId)
        } else {
            console.log("Không thể Check!")
        }
    }
    // khai báo cho selected option tour
    const [selectedIdTour, setSelectedIdTour] = useState("")
    const handleSelectedTour = (e) => {
        console.log(e.target.value)
        setSelectedIdTour(e.target.value)
    }
    const handleGetAllTuongTac = async () => {
        const result = await axios.get(findAllTuongTac, {
            params: {
                "tourId": selectedIdTour
            }
        })

        if (result.data != null) {
            setTuongTac(result.data)
            console.log(result)
        } else {
            console.log("Không thể tìm thấy tương tác này!")
        }
        // hanleShowPopupTuongTac()
        handleThongKeCacThangOfOneTour()
    }
    // danh sách tour
    // Kết thúc các chức năng với đơn đặt tour
    const handleResultData = async () => {
        const result = await axios.get(findAllTour)
        if (result) {
            setDanhSachTour(result.data)
            setSelectedIdTour(result.data[0].document_id)
            console.log(result)
        } else {
            console.log("không thể load data")
        }
    }
    // opent click xem chi tiết danh sách tour
    const [isShowPopupDSTour, setIsShowPopupDSTour] = useState(false)
    const handleShowListTKTour = () => {
        setIsShowPopupDSTour(!isShowPopupDSTour);
        console.log(isShowPopupDSTour)
    }
    // const [option]
    const handleSelectChangeNam = (event) => {
        setSelectedNam(event.target.value);
        console.log(event.target.value)
    };
    const handleSelectChangeNamOfOne = (event) => {
        setSelectedNameOfOne(event.target.value);
        console.log(event.target.value)
    };
    const handleSelectChangeThang = (event) => {
        setSelectedThang(event.target.value);
        console.log(event.target.value)
    };
    const handleSelectChangeHieuQua = (event) => {
        setSelectedHieuQua(event.target.value);
        console.log(event.target.value)
    };
    const handleValue = () => {
        let listN = []
        let listT = []
        for (let index = 2023; index >= 2010; index--) {
            listN.push(index);
        }
        for (let index = 1; index <= 12; index++) {
            listT.push(index);
        }
        setListNam(listN)
        setListThang(listT)
    }
    const handleSearchThongKe = async () => {
        let sum = 0;
        let sumLuotDat = 0;
        let sumLuotThich = 0;
        const result = await axios.get(findThongKeTheoThang, {
            params: {
                thang: selectedThang,
                nam: selectedNam
            }
        })
        if (result.data) {
            if (selectedHieuQua == "cao nhat") {
                setListThongKe(result.data)
            } else {
                // console.log(result.data)
                setListThongKe(result.data.reverse())
            }
            result.data.forEach(element => {
                sum = sum + element.slThich + element.slDatTour + element.slThemKeHoach
                sumLuotDat = sumLuotDat + element.slDatTour
                sumLuotThich = sumLuotThich + element.slThich
            });
            setTongTuongTac(sum)
            setTongDatTour(sumLuotDat)
            setTongLuotThich(sumLuotThich)
        }
        handleThongKeCacThang()
    }
    const handleThongKeCacThang = async () => {
        const result = await axios.get(findByNam, {
            params: {
                nam: selectedNam
            }
        })
        if (result.data) {
            console.log(result.data)
            setData(result.data)
        }
    }
    const handleThongKeCacThangOfOneTour = async () => {
        const result = await axios.get(findByNamAndTourId, {
            params: {
                nam: selectedNamOfOne,
                tourId: selectedIdTour
            }
        })
        if (result.data) {
            console.log(result.data)
            setDataOfOne(result.data)
        }
    }
    // const handleClickTho
    useEffect(() => {
        handleShowListTour()
        if (danhSachTour.length <= 0) {
            handleResultData()
        } else {
            console.log("updating data")
        }
        handleSearchThongKe()
        if (listNam.length <= 0 || listThang.length <= 0) {
            handleValue()
        }

    }, [danhSachTour])
    return (
        <div className='thongke-container'>
            <div className='thongke-header'>
                <a>Home/ Thống kê</a>
            </div>
            <div className="row-fluid">
                <div className="span3 responsive" data-tablet="span6" data-desktop="span3">
                    <div className="dashboard-blue">
                        <div className="visual">
                            <i className="icon-comments"></i>
                            <div className="details">
                                <div className="number">
                                    {listTour.length}
                                </div>
                                <div className="desc">
                                    Tour
                                </div>
                            </div>
                        </div>

                        <a className="more" href="#" onClick={() => handleShowListTKTour()}>
                            Xem chi tiết danh sách tour <i className="m-icon-swapright m-icon-white"></i>
                        </a>
                        {/* <PopupTuongTac className="tuongtac_popup" showInfoPopup={isShowPopupDSTour} trigger={isShowPopupDSTour} setTrigger={setIsShowPopupDSTour} >
                            <div className='tuong-tac-content'>
                                Thông tin
                                <hr/>
                                Danh sách chi tiết tour
                            </div>

                        </PopupTuongTac> */}
                    </div>
                </div>
                <div className="span3 responsive" data-tablet="span6" data-desktop="span3">
                    <div className="dashboard-green">
                        <div className="visual">
                            <i className="icon-comments"></i>
                            <div className="details">
                                <div className="number">
                                    {tongLuotThich}
                                </div>
                                <div className="desc">
                                    Tổng lượt thích trong tháng
                                </div>
                            </div>
                        </div>

                        <a className="more" href="#">
                            View more <i className="m-icon-swapright m-icon-white"></i>
                        </a>
                    </div>
                </div>
                <div className="span3 responsive" data-tablet="span6" data-desktop="span3">
                    <div className="dashboard-purple">
                        <div className="visual">
                            <i className="icon-comments"></i>
                            <div className="details">
                                <div className="number">
                                    {tongTuongTac}
                                </div>
                                <div className="desc">
                                    Số lượng tương tác trong tháng
                                </div>
                            </div>
                        </div>

                        <a className="more" href="#">
                            View more <i className="m-icon-swapright m-icon-white"></i>
                        </a>
                    </div>
                </div>
                <div className="span3 responsive" data-tablet="span6" data-desktop="span3">
                    <div className="dashboard-yellow">
                        <div className="visual">
                            <i className="icon-comments"></i>
                            <div className="details">
                                <div className="number">
                                    {tongDatTour}
                                </div>
                                <div className="desc">
                                    Số lượng đặt tour trong tháng
                                </div>
                            </div>
                        </div>

                        <a className="more" href="#">
                            View more <i className="m-icon-swapright m-icon-white"></i>
                        </a>
                    </div>
                </div>
            </div>
            {/* END DASHBOARD STATS */}



            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Thống kê tất cả tour</Accordion.Header>
                    <Accordion.Body>

                        <Form style={{ flexDirection: 'row', display: "flex", marginLeft: 40, marginBottom: 20 }}>
                            <Form.Group controlId="exampleForm.SelectCustom" style={{ flex: 0.11 }}>
                                <Form.Label style={{ color: "#fff" }}>Chọn tháng: </Form.Label>
                                <Form.Select value={selectedThang} onChange={handleSelectChangeThang}>
                                    {
                                        listThang.map((item) => {
                                            return <option key={item} value={item}>Tháng {item}</option>
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.SelectCustom" style={{ flex: 0.11, marginLeft: 20 }}>
                                <Form.Label style={{ color: "#fff" }}>chọn năm: </Form.Label>
                                <Form.Select value={selectedNam} onChange={handleSelectChangeNam}>
                                    {
                                        listNam.map((item) => {
                                            return <option value={item}>Năm {item}</option>
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.SelectCustom" style={{ flex: 0.11, marginLeft: 20 }}>
                                <Form.Label style={{ color: "#fff" }}>Hiệu quả: </Form.Label>
                                <Form.Select value={selectedHieuQua} onChange={handleSelectChangeHieuQua}>
                                    <option value="cao nhat">Tốt nhất</option>
                                    <option value="thap nhat">Thấp nhất</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group style={{ flex: 0.18, marginTop: 32, marginLeft: 20, justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'column' }}>
                                <Button
                                    onClick={() => handleSearchThongKe()}
                                    style={{ width: 150 }}
                                    variant='info'
                                    type='button'>Tìm kiếm</Button>
                            </Form.Group>
                        </Form>
                        <div className='thongke-fluid' >

                            {/* <!-- BEGIN STACK CHART CONTROLS PORTLET--> */}

                            <div className='thongke-fluid-right'>
                                <h5 className='thongke-fluid-right-title'>Thống kế lượng tương tác tour các tháng trong nắm {selectedNam}</h5>
                                <Chart data={data} />
                            </div>
                            {/* <!-- END STACK CHART CONTROLS PORTLET--> */}
                            <div className='thongke-fluid-left'>
                                <h5 className='thongke-fluid-left-title'>Thống kê tương tác trong tháng {selectedThang}</h5>
                                <table className='thongke-table'>
                                    <thead className='thongke-table-header'>
                                        <th> STT</th>
                                        <th> mã tour </th>
                                        <th> tên tour</th>
                                        <th> Lượt thích</th>
                                        <th> Lượt đặt</th>
                                        <th> Lượt thêm kế hoạch</th>
                                    </thead>
                                    <tbody className='thongke-table-tbody'>
                                        {

                                            listThongKe.map((item, index) => {
                                                return <tr onClick={() => { console.log(item.document_id) }} key={item.document_id} className='thongke-table-tbody-tr'>
                                                    <td>
                                                        {index + 1}
                                                    </td>
                                                    <td>
                                                        {item.document_id}
                                                    </td>
                                                    <td>
                                                        {item.tenTour}
                                                    </td>
                                                    <td>
                                                        {item.slThich}
                                                    </td>
                                                    <td>
                                                        {item.slDatTour}
                                                    </td>
                                                    <td>
                                                        {item.slThemKeHoach}
                                                    </td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Thống kê chi tiết tour</Accordion.Header>
                    <Accordion.Body>

                        <Form style={{ flexDirection: 'row', display: "flex", marginLeft: 20, marginBottom: 20 }}>

                            <Form.Group controlId="exampleForm.SelectCustom" style={{ flex: 0.35 }}>
                                <Form.Label style={{ color: "black" }}>Thống kê tour: </Form.Label>
                                <Form.Select value={selectedIdTour} onChange={handleSelectedTour}>
                                    {
                                        danhSachTour.map((item, index) => {
                                            return <option key={item.document_id} value={item.document_id}> {item.document_id} - {item.tenTour}</option>
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.SelectCustom" style={{ flex: 0.11, marginLeft: 20 }}>
                                <Form.Label style={{ color: "#fff" }}>chọn năm: </Form.Label>
                                <Form.Select value={selectedNamOfOne} onChange={handleSelectChangeNamOfOne}>
                                    {
                                        listNam.map((item) => {
                                            return <option value={item}>Năm {item}</option>
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group style={{ flex: 0.18, marginTop: 32, marginLeft: 20, justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'column' }}>
                                <Button
                                    onClick={() => handleGetAllTuongTac()}
                                    style={{ width: 150 }}
                                    variant='info'
                                    type='button'>Tìm kiếm</Button>
                            </Form.Group>
                        </Form>
                        <div className='thongke-fluid' >

                            {/* <!-- BEGIN STACK CHART CONTROLS PORTLET--> */}
                            <div className='thongke-fluid-right'>
                                <h5 className='thongke-fluid-right-title'>Thống kế lượng tương tác tour các tháng trong nắm {selectedNam}</h5>
                                <Chart data={dataOfOne} />
                            </div>

                            {/* <!-- END STACK CHART CONTROLS PORTLET--> */}
                            <div className='thongke-fluid-left'>
                                <div className='tuong-tac-content'>
                                    <p style={{paddingLeft: 10, fontSize: 20, fontWeight: 'bold'}}>Danh Sách Tương Tác Trong Tất Cả Các Năm</p>
                                    <p style={{paddingLeft: 10}}> ID : {selectedIdTour}</p>
                                    {/* <p>  {tourName}</p> */}
                                    <div className='tuong-tac-body'>
                                        <Accordion defaultActiveKey="0" style={{ width: "100%", padding: 10 }}>
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header><p style={{ color: "black" }}>Lượt Thích: </p> <p style={{color: "red", paddingLeft: 10}}> {tuongTac.userDaThich.length}</p></Accordion.Header>
                                                <Accordion.Body>
                                                    <div className='danh-sach-thich'>
                                                        <ul>
                                                            {
                                                                tuongTac.userDaThich.map((item) => {
                                                                    return <li style={{ color: "black" }}>USER_ID: {item}</li>
                                                                })
                                                            }
                                                        </ul>

                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="1">
                                                <Accordion.Header><p style={{ color: "black" }}>Lượt Đặt: </p> <p style={{color: "red", paddingLeft: 10}}> {tuongTac.userDaDat.length}</p></Accordion.Header>
                                                <Accordion.Body>
                                                    <div className='danh-sach-dat'>
                                                        <ul>
                                                            {
                                                                tuongTac.userDaDat.map((item) => {
                                                                    return <li style={{ flexDirection: 'row', display: "flex", justifyContent: "center", alignItems: 'center' }}>
                                                                        <p style={{ color: "black", flex: 0.7, justifyContent: "center", marginTop: 10 }}>
                                                                            USER_ID: {item}
                                                                        </p>
                                                                        <Button style={{ width: 140, flex: 0.3 }} variant='info' onClick={() => handleShowListDatTour(tuongTac, item)}>Xem lượt đặt</Button>
                                                                        <PopupTuongTac className="dsdat_popup" showInfoPopup={isListDatTourPopup} trigger={isListDatTourPopup} setTrigger={setIsListDatTourPopup} >
                                                                            <div className='tuong-tac-content'>
                                                                                <div style={{ display: "flex", flexDirection: 'row' }}>
                                                                                    <h1 style={{ flex: 0.9, fontSize: 30 }}>Data Đặt tour</h1>
                                                                                    <button style={{ flex: 0.1 }} className='btn-close' onClick={() => setIsListDatTourPopup(false)}></button>
                                                                                </div>
                                                                                <p> ID : {selectedIdTour}</p>
                                                                                {/* <p>  {tourName}</p> */}
                                                                                <div className='tuong-tac-body'>
                                                                                    <ul style={{ width: "100%", borderRadius: 20, border: "2px solid", marginRight: 3, overflow: "auto" }}>
                                                                                        {
                                                                                            listDatTour.map((item) => {
                                                                                                return <li>
                                                                                                    <div style={{ display: 'flex', flexDirection: "row" }}>
                                                                                                        <label style={{ width: 100 }}> ID người dùng </label>
                                                                                                        <p> {item.nguoiDungId}</p>
                                                                                                    </div>
                                                                                                    <div style={{ display: 'flex', flexDirection: "row" }}>
                                                                                                        <label style={{ width: 100 }}> ID Tour</label>
                                                                                                        <p> {item.tourId}</p>
                                                                                                    </div>
                                                                                                    <div style={{ display: 'flex', flexDirection: "row" }}>
                                                                                                        <label style={{ width: 100 }}> Điện thoại</label>
                                                                                                        <p> {item.sdt}</p>
                                                                                                    </div>
                                                                                                    <div style={{ display: 'flex', flexDirection: "row" }}>
                                                                                                        <label style={{ width: 100 }}>  Người lớn</label>
                                                                                                        <p> {item.nguoiLon}</p>
                                                                                                    </div>
                                                                                                    <div style={{ display: 'flex', flexDirection: "row" }}>
                                                                                                        <label style={{ width: 100 }}> Trẻ em</label>
                                                                                                        <p> {item.treEm}</p>
                                                                                                    </div>
                                                                                                    <div style={{ display: 'flex', flexDirection: "row" }}>
                                                                                                        <label style={{ width: 100 }}>Ngày đi</label>
                                                                                                        <p> {item.ngayDi}</p>
                                                                                                    </div>
                                                                                                    {
                                                                                                        !item.status ?
                                                                                                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                                                                                <p style={{ marginTop: 10, color: "yellow", fontFamily: "-moz-initial" }}>Bạn có muốn xác nhận đã duyệt cho đơn đặt tour này? </p>
                                                                                                                <Button variant="success" style={{ width: 100, marginLeft: 10 }}
                                                                                                                    onClick={() => handleCheckedDonDatTour(item)}
                                                                                                                >
                                                                                                                    <img style={{ width: 30, height: 25 }} className='Logo-left' src={require('../../assets/validation/success_checked.png')} alt='' />
                                                                                                                </Button>
                                                                                                            </div> : <p style={{ marginTop: 10, color: "yellow", fontFamily: "-moz-initial" }}>Đã check! </p>

                                                                                                    }
                                                                                                </li>
                                                                                            })
                                                                                        }
                                                                                    </ul>
                                                                                </div>

                                                                            </div>
                                                                        </PopupTuongTac>
                                                                    </li>
                                                                })
                                                            }
                                                        </ul>

                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="2">
                                                <Accordion.Header><p style={{ color: "black" }}>Lượt Lên kê hoạch: </p> <p style={{color: "red", paddingLeft: 10}}> {tuongTac.userLenKeHoach.length}</p></Accordion.Header>
                                                <Accordion.Body>
                                                    <div className='danh-sach-them'>
                                                        <ul>
                                                            {
                                                                tuongTac.userLenKeHoach.map((item) => {
                                                                    return <li style={{ color: "black" }}>USER_ID: {item}</li>
                                                                })
                                                            }
                                                        </ul>

                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>

            </Accordion>
        </div>
    )
}
