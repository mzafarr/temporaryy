import { createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
// import { axiosInstance } from "@/utils/axios";

// Define the shape of the payload and response data for better type safety
interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  status_code: number;
  details?: string;
  [key: string]: any; // For any other properties that might be in the response
}

interface LoginError {
  data?: {
    details?: string;
  };
  error?: string;
}

export const loginUser = createAsyncThunk(
  "user/signin",async (
    {
      payload,
      onSuccess,
      onError,
    }: { payload: LoginPayload; onSuccess: () => void; onError: (error: string) => void },
    thunkAPI
  ) => {
    try {
      const { data } = await axios.post<LoginResponse>("/api/signin", payload);
      console.log("response",data)
      if (data?.status=== 200) {
        onSuccess();
        return data;
      } else {
        // toast.warning(data.details || "Login failed");
        onError(data.details || "Unknown error");
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      const error = err as AxiosError<LoginError>;
      const errorMessage =  "Something went wrong";
      onError(error.response?.data?.error);
      return thunkAPI.rejectWithValue(error.response?.data?.error || errorMessage);
    }
  }
);
