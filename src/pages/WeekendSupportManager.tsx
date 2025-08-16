import { useState, useEffect } from 'react';
import { getScheduleApi, getTeamApi } from '../redux/Actions';
import ScheduleManagement from '../components/ScheduleManagement';
import CalendarLayout from '../components/CalendarLayout';
import ActivityLogs from '../components/ActivityLogs';
import { useAppDispatch } from '@/hooks/use-app-dispatch';

const WeekendSupportManager = () => {
  const dispatch = useAppDispatch();
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    dispatch(getScheduleApi());
    dispatch(getTeamApi());
  }, [dispatch]);


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
            <ActivityLogs />
           </div>
    </div>
  );
};

export default WeekendSupportManager;