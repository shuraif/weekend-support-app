import React from 'react';

const CalendarHeader = ({ currentDate, navigateMonth }) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-2xl font-semibold text-gray-900">
        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
      </h2>
      <div className="flex gap-2">
        <button
          onClick={() => navigateMonth(-1)}
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          ←
        </button>
        <button
          onClick={() => navigateMonth(1)}
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;