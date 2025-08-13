import {createAsyncThunk} from '@reduxjs/toolkit';
import ApiService from '@/services/ApiService';


export const signupUserApi = createAsyncThunk(
  'user/signupUserApi',
  async (signupRequest: any, {rejectWithValue}) => {
    try {
      const response = await ApiService.post('/weekendsupport/signup', signupRequest, false);
      sessionStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error: any) {
      console.log('error', error.response?.data?.message);
      return rejectWithValue(
        error.response?.data || {message: 'An unknown error occurred'},
      );
    }
  }
);


export const loginUserApi = createAsyncThunk(
  'user/loginUserApi',
  async (loginRequest: any, {rejectWithValue}) => {
    try {
      const response = await ApiService.post('/weekendsupport/signin', loginRequest, false);
      sessionStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || {message: 'An unknown error occurred'},
      );
    }
  }
);



export const getScheduleApi = createAsyncThunk(
  '/weekendsupport/fetchSchedule',
  async (
    _,
    { rejectWithValue }
  ) => {
    console.log('Fetching schedule from API');
    try {
      const response = await ApiService.get(`/weekendsupport/fetchSchedule`,false);
      //console.log('response', JSON.stringify(response.data,null,2));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { message: 'An unknown error occurred' }
      );
    }
  }
);


export const getTeamApi = createAsyncThunk(
  '/weekendsupport/team',
  async (
    _,
    { rejectWithValue }
  ) => {
    console.log('Fetching team from API');
    try {
      const response = await ApiService.get(`/weekendsupport/team`,false);
      //console.log('response', JSON.stringify(response.data,null,2));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { message: 'An unknown error occurred' }
      );
    }
  }
);


export const swapAssigneeApi = createAsyncThunk(
  'user/swapAssignee',
  async (swapRequest: any, {rejectWithValue}) => {
    try {
      const response = await ApiService.post('/weekendsupport/swapassignee', swapRequest, false);
      return response.data;
    } catch (error: any) {
      console.log('error', error.response?.data?.message);
      return rejectWithValue(
        error.response?.data || {message: 'An unknown error occurred'},
      );
    }
  }
);
