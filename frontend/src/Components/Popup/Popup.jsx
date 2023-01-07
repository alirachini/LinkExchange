import React from 'react'
import './Popup.css'
import {MdClose} from 'react-icons/md'

function Popup(props) {
    return ( props.trigger )? (
        <div className='popup'>
            <div className='popup_inner'>
                <MdClose onClick={()=>{props.setTrigger(false)}} className='popup_close' size='1.5rem'/>
                {props.children}
            </div>
        </div>
    ) : ""
}

export default Popup;