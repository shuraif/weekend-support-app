export interface AppState {
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