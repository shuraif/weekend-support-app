import React, { useState } from 'react';
import { RefreshCw, Settings } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux'
import { swapAssigneeApi } from '../redux/Actions'
import { updateSwapInfo } from '../redux/appSlice';
import { Button } from "@/components/ui/button";

const ScheduleManagement = ({  }) => {
  const dispatch = useDispatch();
  const schedules = useSelector((state) => state.easyquiz.schedule);
  const isLoading = useSelector((state) => state.easyquiz.loading);
  const team = useSelector((state) => state.easyquiz.team);
  const swapInfo = useSelector((state) => state.easyquiz.swapInfo);


  const handleCheckboxChange = (value) => {
    dispatch(updateSwapInfo({
      swapTypes: swapInfo.swapTypes.includes(value) ? swapInfo.swapTypes.filter(item => item !== value) : [...swapInfo.swapTypes, value]
    }));
    
  };


  const handleSwap = () => {
    if (swapInfo.selectedDate && swapInfo.swapWithDate) {
      console.log(`Swapping ${swapInfo.selectedDate} with ${swapInfo.swapWithDate} for ${swapInfo.supportTypes} assignment`);
      dispatch(swapAssigneeApi({
        datesToSwap: [swapInfo.selectedDate, swapInfo.swapWithDate],
        supportTypes: swapInfo.swapTypes
      }))
      
    }
  }

  return (
    <div className="lg:col-span-1">
      
      
      <div className="bg-white rounded-lg shadow-sm p-6 ">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-4">
          <Settings className="text-blue-600" />
          Actions
        </h2>

        {/* Swap Mode Toggle */}
        {team.list.length > 0 && (
          <button
            onClick={() => {
              dispatch(updateSwapInfo({ swapMode: !swapInfo.swapMode, selectedDate: null, swapWithDate: null }));
            }}
            className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center gap-2 ${
              swapInfo.swapMode
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
          
            {swapInfo.swapMode ? 'Cancel' : 'Swap Assignee'}
          </button>
        )}

        

        
        {swapInfo.swapMode && (
          <>
           <div role="group" className="flex gap-4 mt-4">
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
          swapInfo.selectedDate && swapInfo.swapWithDate && (
             <Button
          onClick={() => {
            handleSwap();
          }}
          disabled={isLoading}
          className="w-full mt-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center justify-center gap-2"
        >
          <RefreshCw size={16} className={schedules.isLoading ? 'animate-spin' : ''} />
          Proceed
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