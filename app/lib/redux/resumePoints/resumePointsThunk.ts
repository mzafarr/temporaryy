

import { createAsyncThunk } from '@reduxjs/toolkit';


export const resumePoints = createAsyncThunk<
  { _id: string; resumeFileName: number; updatedAt: string }[],
  string, 
  { state: any }
>(
  'resumePoints',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/resumepoints?userId=${id}`);
      const data = await response.json();
      console.log("Response From API",data.points)
      if (response.ok) {
        return data;
      } else {
        return rejectWithValue(data.error);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
