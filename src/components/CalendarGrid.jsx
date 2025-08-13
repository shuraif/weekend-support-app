import React from 'react';
import DateCell from './DateCell';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { updateSwapInfo } from '../redux/appSlice';
import { useDispatch } from 'react-redux';

const CalendarGrid = ({ 
  currentDate, 
}) => {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const schedules = useSelector((state) => state.easyquiz.schedule);
  const swapInfo = useSelector((state) => state.easyquiz.swapInfo);
  const dispatch = useDispatch();

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const handleDateClick = (date) => {

    console.log(`Clicked date: ${date}`);
    if (!isWeekend(date) || !isCurrentMonth(date)) return;
    
    const dateKey = formatDate(date);
    
    if (swapInfo.swapMode) {
      if (!swapInfo.selectedDate) {
        dispatch(updateSwapInfo({ selectedDate: dateKey }));
       // setSelectedDate(dateKey);
      } else if (swapInfo.selectedDate === dateKey) {
        dispatch(updateSwapInfo({ selectedDate: null }));
       // setSelectedDate(null);
      } else {
        dispatch(updateSwapInfo({ swapWithDate: dateKey }));
       // setSwapWithDate(dateKey);
      }
    }
  };

  const isWeekend = (date) => {
    return date.getDay() === 6 || date.getDay() === 0; // Only Saturday represents the weekend assignment
  };

  const isCurrentMonth = (date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const formatDate = (date) => {
    return format(date, 'yyyy-MM-dd');
  };

  return (
    <div className="grid grid-cols-7 gap-1">
      {/* Day Headers */}
      {dayNames.map((day) => (
        <div key={day} className="p-2 text-center font-medium text-gray-600 bg-gray-100 rounded">
          {day}
        </div>
      ))}

      {/* Calendar Days */}
      {getDaysInMonth().map((day, index) => (
        <DateCell
          key={index}
          day={day}
          currentDate={currentDate}
          assignments={schedules!=undefined ? schedules?.list : {}}
          handleDateClick={handleDateClick}
        />
      ))}



       {/* {
        schedules.list.map((schedule, index) => {
         
          return (
            <DateCell
              key={index}
              day={schedule.date}
              currentDate={currentDate}
              assignment={assignments[schedule.date] || null}
              swapMode={swapMode}
              selectedDate={selectedDate}
              handleDateClick={handleDateClick}
            />
          );
        })
      } */}
    </div>
  );
};

export default CalendarGrid;