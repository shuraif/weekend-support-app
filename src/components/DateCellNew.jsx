import React from 'react';

const DateCell = ({ 
  day, 
  currentDate, 
  assignments, 
  swapMode, 
  selectedDate, 
  handleDateClick 
}) => {
  const isWeekend = (date) => {
    return date.getDay() === 0 || date.getDay() === 6;
  };

  const isCurrentMonth = (date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const dateKey = formatDate(day);
  console.log('DateCell rendered for:', dateKey);
  const assignment = assignments[dateKey];
  const isWeekendDay = isWeekend(day);
  const isCurrentMonthDay = isCurrentMonth(day);
  const isSelected = selectedDate === dateKey;

  return (
    <div
      onClick={() => handleDateClick(day)}
      className={`
        min-h-16 p-2 border rounded cursor-pointer transition-colors
        ${!isCurrentMonthDay ? 'text-gray-400 bg-gray-50' : 'text-gray-900'}
        ${isWeekendDay && isCurrentMonthDay ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}
        ${isSelected ? 'ring-2 ring-blue-500 bg-blue-100' : ''}
        ${swapMode && isWeekendDay && isCurrentMonthDay ? 'hover:bg-blue-100' : ''}
      `}
    >
      <div className="font-medium">{day.getDate()}</div>
      {isWeekendDay && isCurrentMonthDay && assignment && (
        <div className="text-xs mt-1 p-1 bg-blue-600 text-white rounded text-center">
          {assignment.name}
        </div>
      )}
    </div>
  );
};

export default DateCell;