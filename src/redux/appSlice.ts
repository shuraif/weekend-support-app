import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  signupUserApi,
  loginUserApi,
  getScheduleApi,
  getTeamApi,
  swapAssigneeApi,
  getActivityLogsApi,
  getAssigneeReportApi

} from '@/redux/Actions';

interface AppState {
  loginDetails: {
    isLoading: boolean;
    isLoggedIn: boolean;
    isError: boolean;
    errorMessage: string | undefined;
    user: {
      userId: number;
      userName: string;
      email: string | undefined;
      password: string|undefined;
      profilPic: string | undefined;
      userType: string | undefined;
    } | undefined
  }
  
  schedule: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string | undefined;
    list: any[]; // Adjust type as needed
  },
  team: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string | undefined;
    list: any[]; // Adjust type as needed
  },
  swapInfo: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string | undefined;
    swapMode: boolean;
    swapTypes: string[];
    selectedDate: string | null;
    swapWithDate: string | null;
  },
  deleteInfo: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string | undefined;
    deleteMode: boolean;
    selectedDates: string[];
  },
  activityLogs: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string | undefined;
    list: any[]; 
  },
  assigneeReport: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string | undefined;
    list: any[]; 
  }
}

const initialState: AppState = {
  loginDetails: {
    isLoading: false,
    isLoggedIn: false,
    isError: false,
    errorMessage: undefined,
    user: undefined
  },
  schedule: {
    isLoading: false,
    isError: false,
    errorMessage: undefined,
    list: []
  },
  team: {
    isLoading: false,
    isError: false,
    errorMessage: undefined,
    list: []
  },
  swapInfo: {
    isLoading: false,
    isError: false,
    errorMessage: undefined,
    swapMode: false,
    swapTypes: [],
    selectedDate: null,
    swapWithDate: null
  },
  deleteInfo: {
    isLoading: false,
    isError: false,
    errorMessage: undefined,
    deleteMode: false,
    selectedDates: []
  },
  activityLogs: {
    isLoading: false,
    isError: false,
    errorMessage: undefined,
    list: []
  },
  assigneeReport: {
    isLoading: false,
    isError: false,
    errorMessage: undefined,
    list: []
  }
};

