// features/diary/diarySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDiaryById = createAsyncThunk(
  'diary/fetchDiaryById',
  async (diaryId, { rejectWithValue, getState }) => {
    // 토큰을 스토어 또는 어딘가에서 가져옵니다. 예를 들어 Redux 스토어에서 가져올 수 있습니다.
    // const token = getState().auth.token; // 스토어 구조에 따라 경로가 달라질 수 있습니다.
    const token= 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1IiwiaWF0IjoxNzE0NTAwNjkyLCJleHAiOjE3MTQ1MDQyOTJ9.umPKbnlACygO1oUKInMZ1WFWpCLP4dMp0xbTahwUPsq3IWKZULbTfCgKrhw5dyWCiUOUQbQryBx00egDfZYn2Q';

    try {
      const response = await fetch(`http://carvedrem.kro.kr:8080/api/diary/${diaryId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // 인증 토큰을 헤더에 추가
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      // 서버 응답이 2xx 범위가 아니면 오류를 발생시킴
      const errorData = await response.json();
      throw new Error(errorData.message || 'Server error!');
    }
      return await response.json();
    } catch (error) {
      // 오류 처리: 오류 메시지를 포함하여 액션을 거부합니다.
      return rejectWithValue(error.message);
    }
  }
);

const diarySlice = createSlice({
  name: 'diary',
  initialState: {
    diary: null,
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiaryById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDiaryById.fulfilled, (state, action) => {
        state.diary = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchDiaryById.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export default diarySlice.reducer;
