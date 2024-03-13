import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import '../App.css'
import { generateOTP, verifyOTP } from '../redux/features/AuthSlice'

const Authentication = () => {
    const [phoneNo, setPhoneNo] = useState('')
    const [otp, setOtp] = useState('')
    const [otpSent, setOtpSent] = useState(false)
    const [resendOTPCounter, setResendOTPCounter] = useState(30)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const sentOTP = async (e) => {
        e.preventDefault()
        console.log("PhoneNo:", phoneNo)
        const otpDispatch = await dispatch(generateOTP(phoneNo))
        console.log("otpDispatch:", otpDispatch)
        if (otpDispatch.payload.data.success) {
            setOtpSent(true)
        }
    }

    const verifyOtp = async (e) => {
        e.preventDefault()
        console.log("verifyOtp:")
        const verifyOTPDspatch = await dispatch(verifyOTP({ phoneNo, otp }))
        console.log("verifyOTPDspatch:", verifyOTPDspatch.payload.success)
        if (verifyOTPDspatch.payload.success) {
            navigate("/")
        }
    }

    useEffect(() => {
        const login = localStorage.getItem("token")
        if (login) {
            navigate("/")
        }
    }, [])

    // useEffect(() => {
    //   const handleResendOTPCounter =
    //     setInterval(() => {
    //       setResendOTPCounter(prevCount => prevCount - 1)
    //     }, 1000)
    //   const stopTimeout = setTimeout(() => {
    //     clearInterval(handleResendOTPCounter); // Clear the interval
    //   }, 31000);
    //   return () => {
    //     clearInterval(handleResendOTPCounter)
    //     clearTimeout(stopTimeout)
    //   }
    // }, [])

    return (
        <>
            <h2>Login With OTP</h2>
            <h2>9140091671</h2>
            <input type="text" placeholder='Phone No' value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
            <br />
            {otpSent ?
                <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                :
                ""
            }
            <br />
            <p className='resendOTPCounter'>{resendOTPCounter}</p>
            <p className='resentOTP' >
                {resendOTPCounter === 0 ? "Resend OTP" : ""}
            </p>
            <button onClick={otpSent ? verifyOtp : sentOTP}>
                {otpSent ? "Verify" : "Send OTP"}
            </button>
        </>
    )
}

export default Authentication
