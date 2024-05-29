
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const fetchResumes = createAsyncThunk<
  { _id: string; resumeFileName: string; updatedAt: string }[],
  string, 
  { state: RootState }
>(
  'resumes/fetchResumes',
  async (email, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/resume/getResumeList?email=${email}`);
      const data = await response.json();
      if (response.ok) {
        return data.resumesWithoutContent;
      } else {
        return rejectWithValue(data.error);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
