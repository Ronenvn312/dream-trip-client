import React, { useEffect, useState } from 'react'
import clsx from "clsx"
import "./popupTuongTac.css"
import { motion } from "framer-motion"
import axios from 'axios'
import { parsePath } from 'react-router-dom'
import { Accordion } from 'react-bootstrap'

function PopupTuongTac(props) {
   
  
    // useEffect(() => {
    //     if(tuongTac.document_id == null) {
    //         handleGetAllTuongTac()
    //     }
    // }, [tuongTac])
    const [itemTT, setItemTT] = useState(props.tuongTac)
    return (props.trigger) ? (
        <div className='popup_container'>
            <motion.div animate={{ scale: 1 }} initial={{ scale: 0 }} className={clsx("popup-inner", {
                "popup-inner_user": props.showInfoUserPopup,
                "popup-inner_add_user": props.addUserPopup
            })}>

                {props.children}

            </motion.div>
        </div>
    ) : ""
}

export default PopupTuongTac