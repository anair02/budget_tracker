import React from 'react'
import Sidebar from '../components/Sidebar'
import '../css/homePage.css'
import { Outlet } from 'react-router-dom'
const HomePage = () => {
  return (
    <div className='homePageContainer'>
      <Sidebar/>
      <Outlet/>
    </div>
  )
}

export default HomePage