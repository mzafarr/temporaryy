
import { createSlice } from '@reduxjs/toolkit';
import { resumePoints } from './resumePointsThunk';

interface InitialState {
    resumepoints: any;
    loadingPoints: boolean ;
    errorPoints: any ;

}
const initialState: InitialState = {
    resumepoints: {},
    loadingPoints: false,
    errorPoints: null,
  };

const resumePointSlice = createSlice({
  name: 'resumesPoints',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resumePoints.pending, (state) => {
        state.loadingPoints = true;
        state.errorPoints = null;
      })
      .addCase(resumePoints.fulfilled, (state, action) => {
        state.loadingPoints = false;
        state.resumepoints = action.payload;
      })
      .addCase(resumePoints.rejected, (state, action) => {
        state.loadingPoints = false;
        state.errorPoints = action.payload;
      });
  },
});

export default resumePointSlice.reducer;
