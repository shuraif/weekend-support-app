import React, { useEffect, useState } from 'react';
import { Plus, X, Users, RefreshCw, CalendarClock, Settings } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux'
import { getScheduleApi, loginUserApi } from './../redux/Actions'
import { Button } from "@/components/ui/button";
import { getTeamApi } from './../redux/Actions';

const TeamManagement = ({ }) => {
  const [newTeammateName, setNewTeammateName] = useState('');
  const [newTeammateEmail, setNewTeammateEmail] = useState('');
  const [newTeammateTeam, setNewTeammateTeam] = useState('kites');
  const dispatch = useDispatch();
  const schedules = useSelector((state) => state.easyquiz.schedule);
  const isLoading = useSelector((state) => state.easyquiz.loading);
  const team = useSelector((state) => state.easyquiz.team);


  useEffect(() => {
    console.log('Fetching team data...');
    dispatch(getTeamApi());
  }, [dispatch]);



  if(!team || team.isLoading) {
    return (
    <div className="lg:col-span-1 mt-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
      Loading team data...</div>
      </div>
    )
  }

  return (
    <div className="lg:col-span-1 mt-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-4">
          <Users className="text-blue-600" />
          Team Members ({team.list.length})
        </h2>
        
        {/* Add New Teammate */}
        <div className="space-y-2 mb-4">
          <input
            type="text"
            value={newTeammateName}
            onChange={(e) => setNewTeammateName(e.target.value)}
            placeholder="Enter name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            value={newTeammateEmail}
            onChange={(e) => setNewTeammateEmail(e.target.value)}
            placeholder="Enter email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={newTeammateTeam}
            onChange={(e) => setNewTeammateTeam(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="kites">Kites</option>
            <option value="Denali">Denali</option>
          </select>
          <button
            onClick={()=>console.log('Add Teammate ')}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            Add Teammate
          </button>
        </div>

        {/* Teammate List */}
        <div className="space-y-2 mb-4 max-h-110 overflow-y-auto">
          {team.list.map((teammate) => (
            <div
              key={teammate.id}
              className="p-3 bg-gray-50 rounded-md"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{teammate.name}</div>
                  <div className="text-sm text-gray-600">{teammate.email}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    <span className={`px-2 py-1 rounded text-xs ${
                      teammate.team === 'kites' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {teammate.team}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeTeammate(teammate.id)}
                  className="text-red-600 hover:text-red-800 focus:outline-none ml-2"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {team.list.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Users className="mx-auto mb-2" size={32} />
            <p>No team members added yet</p>
          </div>
        )}
      </div>
      
     
    </div>
  );
};

export default TeamManagement;