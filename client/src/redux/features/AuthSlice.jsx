import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  isLoading: false,
  data: '',
  isError: ""
}

export const generateOTP = createAsyncThunk("generateOTP", async (phoneNo) => {
  console.log("Phone no:", phoneNo)
  try {
    const responseOTP = await axios.post("http://localhost:8000/api/v1/generateOTP", { phoneNo })
    console.log("response:", responseOTP)
    return responseOTP
  } catch (error) {
    console.log("Generate action Error:", error.response.data.message);
    throw error.response.data.message
  }
})


export const verifyOTP = createAsyncThunk("verifyOTP", async ({ phoneNo, otp }) => {
  console.log("Phone no:", phoneNo)
  console.log("OTP:", otp)
  try {
    const verifyOTPparam = {
      phoneNo, otp
    }
    console.log("verifyOTPparam:", verifyOTPparam)
    const { data } = await axios.post("http://localhost:8000/api/v1/verifyOTP", verifyOTPparam)
    console.log("responsVerifyeOTP:", data)
    return data
  } catch (error) {
    console.log("Generate action Error:", error.response.data.message);
    throw error.response.data.message
  }
})

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(generateOTP.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(generateOTP.fulfilled, (state, action) => {
      state.isLoading = false,
        state.data = action.payload
      console.log("action payload:", action.payload)
    })
    builder.addCase(generateOTP.rejected, (state, action) => {
      state.isLoading = true
      state.isError = action.error.message

    })
    builder.addCase(verifyOTP.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(verifyOTP.fulfilled, (state, action) => {
      state.isLoading = false,
        state.data = action.payload
      localStorage.setItem("token", action.payload.userExist.verifyToken)
      console.log("action payload:", action.payload)
    })
    builder.addCase(verifyOTP.rejected, (state, action) => {
      state.isLoading = true
      state.isError = action.error.message

    })

  }
}
)

export default AuthSlice.reducer