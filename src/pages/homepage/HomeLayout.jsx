import React from 'react'
import Topbar from '../../components/topbar/Topbar'
import { Outlet } from 'react-router-dom'

export default function HomeLayout() {
  return (
    <>
        <Topbar/>
        <Outlet/>
    </>
  )
}
