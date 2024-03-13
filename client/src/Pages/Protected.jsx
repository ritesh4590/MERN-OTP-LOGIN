import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Protected = ({ Component }) => {
  // const { Component } = props
  const navigate = useNavigate()

  useEffect(() => {
    const login = localStorage.getItem("token")
    console.log("Protecte")
    if (!login) {
      navigate("/login")
    }
  }, [])

  return (
    <>
      <Component />
    </>
  )
}

export default Protected