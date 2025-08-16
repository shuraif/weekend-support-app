import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import { useSelector } from 'react-redux';

interface CalendarLayoutProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}
const CalendarLayout = ({ 
  currentDate, 
  setCurrentDate, 
}: CalendarLayoutProps) => {

  const navigateMonth = (direction : number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
    
  };

  const schedules = useSelector((state : any) => state.easyquiz.schedule);

  return (
    <div className="lg:col-span-3">
      <div className="bg-white rounded-lg shadow-sm p-2">
        <CalendarHeader 
          currentDate={currentDate} 
          navigateMonth={navigateMonth} 
        />
        <CalendarGrid 
          currentDate={currentDate}
        />
        {/* No assignments message */}
        {schedules.isLoading && (
          <div className="mt-8 text-center text-gray-500">
            <p>Loading weekend supports...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarLayout;