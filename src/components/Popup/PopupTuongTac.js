import React from 'react'
import clsx from "clsx"
import "./popupTuongTac.css"
import { motion } from "framer-motion"
function PopupTuongTac(props) {
   
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