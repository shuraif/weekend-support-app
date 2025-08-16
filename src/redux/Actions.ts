import {createAsyncThunk} from '@reduxjs/toolkit';
import ApiService from '@/services/ApiService';


export const signupUserApi = createAsyncThunk(
  'user/signupUserApi',
  async (signupRequest: any, {rejectWithValue}) => {
    try {
      const response = await ApiService.post('/weekend-support/signup', signupRequest, false);
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
      const response = await ApiService.post('/weekend-support/signin', loginRequest, false);
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
    try {
      const response = await ApiService.get(`/weekend-support/fetch-schedule`,false);
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
    try {
      const response = await ApiService.get(`/weekend-support/team`,false);
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
      const response = await ApiService.post('/weekend-support/swap-assignee', swapRequest, false);
      return response.data;
    } catch (error: any) {
      console.log('error', error.response?.data?.message);
      return rejectWithValue(
        error.response?.data || {message: 'An unknown error occurred'},
      );
    }
  }
);


export const addAssignee = createAsyncThunk(
  'user/addAssignee',
  async (addAssigneeRequest: any, {rejectWithValue}) => {
    try {
      const response = await ApiService.post('/weekend-support/add-assignee', addAssigneeRequest, false);
      return response.data;
    } catch (error: any) {
      console.log('error', error.response?.data?.message);
      return rejectWithValue(
        error.response?.data || {message: 'An unknown error occurred'},
      );
    }
  }
);

export const deleteSchedulesApi = createAsyncThunk(
  'user/deleteSchedules',
  async (deleteSchedulesRequest: any, {rejectWithValue}) => {
    try {
      const response = await ApiService.delete('/weekend-support/delete-schedules', deleteSchedulesRequest, false);
      return response.data;
    } catch (error: any) {
      console.log('error', error.response?.data?.message);
      return rejectWithValue(
        error.response?.data || {message: 'An unknown error occurred'},
      );
    }
  }
);


export const getActivityLogsApi = createAsyncThunk(
  '/weekend-support/activity-logs',
  async (
    _,
    { rejectWithValue }
  ) => {
    try {
      const response = await ApiService.get(`/weekend-support/activity-logs`,false);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { message: 'An unknown error occurred' }
      );
    }
  }
);


export const getAssigneeReportApi = createAsyncThunk(
  '/weekendsupport/assignee-report',
  async (
    _,
    { rejectWithValue }
  ) => {
    try {
      const response = await ApiService.get(`/weekend-support/assignee-report`,false);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { message: 'An unknown error occurred' }
      );
    }
  }
);