import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import './screenThongKe.css'
import Chart from './ChartThongKe/Chart'
import axios from 'axios';
import { findByNam, findThongKeTheoThang } from '../../util/ApiRouter';
export default function ScreenThongKe() {
 
    const dsTour = localStorage.getItem("dsTour")
    const [listTour, setListTour] = useState([])
    const slTT = 100;
    const date = new Date();
    const handleShowListTour = () => {
        if (dsTour != null) {
            const list = JSON.parse(dsTour);
            setListTour(list)
        }
    }
    const [selectedThang, setSelectedThang] = useState(4);
    const [selectedNam, setSelectedNam] = useState(2023);
    const [selectedHieuQua, setSelectedHieuQua] = useState("tot nhat");
    const [listNam, setListNam] = useState([])
    const [listThang, setListThang] = useState([])
    const [listThongKe, setListThongKe] = useState([])
    const [data, setData] = useState([])
    const [tongTuongTac, setTongTuongTac] = useState(0)
    const [tongLuotThich, setTongLuotThich] = useState(0)
    const [tongDatTour, setTongDatTour] = useState(0)
    const handleSelectChangeNam = (event) => {
        setSelectedNam(event.target.value);
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
        const new_data = []
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
    useEffect(() => {
        handleShowListTour()
        handleSearchThongKe()
        if (listNam.length <= 0 || listThang.length <= 0) {
            handleValue()
        }

    }, [])
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

                        <a className="more" href="#">
                            View more <i className="m-icon-swapright m-icon-white"></i>
                        </a>
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
            <hr />
            {/* END DASHBOARD STATS */}
            <Form style={{ flexDirection: 'row', display: "flex", marginLeft: 40 }}>
                <Form.Group controlId="exampleForm.SelectCustom" style={{ flex: 0.11 }}>
                    <Form.Label style={{ color: "#fff"}}>Chọn tháng: </Form.Label>
                    <Form.Select value={selectedThang} onChange={handleSelectChangeThang}>
                        {
                            listThang.map((item) => {
                                return <option key={item} value={item}>Tháng {item}</option>
                            })
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="exampleForm.SelectCustom" style={{ flex: 0.11, marginLeft: 20 }}>
                    <Form.Label style={{ color: "#fff"}}>chọn năm: </Form.Label>
                    <Form.Select value={selectedNam} onChange={handleSelectChangeNam}>
                        {
                            listNam.map((item) => {
                                return <option value={item}>Năm {item}</option>
                            })
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="exampleForm.SelectCustom" style={{ flex: 0.11, marginLeft: 20 }}>
                    <Form.Label style={{ color: "#fff"}}>Hiệu quả: </Form.Label>
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
            <div className='thongke-content'>

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
                                <th> Lượt thêm kê hoạch</th>
                            </thead>
                            <tbody className='thongke-table-tbody'>
                                {

                                    listThongKe.map((item, index) => {
                                        return <tr style={{ height: 100 }} key={item.document_id} className='thongke-table-tbody-tr'>
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
            </div>
        </div>
    )
}
