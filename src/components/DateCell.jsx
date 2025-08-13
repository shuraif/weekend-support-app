import React from 'react';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';

const DateCell = ({ 
  day, 
  currentDate, 
  assignments, 
  handleDateClick,
}) => {
 
  //const dateKey = day.toISOString().split('T')[0];
  const dateKey = format(day, 'yyyy-MM-dd');
   //console.log(`Day: ${day} -  dateKey :${dateKey}`);
  const assignment = assignments[dateKey];
  const isWeekendDay = day.getDay() === 0 || day.getDay() === 6; // Only Saturday
  const isCurrentMonthDay = day.getMonth() === currentDate.getMonth();
  const swapInfo = useSelector((state) => state.easyquiz.swapInfo);
  const isSelected = swapInfo.selectedDate === dateKey || swapInfo.swapWithDate === dateKey;


  return (
    <div
      onClick={() => handleDateClick(day)}
      className={`
        min-h-30 p-2 border rounded cursor-pointer transition-colors
        ${!isCurrentMonthDay ? 'text-gray-400 bg-gray-50' : 'text-gray-900'}
        ${isWeekendDay && isCurrentMonthDay ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}
        ${isSelected ? 'ring-2 ring-blue-500 bg-blue-100' : ''}
        ${swapInfo.swapMode && isWeekendDay && isCurrentMonthDay ? 'hover:bg-blue-100' : ''}
      `}
    >
      <div className="font-medium">{day.getDate()}</div>
      {isWeekendDay && isCurrentMonthDay && assignment && (
        <div className="text-xs space-y-1 ">
          <div className={`bg-blue-600 text-white rounded text-center border-2 border-blue-600 
          ${assignment.primary.name===assignment.secondary.name ? 'bg-red-600 border-red-600' : ''}
          ${assignment.primary.team===assignment.secondary.team ? 'bg-red-600 border-red-600' : ''}
          `}>
            <div className="text-xs">Primary</div>
            <div className="truncate bg-blue-100  text-black">{assignment.primary?.name}</div>
          </div>
          <div className={`bg-green-600 text-white rounded text-center border-2 border-green-600
            ${assignment.primary.name===assignment.secondary.name ? 'bg-red-600 border-red-600' : ''}
            ${assignment.primary.team===assignment.secondary.team ? 'bg-red-600 border-red-600' : ''}
            `}>
            <div className="text-xs">Secondary</div>
            <div className="truncate bg-blue-100 text-black" >{assignment.secondary?.name}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateCell;