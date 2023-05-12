import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import './TourContent.css'
import axios from 'axios'
import PopupInfo from '../Popup/PopupInfo';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import PopupNote from '../Popup/PopupNote';
import PopupTuongTac from '../Popup/PopupTuongTac';
import { Accordion } from 'react-bootstrap';
import { checkDatTour, deleteTour, findAllTour, findAllTuongTac, findAllsHDByTourId, findDatTour, searchsTour } from '../../util/ApiRouter';
export default function TourContent() {
    const [showInfoPopup, setshowInfoPopup] = useState(false)
    const [showLocatePopup, setshowLocatePopup] = useState(false)
    const [showPopupTuongTac, setShowPopupTuongTac] = useState(false)
    const [showPopupTour, setShowPopupTour] = useState(false)
    const [tourId, setTourId] = useState()
    const [tourName, setTourName] = useState("")
    const [tuongTac, setTuongTac] = useState({
        "tourId": "",
        "userDaThich": [
        ],
        "userDaDat": [],
        "userLenKeHoach": []
    })
    const [isListDatTourPopup, setIsListDatTourPopup] = useState(false)
    const [listDatTour, setListDatTour] = useState([])
    const navigate = useNavigate()
    const [resultData, setResultData] = useState([]);
    const [tourAlter, setTourAlter] = useState(null)
    const [tourcheckeds, setTourCheckeds] = useState([])
    const [isDeletePopup, setIsDeletePopup] = useState(false)
    const [searchResult, setSearchResult] = useState([])
    const [searchValue, setSearchValue] = useState()
    // Click tour sau khi search 
    const [tourSearch, setTourSearch] = useState({})
    const [listHoatDong, setListHoatDong] = useState([])
    const handleClickTourSearch = (item) => {
        setTourSearch(item)
        setShowPopupTour(!showPopupTour)
        handleResultHoatDongTour(item)
    }
    // get danh sách hoạt động của tour
    const handleResultHoatDongTour = async (item) => {
        const result = await axios.get(findAllsHDByTourId, {
            params: {
                tourId: item.document_id
            }
        })
        if (result != null) {
            setListHoatDong(result.data)
            console.log(result.data)
        } else {
            console.log("Loi get data")
        }
    }
    // kết thúc search

    // const { setTourChecked } = useContext(AppContext)
    const handleGetAllTuongTac = async (item) => {
        setTourId(item.document_id)
        setTourName(item.tenTour)
        const result = await axios.get(findAllTuongTac, {
            params: {
                "tourId": item.document_id
            }
        })

        if (result.data != null) {
            setTuongTac(result.data)
            // console.log(result)
        } else {
            console.log("Không thể tìm thấy tương tác này!")
        }
        hanleShowPopupTuongTac()
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
    const handleShowListDatTour = async (item, userId) => {
        getListDatTour(item, userId)
        handleShowDatTourPopup()
    }
    const handleShowDatTourPopup = () => {
        setIsListDatTourPopup(!isListDatTourPopup)
    }
    const hanleShowPopupTuongTac = () => {
        setShowPopupTuongTac(!showPopupTuongTac)
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
    // Kết thúc các chức năng với đơn đặt tour
    const handleResultData = async () => {
        const result = await axios.get(findAllTour)
        if (result) {
            localStorage.setItem("dsTour", JSON.stringify(result.data))
            setResultData(result.data)
            console.log(result)
        } else {
            console.log("không thể load data")
        }
    }
   
    const handShowPopupXoa = () => {
        setIsDeletePopup(!isDeletePopup)

    }
    const handleDeleteTour = () => {
        tourcheckeds.forEach((tour) => {
            axios.delete(deleteTour, {
                params: {
                    document_id: tour.document_id
                }
            }).then((result) => {
                handleResultData();
            }).catch((error) => console.log(error))
        })
        setTourCheckeds([])
    }
    // Check ALL tour
    // const handleCheckAllTour = () => {
    //     resultData.forEach((item) => {
    //         tourcheckeds.push(item)
    //     })
    //     console.log(tourCheckeds)
    // }
    //HandlClickDelete 
    // click check box
    const handClickCheckBox = (e, item) => {
        if (e.target.checked) {
            tourcheckeds.push(item)
        }
        else {
            tourcheckeds.forEach((tour, index) => {
                if (tour.document_id == item.document_id) {
                    tourcheckeds.splice(index, 1)
                }
            });
        }
        console.log(tourcheckeds)
    }
    // onChange value search tour
    const handleSearchTour = async (e) => {
        const result = await axios.get(searchsTour, {
            params: {
                tourName: e.target.value
            }
        })
        setSearchValue(e.target.value)
        if (result.data != null) {
            // console.log(result.data)
            setSearchResult(result.data)
        }
        else {
            console.log("No data filter!")
        }
    }


    useEffect(() => {
        handleResultData();
    }, [tourAlter, tuongTac, listDatTour, tourSearch, listHoatDong])
    return (
        <div className='tour-content'>

            {/* <Button className='btn_Them' variant="info" onClick={() => handShowPopupThem()}>THÊM</Button>{' '} */}
            <div className='content-root' >
                <div >
                    <h4 className='title_danhsach'>DANH SÁCH TOUR DU LỊCH</h4>
                    <Form style={{ width: '100%', height: 60 }} className='group-control'>
                        <Form.Group style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>

                            <Button
                                onClick={() => handShowPopupXoa()}
                                type='button' variant="danger" className='btn_xoa' >
                                Xóa nhiều
                                <img style={{ marginLeft: 10, marginBottom: 5, width: 28, height: 28 }} src={require('../../assets/deleteicon.png')} alt='icon-locate' />
                            </Button>{' '}
                            <label style={{ color: "wheat", marginRight: 20 }}> Tìm kiếm </label>
                            <Form.Control
                                name='search'
                                // value={" Tour Nha Trang 36h"}
                                onChange={e => handleSearchTour(e)}
                                style={{ width: 800 }}
                                type="text" placeholder="VD: Thành phố Hồ Chí Minh" required />
                            <Button variant="outline-secondary" style={{ marginLeft: 10, width: 80 }}>
                                <img style={{ width: 30, height: 30 }} src={require('./../../assets/search_icon.png')} />
                            </Button>
                            {/* <Button

                                type='button' variant="outline-warning" className='btn_sua'>
                                SỬA
                                <img style={{ paddingLeft: 10, width: 30, height: 30 }} src={require('../../assets/icon_sua.png')} alt='icon-locate' />
                            </Button>{' '} */}
                            <br />

                            <br />

                        </Form.Group>
                    </Form>
                    <div className='search-result'>
                        {
                            searchValue != "" ?
                                searchResult.map((item, index) => {
                                    return <div key={item.document_id} onClick={() => handleClickTourSearch(item)} className='search-item'>
                                        <div style={{
                                            height: 100,
                                            width: 100,
                                            backgroundImage: `url(${item.hinhAnh[0]})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover',
                                            padding: '10px'
                                        }} >
                                        </div>
                                        <p>{item.tenTour}</p>
                                        <PopupTuongTac className="tour_popup" tourSearch={tourSearch} trigger={showPopupTour} setTrigger={setShowPopupTour} >
                                            <div className='full-info-tour-content'>
                                                <p>ID: {tourSearch.document_id}</p>
                                                <p style={{ color: "black" }}>{tourSearch.tenTour}</p>
                                                <p style={{ fontSize: 15 }}> Thông tin tour: </p>
                                                <p style={{ fontSize: 14, color: 'black' }}>Vị trí : {tourSearch.viTri}</p>
                                                <p style={{ fontSize: 14, color: 'black' }}>{tourSearch.thongTin}</p>
                                                <p>Danh sách hoạt động trong tour: </p>
                                                {
                                                    listHoatDong.map((item, index) => {
                                                        return <div key={item.document_id}>
                                                            <p style={{ fontSize: 15 }}>{item.thoiGianHD}: {item.tieuDe}</p>
                                                            <video style={{ width: 360, marginLeft: 50 }} src={item.doanPhim} controls>
                                                                Your browser does not support the video tag.
                                                            </video>
                                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                                <div style={{
                                                                    height: 180,
                                                                    width: 360,
                                                                    backgroundImage: `url(${item.hinhAnh[0]})`,
                                                                    backgroundRepeat: 'no-repeat',
                                                                    backgroundSize: 'cover',
                                                                    marginLeft: 50
                                                                    // padding: '10px'
                                                                }} >
                                                                </div>
                                                                <p style={{ fontSize: 13, marginLeft: 60 }}> Ảnh {item.thoiGianHD}: {item.tieuDe}</p>
                                                            </div>
                                                            <p style={{ fontSize: 15 }}> Thông tin hoạt động: </p>
                                                            <p style={{ fontSize: 14, color: 'black' }}>Vị trí : {item.viTri}</p>
                                                            <p style={{ fontSize: 14, color: 'black' }}>{item.thongTin}</p>

                                                        </div>
                                                    })
                                                }
                                            </div>


                                        </PopupTuongTac>
                                    </div>
                                }) : ""
                        }
                    </div>
                </div>
                <div className='content-left'>
                    <div id="table-scroll">
                        <Table striped bordered hover size="sm"  >
                            <thead className='thead_table'>
                                <tr>
                                    <th className='col_stt' scope="col">#</th>
                                    <th className='col_ten' scope="col">Tour</th>
                                    <th className='col_anh' scope="col">Ảnh</th>
                                    <th className='col_thong_tin' scope="col">Thông tin</th>
                                    <th className='col_info' scope="col">Mô tả</th>
                                </tr>
                            </thead>
                            <tbody className='tbody_table' style={{ height: '500px', overflow: 'scroll' }}>
                                {resultData.map((item, index) => {
                                    return <tr key={item.document_id}>
                                        <th style={{ textAlign: 'center', color: 'white', backgroundColor: 'white' }} scope="row"> <p style={{ color: 'black' }}>{index + 1}</p>
                                            <input style={{ width: 25, height: 25 }} type="checkbox" value={item} onClick={e => handClickCheckBox(e, item)} />
                                        </th>
                                        <td>
                                            <p>id: {item.document_id}</p>
                                            <p>{item.tenTour}</p>
                                            <Button style={{ marginRight: 20 }} variant='info' onClick={() => handleGetAllTuongTac(item)}>Danh Sách tương tác</Button>
                                            <PopupTuongTac className="tuongtac_popup" tuongTac={tuongTac} tourId={item.document_id} showInfoPopup={showPopupTuongTac} trigger={showPopupTuongTac} setTrigger={setShowPopupTuongTac} >
                                                <div className='tuong-tac-content'>
                                                    <div style={{ display: "flex", flexDirection: 'row' }}>
                                                        <h1 style={{ flex: 0.9, fontSize: 30 }}>Data tương tác</h1>
                                                        <button style={{ flex: 0.1 }} className='btn-close' onClick={() => setShowPopupTuongTac(false)}></button>

                                                    </div>
                                                    <p> ID : {tourId}</p>
                                                    <p>  {tourName}</p>
                                                    <div className='tuong-tac-body'>
                                                        <Accordion defaultActiveKey="0" style={{ width: "100%", padding: 10 }}>
                                                            <Accordion.Item eventKey="0">
                                                                <Accordion.Header><p style={{ color: "black" }}>Lượt Thích:</p></Accordion.Header>
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
                                                                <Accordion.Header><p style={{ color: "black" }}>Lượt Đặt:</p></Accordion.Header>
                                                                <Accordion.Body>
                                                                    <div className='danh-sach-dat'>
                                                                        <ul>
                                                                            {
                                                                                tuongTac.userDaDat.map((item) => {
                                                                                    return <li style={{ flexDirection: 'row', display: "flex", justifyContent: "center", alignItems: 'center' }}>
                                                                                        <p style={{ color: "black", flex: 0.7, justifyContent: "center", marginTop: 10 }}>
                                                                                            USER_ID: {item}
                                                                                        </p>
                                                                                        <Button style={{ width: 140, flex: 0.3 }} variant='info' onClick={() => handleShowListDatTour(tuongTac, item)}>Xem các lần đặt</Button>
                                                                                        <PopupTuongTac className="dsdat_popup" showInfoPopup={isListDatTourPopup} trigger={isListDatTourPopup} setTrigger={setIsListDatTourPopup} >
                                                                                            <div className='tuong-tac-content'>
                                                                                                <div style={{ display: "flex", flexDirection: 'row' }}>
                                                                                                    <h1 style={{ flex: 0.9, fontSize: 30 }}>Data Đặt tour</h1>
                                                                                                    <button style={{ flex: 0.1 }} className='btn-close' onClick={() => setIsListDatTourPopup(false)}></button>
                                                                                                </div>
                                                                                                <p> ID : {tourId}</p>
                                                                                                <p>  {tourName}</p>
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
                                                                <Accordion.Header><p style={{ color: "black" }}>Lượt Lên kê hoạch:</p></Accordion.Header>
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
                                            </PopupTuongTac>
                                        </td>
                                        <td>
                                            <div style={{ height: '250px', backgroundImage: `url(${item.hinhAnh[0]})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', padding: '10px' }} >

                                            </div>
                                        </td>
                                        <td className='col_mota' style={{ textAlign: 'start' }}>
                                            <p>Địa chỉ: {item.viTri}</p>
                                            <p>longitude: {item.longitude} latitude: {item.latitude}</p>
                                            <p>Thể loại:
                                                {item.theLoai.map((tl) => {
                                                    return " " + tl + ", "
                                                })
                                                }
                                            </p>
                                            <p>Số ngày: {item.soNgay}</p>
                                            <p>Phổ biến: {item.phoBien ? <input type="checkbox" checked disabled /> : <input type="checkbox" disabled />} Xu hướng: {item.xuHuong ? <input type="checkbox" checked disabled /> : <input type="checkbox" disabled />}</p>
                                            <p>Đánh giá: {item.danhGia}</p>
                                        </td>
                                        <td className='col_mota' style={{ textAlign: 'start' }}>
                                            <p>Thông tin: {item.thongTin}</p>

                                        </td>
                                    </tr>
                                })
                                }
                            </tbody>

                        </Table>
                    </div>
                </div>
            </div>

            {
                tourcheckeds.length > 0 ?
                    <PopupNote className="xoa_popub" showInfoPopup={isDeletePopup} trigger={isDeletePopup} setTrigger={setIsDeletePopup} >
                        <div
                            style={{
                                height: '200px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: 22
                            }}>
                            <p style={{ color: 'red' }}>Bạn có muốn xóa những tour này? ( số tour: {tourcheckeds.length}) </p>
                            <div style={{ marginTop: 30, display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Button style={{ marginRight: 20, width: 140 }} variant='danger' onClick={() => handleDeleteTour()}>Yes</Button>
                                <Button style={{ marginRight: 20, width: 140 }} variant='warning' onClick={() => setIsDeletePopup(false)}>No</Button>
                            </div>
                        </div>
                    </PopupNote> :
                    <PopupNote className="xoa_popub" showInfoPopup={isDeletePopup} trigger={isDeletePopup} setTrigger={setIsDeletePopup} >
                        <div
                            style={{
                                height: '200px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: 22
                            }}>
                            <p style={{ color: 'red' }}>Bạn chưa chọn tour cần xóa? ( số tour: {tourcheckeds.length}) </p>
                            <div style={{ marginTop: 30, display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Button style={{ marginRight: 20, width: 140 }} variant='warning' onClick={() => setIsDeletePopup(false)}>OK</Button>
                            </div>
                        </div>
                    </PopupNote>
            }




        </div >
    )
}
