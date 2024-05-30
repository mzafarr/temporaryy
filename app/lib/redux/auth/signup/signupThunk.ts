import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  status_code: number;
  details?: string;
  [key: string]: any; 
}

interface RegisterError {
  data?: {
    details?: string;
  };
  error?: string;
}

export const registerUser = createAsyncThunk(
  "user/register",
  async (
    {
      payload,
      onSuccess,
      onError,
    }: { payload: RegisterPayload; onSuccess: () => void; onError: (error: string) => void },
    thunkAPI
  ) => {
    try {
      const { data } = await axios.post< RegisterResponse>("/api/signup", payload);
      if (data?.status=== 200) {
        onSuccess();
        console.log("response",data)
        return data;
      } else {
        onError(data.details || "Unknown error");
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      const error = err as AxiosError<RegisterError>;
      const errorMessage =  error.response?.data?.error;
      onError(errorMessage);
      return thunkAPI.rejectWithValue(error.response?.data?.error );
    }
  }
);
