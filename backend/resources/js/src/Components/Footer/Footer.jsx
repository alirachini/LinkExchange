import React from 'react'
import "./Footer.css"
import { CgCopyright } from "react-icons/cg";


const Footer = () => {
  return (
    <footer>
     Link Exchange Software <CgCopyright /> {new Date().getFullYear()}
    </footer>

  )
}

export default Footer