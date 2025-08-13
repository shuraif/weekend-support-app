import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { getScheduleApi } from './../redux/Actions';
import TeamManagement from '../components/TeamManagement'
import ScheduleManagement from '../components/ScheduleManagement';
import CalendarLayout from '../components/CalendarLayout';

const WeekendSupportManager = () => {
  const dispatch = useDispatch();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [swapMode, setSwapMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [swapWithDate, setSwapWithDate] = useState(null);


  // Load assignments from API on component mount
  useEffect(() => {
    console.log('Loading assignments from API...');
    dispatch(getScheduleApi());
  }, []);


  const refreshSchedule = () => {
    dispatch(getScheduleApi());
  };

  return (
   
     
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 ">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <CalendarLayout
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
            />
          </div>
           <div className="lg:col-span-1">
            <ScheduleManagement/>
          <TeamManagement/>
          
           </div>
          
     
     
    </div>
  );
};

export default WeekendSupportManager;