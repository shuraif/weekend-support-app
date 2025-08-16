import  { useEffect } from 'react';
import { Users, Logs } from 'lucide-react';
import { useSelector } from 'react-redux'
import { getActivityLogsApi } from '../redux/Actions'
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { Log } from "@/types/log";

const TeamManagement = ({ }) => {

  const dispatch = useAppDispatch();
  const activityLogs = useSelector((state : any) => state.easyquiz.activityLogs);
  const team = useSelector((state : any) => state.easyquiz.team);


  useEffect(() => {
    dispatch(getActivityLogsApi());
  }, [dispatch]);

  const getUserName = (userId:any) => {
    const user = team.list.find((member: { id: any; }) => member.id == userId);
    return user ? user.name : 'Unknown';
  };


  if(!activityLogs || activityLogs.isLoading) {
    return (
    <div className="lg:col-span-1 mt-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
      Loading activity logs...</div>
      </div>
    )
  }

  return (
    <div className="lg:col-span-1 mt-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-4">
          <Logs className="text-blue-600" />
          ActivityLogs ({activityLogs.list.length})
        </h2>
        

        {/* Teammate List */}
        <div className="space-y-2 mb-4 max-h-160 overflow-y-auto">
          {activityLogs.list.map((log:Log) => (
            <div
              key={log.id}
              className="p-3 bg-gray-50 rounded-md"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2'>
                    <div className="text-sm text-gray-500">
                      <span className={`px-2 py-1 rounded text-xs 
                    ${log.action === 'DELETE' ? 'bg-red-100 text-red-800' : ''}
                    ${log.action === 'UPDATE' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${log.action === 'ADD' ? 'bg-green-100 text-green-800' : ''}
                    ${log.action === 'SWAP' ? 'bg-blue-100 text-blue-800' : ''}
                    ${log.action === 'CLEAR' ? 'bg-orange-100 text-orange-800' : ''}
                    `}>
                      {log.action}
                    </span> 
                  </div>
                  
                  </div>
                 
                  {/* <div className="font-medium text-gray-800">{log?.user?.name}Jaban</div> */}
                  <div className="text-sm text-gray-600">{getUserName(log.userId)} : {log.details}</div>
                  <div className="text-xs text-gray-500 mt-2">
                    <span className="font-mono">{new Date(log.timestamp).toLocaleString()}</span>
                  </div>
                  
                </div>
                
              </div>
            </div>
          ))}
        </div>

        {activityLogs.list.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Users className="mx-auto mb-2" size={32} />
            <p>No activity logs available</p>
          </div>
        )}
      </div>
      
     
    </div>
  );
};

export default TeamManagement;