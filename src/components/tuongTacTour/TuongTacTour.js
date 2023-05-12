import React, { useState } from 'react'
import { Accordion } from 'react-bootstrap'

export default function TuongTacTour(props) {
    const [itemTT, setItemTT] = useState(props.tuongTac)
    return (
        <div>
            <h1>Danh sách tương tác</h1>
            <p style={{ color: 'black' }}> Tour Id: {props.tuongTac.document_id}</p>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header style={{ backgroundColor: 'gray' }}> Lượt thich:</Accordion.Header>
                    <Accordion.Body>
                        {
                            itemTT.userDaThich.map((item) => {
                                return <div>
                                    <p>{item}</p>
                                </div>
                            })
                        }
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Thêm kế hoạch:</Accordion.Header>
                    <Accordion.Body>

                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Đặt tour:</Accordion.Header>
                    <Accordion.Body>

                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}
