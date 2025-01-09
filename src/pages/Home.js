import React, { useEffect } from 'react'
import { withRootLayout } from '../hoc/withRootLayout'
import { useNavigate } from 'react-router-dom'


const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/projects")
    },[])
  return (
    <></>
  )
}

export default withRootLayout(Home)