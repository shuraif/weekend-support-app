import DateCell from './DateCell';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { updateSwapInfo, updateDeleteInfo } from '../redux/appSlice';
import { useAppDispatch } from '@/hooks/use-app-dispatch';

interface CalendarGridProps {
  currentDate: Date;
}

const CalendarGrid = ({ 
  currentDate 
}:CalendarGridProps) => {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const schedules = useSelector((state:any) => state.easyquiz.schedule);
  const swapInfo = useSelector((state:any) => state.easyquiz.swapInfo);
  const deleteInfo = useSelector((state:any) => state.easyquiz.deleteInfo);
  const dispatch = useAppDispatch();

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
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

  const handleDateClick = (date : any) => {

    if ( !isCurrentMonth(date)) return;
    
    const dateKey = formatDate(date);
    
    if (swapInfo.swapMode) {
      if (!swapInfo.selectedDate) {
        dispatch(updateSwapInfo({ selectedDate: dateKey }));
      } else if (swapInfo.selectedDate === dateKey) {
        dispatch(updateSwapInfo({ selectedDate: null }));
      } else {
        dispatch(updateSwapInfo({ swapWithDate: dateKey }));
      }
    }

    if(deleteInfo.deleteMode) {
      if (deleteInfo.selectedDates.includes(dateKey)) {
        dispatch(updateDeleteInfo({ selectedDates: deleteInfo.selectedDates.filter((d: string) => d !== dateKey) }));
      } else {
        dispatch(updateDeleteInfo({ selectedDates: [...deleteInfo.selectedDates, dateKey] }));
      }
    }

  };


  const isCurrentMonth = (date : Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const formatDate = (date: string) => {
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

    </div>
  );
};

export default CalendarGrid;