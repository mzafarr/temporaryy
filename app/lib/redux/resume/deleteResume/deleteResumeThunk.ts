
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchResumes } from '../getResumeList/GetResumeListThunk';
import { RootState, AppDispatch } from '../../store';

export const deleteResume = createAsyncThunk<
  void, 
  { resumeId: string; session: any }, 
  { dispatch: AppDispatch }
>(
  'resumes/deleteResume',
  async ({ resumeId, session }, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`/api/resume/deleteResume?resumeId=${resumeId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        // Successfully deleted, fetch resumes again to update state
        if (session.user?.email) {
          dispatch(fetchResumes(session.user.email));
        }
      } else {
        return rejectWithValue(data.error);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
