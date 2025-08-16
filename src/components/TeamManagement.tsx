import { useEffect, useState } from 'react';
import { Plus, Users, RefreshCw } from 'lucide-react';
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { Button } from "@/components/ui/button";
import { getTeamApi, getAssigneeReportApi } from '../redux/Actions';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Member } from '@/types/member';

const TeamManagement = ({ }) => {
  const [newTeammateName, setNewTeammateName] = useState('');
  const [newTeammateEmail, setNewTeammateEmail] = useState('');
  const [newTeammateTeam, setNewTeammateTeam] = useState('kites');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dispatch = useAppDispatch();
  const team = useSelector((state : any) => state.easyquiz.team);
  const assigneeReport = useSelector((state : any) => state.easyquiz.assigneeReport);

  useEffect(() => {
    dispatch(getTeamApi());
    dispatch(getAssigneeReportApi());
  }, [dispatch]);


  if(!team || team.isLoading) {
    return (
    <div className="lg:col-span-1 mt-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
      Loading team data...</div>
      </div>
    )
  }

  const getCountByType = (id: any,type: string) => {
    let report = assigneeReport.list.filter((item: { id: any; }) => item.id === id)[0];
    if(type === 'primary') {
      return report?.primaryCount
    } else if(type === 'secondary') {
      return report?.secondaryCount
    }
    
  }

  const saveChanges = () => {
    if(!newTeammateName || !newTeammateEmail) {
      alert('Please fill in all fields');
      return;
    }
    console.log(`Adding new teammate: ${newTeammateName}, ${newTeammateEmail}, ${newTeammateTeam}`);
  };


  return (
    <div className="lg:col-span-1 mt-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-4">
          <Users className="text-blue-600" />
          Team Members ({team.list.length})
        </h2>
        <div>
          <Button
            variant="outline"
            className="mb-4"
            onClick={() => setIsDialogOpen(true)}
          >
            <Plus className="mr-2" />
            Add Teammate
          </Button>
          <Button
            variant="outline"
            className="mb-4 ml-2"
            onClick={() => dispatch(getTeamApi())}
          >
            <RefreshCw className="mr-2" />
            Refresh Team
          </Button>
        </div>            

        {/* Teammate List */}
      <div className="space-y-4 mb-4  overflow-y-auto grid grid-cols-2 sm:grid-cols-2 gap-4">
        {team.list.map((teammate : Member) => (
          <div
            key={teammate.id}
            className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 font-medium bg-gray-100">
                  {teammate.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{teammate.name}</h3>
                  <p className="text-sm text-gray-600">{teammate.email}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                teammate.team === 'kites' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
              }`}>
                {teammate.team}
              </span>
            </div>
            <div className="mt-4 flex justify-between text-sm">
              <div className="flex flex-col items-center">
                <span className="text-gray-500">Primary</span>
                <span className="font-bold text-gray-800">{getCountByType(teammate.id,'primary')}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-gray-500">Secondary</span>
                <span className="font-bold text-gray-800">{getCountByType(teammate.id,'secondary')}</span>
              </div>
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
      
             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
      <form>
 
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Add new teammate</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new teammate
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
          <div className="flex items-center">
            <Label htmlFor="name" className="w-1/4">Name</Label>
            <Input 
              id="name" 
              name="name" 
              onChange={(e) => setNewTeammateName(e.target.value)} 
              className="w-3/4"
            />
          </div>

          <div className="flex items-center">
            <Label htmlFor="email" className="w-1/4">Email</Label>
            <Input 
              id="email" 
              name="email" 
              onChange={(e) => setNewTeammateEmail(e.target.value)} 
              className="w-3/4"
            />
          </div>
                    
          <div className="flex items-center">
            <Label htmlFor="team" className="w-1/4">Team</Label>
            <Select onValueChange={(value) => setNewTeammateTeam(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kites">Kites</SelectItem>
                <SelectItem value="Denali">Denali</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" >Cancel</Button>
            </DialogClose>
            <Button onClick={()=>{saveChanges}} >Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
     
    </div>
  );
};

export default TeamManagement;