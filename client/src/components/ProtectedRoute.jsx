import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function ProtectedRoute({children}) {
  const navigator = useNavigate()
  const {isAuthenticated, screenLoading} =  useSelector((state) => state.user)
  //  console.log(screenLoading ,isAuthenticated)
  useEffect(()=>{
    if(!screenLoading && !isAuthenticated) navigator('/login')
  },[screenLoading ,isAuthenticated])

  return (
    children
  )
}

export default ProtectedRoute
