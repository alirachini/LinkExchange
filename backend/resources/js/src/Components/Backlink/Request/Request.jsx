import React from 'react'
import Footer from '../../Footer/Footer'
import Navbar from '../../Navbar/Navbar'
import RequestCard from './RequestCard'

const Request = ({auth, token,  }) => {
  document.title = "Backlink Request | LES";
  return (
    <div>
        <Navbar userid={auth.user.id} />
        <RequestCard auth={auth} token={token} />
        <Footer />
    </div>
  )
}

export default Request