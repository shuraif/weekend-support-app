import { CalendarSync, RefreshCw, Settings, Trash2 } from 'lucide-react';
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { swapAssigneeApi, deleteSchedulesApi, getScheduleApi, getActivityLogsApi } from '../redux/Actions'
import { updateSwapInfo, updateDeleteInfo } from '../redux/appSlice';
import { Button } from "@/components/ui/button";

const ScheduleManagement = ({  }) => {
  const dispatch = useAppDispatch();
  const schedules = useSelector((state : any) => state.easyquiz.schedule);
  const isLoading = useSelector((state: any) => state.easyquiz.loading);
  const swapInfo = useSelector((state: any) => state.easyquiz.swapInfo);
  const deleteInfo = useSelector((state: any) => state.easyquiz.deleteInfo);


  const handleCheckboxChange = (value: string) => {
    dispatch(updateSwapInfo({
      swapTypes: swapInfo.swapTypes.includes(value) ? swapInfo.swapTypes.filter((item: string) => item !== value) : [...swapInfo.swapTypes, value]
    }));
    
  };


  const handleSwap = () => {
    if(!swapInfo.selectedDate || !swapInfo.swapWithDate) {
      alert('Please select two dates to swap.');
      return;
    }

    if(!swapInfo.swapTypes || swapInfo.swapTypes.length === 0) {
      alert('Please select at least one support type to swap.');
      return;
    }
    if (swapInfo.selectedDate && swapInfo.swapWithDate) {
      dispatch(swapAssigneeApi({
        datesToSwap: [swapInfo.selectedDate, swapInfo.swapWithDate],
        supportTypes: swapInfo.swapTypes
        })).then(() => {
          dispatch(getScheduleApi());
          dispatch(getActivityLogsApi());
        })
    }
  }

  const handleDelete = () => {
    if (deleteInfo.selectedDates.length > 0) {
      dispatch(deleteSchedulesApi(deleteInfo.selectedDates))
        .then(() => {
          dispatch(getScheduleApi())
          dispatch(updateDeleteInfo({ deleteMode: false, selectedDates: [] }));
          dispatch(getActivityLogsApi());
        });
    } else {
      alert('Please select dates to delete.');
    }
  };

  return (
    <div className="lg:col-span-1">
      
      
      <div className="bg-white rounded-lg shadow-sm p-6 ">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-4">
          <Settings className="text-blue-600" />
          Actions
        </h2>


      <div className=" rounded-md grid grid-cols-2 gap-4 h-18">
        <div className="flex items-center justify-center"  onClick={() => {
              dispatch(updateSwapInfo({ swapMode: !swapInfo.swapMode, selectedDate: null, swapWithDate: null }));
            }}>
          <div className={`w-20 h-20 rounded-full flex flex-col items-center justify-center ${
              swapInfo.swapMode
                ? 'bg-red-100 text-white hover:bg-red-200'
                : 'bg-green-100 text-black hover:bg-green-200'
            }`}>
            <CalendarSync className={`h-6 w-6 ${swapInfo.swapMode ? 'text-red-600' : 'text-green-600'}`} />
            <span className={`text-xs  mt-1 ${swapInfo.swapMode ? 'text-red-600' : 'text-green-600'}`}> {swapInfo.swapMode ? 'Cancel' : 'Swap'} </span>
          </div>
        </div>
        <div className="flex items-center justify-center"  onClick={() => {
              dispatch(updateDeleteInfo({ deleteMode: !deleteInfo.deleteMode, selectedDates: [] }));
            }}>
          <div className={`w-20 h-20 rounded-full flex flex-col items-center justify-center ${
              deleteInfo.deleteMode
                ? 'bg-red-100 text-white hover:bg-red-200'
                : 'bg-blue-100 text-black hover:bg-blue-200'
            }`}>
            <Trash2 className={`h-6 w-6 ${deleteInfo.deleteMode ? 'text-red-600' : 'text-blue-600'}`} />
            <span className={`text-xs  mt-1 ${deleteInfo.deleteMode ? 'text-red-600' : 'text-blue-600'}`}> {deleteInfo.deleteMode ? 'Cancel' : 'Delete'} </span>
          </div>
        </div>
      </div>

        

        
        {swapInfo.swapMode && (
          <>
           <div role="group" className="flex gap-4 mt-4 items-center justify-center gap-2">
      {[{ value: "primary", label: "Primary" }, { value: "secondary", label: "Secondary" }].map((option) => (
        <label key={option.value} className="flex items-center gap-2">
          <input
            type="checkbox"
            value={option.value}
            checked={swapInfo.swapTypes.includes(option.value)}
            onChange={() => handleCheckboxChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-800">
              {!swapInfo.selectedDate
                ? 'Click on a weekend date to select it for swapping'
                : `Selected  ${swapInfo.selectedDate}.`}
            </p>
            <p className="text-sm text-yellow-800">
              {!swapInfo.swapWithDate
                ? ''
                : `Swapping with  ${swapInfo.swapWithDate}.`}
            </p>
          </div>
          </>
        )}

      {
          swapInfo.swapMode && swapInfo.selectedDate && swapInfo.swapWithDate && (
             <Button
          onClick={() => {
            handleSwap();
          }}
          disabled={isLoading}
          className="w-full mt-2 px-4 py-6 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center justify-center gap-2"
        >
          <RefreshCw size={16} className={schedules.isLoading ? 'animate-spin' : ''} />
          Confirm Swap
        </Button>

          )
        }

              {
          deleteInfo.deleteMode && (
             <Button
          onClick={() => {
            handleDelete();
          }}
          disabled={isLoading}
          className="w-full mt-4 px-4 py-6 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center justify-center gap-2"
        >
          {/* <RefreshCw size={16} className={schedules.isLoading ? 'animate-spin' : ''} /> */}
          Confirm Delete
        </Button>

          )
        }
        
       
        {/* API Data Status */}
        {/* {schedules && schedules.list && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-green-800">
              ✅ Schedule loaded successfully
              <span className="block text-xs mt-1">
                {schedules.list.length} weekend assignments loaded
              </span>
            </p>
          </div>
        )}  */}
      </div>
    </div>
  );
};

export default ScheduleManagement;