
import { createSlice } from '@reduxjs/toolkit';
import { fetchResumes } from './GetResumeListThunk';

const initialState = {
  resumes: [],
  loading: false,
  error: null,
};

const resumeSlice = createSlice({
  name: 'resumes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResumes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResumes.fulfilled, (state, action) => {
        state.loading = false;
        state.resumes = action.payload;
      })
      .addCase(fetchResumes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default resumeSlice.reducer;