const appSlice = createSlice({
  name: "eazyquiz",
  initialState,
  reducers: {


    logout: (state) => {
      state.loginDetails.user = undefined;
      state.loginDetails.isLoggedIn = false;
      state.loginDetails.isLoading = false;
    },
    clearLoginError: (state) => {
      state.loginDetails.isError = false;
      state.loginDetails.errorMessage = undefined;
    },

    updateSwapInfo: (state, action) => {
          state.swapInfo = {
            ...state.swapInfo,
            ...action.payload
          };
          state.deleteInfo.deleteMode = false;
          console.log("Swap info updated:", state.swapInfo);
    },

    updateDeleteInfo: (state, action) => {
      state.deleteInfo = {
        ...state.deleteInfo,
        ...action.payload
      };
      state.swapInfo.swapMode = false;
      console.log("Delete info updated:", state.deleteInfo);
    }

  
  },
  extraReducers: (builder) => {
    builder

   .addCase(signupUserApi.pending, (state) => {
      state.loginDetails.isLoading = true;
    })
    .addCase(signupUserApi.fulfilled, (state, { payload }) => {
      state.loginDetails.isLoading = false;
      state.loginDetails.isLoggedIn = true;
      state.loginDetails.user = payload;
    })
    .addCase(signupUserApi.rejected, (state, action) => {
      console.log("Error in signupUserApi:", action.payload);
      state.loginDetails.isLoading = false;
      state.loginDetails.isError = true;
      state.loginDetails.errorMessage =
        (action.payload as any)?.message || "Something went wrong";
      state.loginDetails.user = undefined;
    })

    .addCase(loginUserApi.pending, (state) => {
      state.loginDetails.isLoading = true;
    })
    .addCase(loginUserApi.fulfilled, (state, { payload }) => {
      state.loginDetails.isLoading = false;
      state.loginDetails.isLoggedIn = true;
      state.loginDetails.user = payload;
    })
    .addCase(loginUserApi.rejected, (state, action) => {
      state.loginDetails.isLoading = false;
      state.loginDetails.isError = true;
      state.loginDetails.errorMessage =
        (action.payload as any)?.message || "Something went wrong";
      state.loginDetails.user = undefined;
    })

    .addCase(getScheduleApi.pending, (state) => {
      state.schedule.isLoading = true;
      state.schedule.isError = false;
      state.schedule.errorMessage = undefined;
    })
    .addCase(getScheduleApi.fulfilled, (state, { payload }) => {
      state.schedule.isLoading = false;
      state.schedule.list = payload;
    })
    .addCase(getScheduleApi.rejected, (state, action) => {
      state.schedule.isLoading = false;
      state.schedule.isError = true;
      state.schedule.errorMessage =
        (action.payload as any)?.message || "Something went wrong";
    })

    .addCase(getTeamApi.pending, (state) => {
      state.team.isLoading = true;
      state.team.isError = false;
      state.team.errorMessage = undefined;
      state.team.list = [];
    })
    .addCase(getTeamApi.fulfilled, (state, { payload }) => {
      state.team.isLoading = false;
      state.team.list = payload;
    })
    .addCase(getTeamApi.rejected, (state, action) => {
      state.team.isLoading = false;
      state.team.isError = true;
      state.team.errorMessage =
        (action.payload as any)?.message || "Something went wrong";
    })

    .addCase(swapAssigneeApi.pending, (state) => {
      state.schedule.isLoading = true;
      state.schedule.isError = false;
      state.schedule.errorMessage = undefined;
    })
    .addCase(swapAssigneeApi.fulfilled, (state, { payload }) => {
      state.schedule.isLoading = false;
      // Assuming payload contains the updated schedule after swap
      // state.schedule.list = state.schedule.list.map((item) =>
      //   item.date === payload.date ? payload : item
      // );
      //state.schedule.list = payload; // Update with the new schedule after swap
      state.swapInfo.swapMode = false; // Reset swap mode after successful swap
      state.swapInfo.selectedDate = null; // Reset selected date after swap
      state.swapInfo.swapWithDate = null; // Reset swap with date after swap
      state.swapInfo.swapTypes = []; // Reset swap types after swap
      console.log("Swap successful:", payload);
    })  
    .addCase(swapAssigneeApi.rejected, (state, action) => {
      state.schedule.isLoading = false;
      state.schedule.isError = true;
      state.schedule.errorMessage =
        (action.payload as any)?.message || "Something went wrong";
    })

    .addCase(getActivityLogsApi.pending, (state) => {
      state.activityLogs.isLoading = true;
      state.activityLogs.isError = false;
      state.activityLogs.errorMessage = undefined;
      state.activityLogs.list = [];
    })
    .addCase(getActivityLogsApi.fulfilled, (state, { payload }) => {
      state.activityLogs.isLoading = false;
      state.activityLogs.list = payload;
    })
    .addCase(getActivityLogsApi.rejected, (state, action) => {
      state.activityLogs.isLoading = false;
      state.activityLogs.isError = true;
      state.activityLogs.errorMessage =
        (action.payload as any)?.message || "Something went wrong";
    })

    .addCase(getAssigneeReportApi.pending, (state) => {
      state.assigneeReport.isLoading = true;
      state.assigneeReport.isError = false;
      state.assigneeReport.errorMessage = undefined;
      state.assigneeReport.list = [];
    })
    .addCase(getAssigneeReportApi.fulfilled, (state, { payload }) => {
      state.assigneeReport.isLoading = false;
      state.assigneeReport.list = payload;
    })
    .addCase(getAssigneeReportApi.rejected, (state, action) => {   
      state.assigneeReport.isLoading = false;
      state.assigneeReport.isError = true;
      state.assigneeReport.errorMessage =
        (action.payload as any)?.message || "Something went wrong";
    })
  
  }
});

export const { logout, clearLoginError, updateSwapInfo, updateDeleteInfo } =
  appSlice.actions;
export default appSlice.reducer;
