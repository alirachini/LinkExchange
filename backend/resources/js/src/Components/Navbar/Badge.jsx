import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'
import './Badge.css'
const Badge = ({userid}) => {
    useEffect(()=>{
        badgecount(userid)//put user instead of the number
    })
    const [badge,setbadge]=useState('');
    const badgecount = async (userid) =>{
        console.log(userid)
            const response = await axios.get(`http://localhost:8000/api/receivedcount/${userid}`)//put ${id} instead of 1
            setbadge(response.data)
    }
  return (
    <>
    <div className='badge'>
        {badge}
    </div>
    </>
  )
}

export default Badge