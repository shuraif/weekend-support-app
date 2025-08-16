import { useState} from 'react';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import {addAssignee, getScheduleApi} from '@/redux/Actions';
import { Member } from '@/types/member';

interface DateCellProps {
  day: Date;  
  currentDate: Date;
  assignments: Record<string, any>;
  handleDateClick: (date: Date) => void;
}

const DateCell = ({ 
  day, 
  currentDate, 
  assignments, 
  handleDateClick,
} : DateCellProps) => {
 
  //const dateKey = day.toISOString().split('T')[0];
  const dateKey = format(day, 'yyyy-MM-dd');
   //console.log(`Day: ${day} -  dateKey :${dateKey}`);
  const assignment = assignments[dateKey];
  const isWeekendDay = day.getDay() === 0 || day.getDay() === 6; // Only Saturday
  const isCurrentMonthDay = day.getMonth() === currentDate.getMonth();
  const swapInfo = useSelector((state : any) => state.easyquiz.swapInfo);
  const deleteInfo = useSelector((state : any) => state.easyquiz.deleteInfo);
  const isSelected = swapInfo.selectedDate === dateKey || swapInfo.swapWithDate === dateKey || deleteInfo.selectedDates.includes(dateKey);
  const team = useSelector((state : any) => state.easyquiz.team);
  const dispatch = useAppDispatch();

  const [selectedPrimaryValue, setSelectedPrimaryValue] = useState('')
  const [selectedSecondaryValue, setSelectedSecondaryValue] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handlePrimaryValueChange = (newValue: string) => {
    setSelectedPrimaryValue(newValue)
  }

  const handleSecondaryValueChange = (newValue: string) => {
    setSelectedSecondaryValue(newValue)
  }

  const handleSubmitNewAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDialogOpen(false);
    if(!selectedPrimaryValue || !selectedSecondaryValue) {
  
      alert('Please select both primary and secondary assignees.');
      return;
    }

    if(selectedPrimaryValue === selectedSecondaryValue) {
      alert('Primary and secondary assignees must be different.');
      return;
    }


    const newAssignment = {
      date: dateKey,
      primaryId: team.list.find((member: { name: string; }) => member.name === selectedPrimaryValue)?.id,
      secondaryId: team.list.find((member: { name: string; }) => member.name === selectedSecondaryValue)?.id,
  };

  dispatch(addAssignee(newAssignment)).then(() => {
    dispatch(getScheduleApi());
  })
  

}


  return (
    <div
      onClick={() => handleDateClick(day)}
      className={`
        min-h-24 max-h-32 p-2 border rounded cursor-pointer transition-colors
        ${!isCurrentMonthDay ? 'text-gray-400 bg-gray-50' : 'text-gray-900'}
        ${isWeekendDay && isCurrentMonthDay ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}
        ${isSelected ? 'ring-2 ring-blue-500 bg-blue-100' : ''}
        ${swapInfo.swapMode && isCurrentMonthDay ? 'hover:bg-blue-100' : ''}
      `}
    >
     <div className="font-bold text-xl">{day.getDate()}</div>
      {
        isCurrentMonthDay && !assignment && (
            <div  onClick={() => setIsDialogOpen(true)}>
          <div className='flex justify-center items-center w-full min-h-24'>
          <div className='bg-green-100 rounded-full p-4'>
           
            <Plus className="h-4 w-4 text-green-600" />
         
          </div>
        </div>
         </div>
        )
      }
        
     
      { isCurrentMonthDay && assignment && (
        <div className="text-xs space-y-1 mt-1">
          <div className={`bg-blue-400 text-white rounded text-center border-2 border-blue-400 
          ${!assignment.primary?.name ? 'bg-red-500 border-red-500' : ''}
          ${assignment.primary?.name===assignment.secondary?.name ? 'bg-red-500 border-red-500' : ''}
          ${assignment.primary?.team===assignment.secondary?.team ? 'bg-red-500 border-red-500' : ''}
          `}>
            <div className="text-xs">Primary</div>
            <div className="truncate bg-blue-100  text-black">{assignment.primary?.name?assignment.primary?.name:'Unassigned'}</div>
          </div>
          <div className={`bg-green-400 text-white rounded text-center border-2 border-green-400
            ${!assignment.secondary?.name ? 'bg-red-500 border-red-500' : ''}
            ${assignment.primary?.name===assignment.secondary?.name ? 'bg-red-500 border-red-500' : ''}
            ${assignment.primary?.team===assignment.secondary?.team ? 'bg-red-500 border-red-500' : ''}
            `}>
            <div className="text-xs">Secondary</div>
            <div className="truncate bg-blue-100 text-black" >{assignment.secondary?.name?assignment.secondary?.name:'Unassigned'}</div>
          </div>
        </div>
      )}


       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
      <form>
 
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add support</DialogTitle>
            <DialogDescription>
              Assign primary and secondary support
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="date">Date</Label>
              <Input id="date" name="date" defaultValue={format(day, 'yyyy-MM-dd')} disabled />
            </div>
            <div className="grid gap-3 display-flex grid-cols-2">
              <Label htmlFor="name-1" >Primary</Label>
            <Select onValueChange={handlePrimaryValueChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {team.list.map((member: Member) => (
                  <SelectItem key={member.id} value={member.name}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            </div>

            <div className="grid gap-3 display-flex grid-cols-2">
              <Label htmlFor="name-1" >Secondary</Label>
            <Select onValueChange={handleSecondaryValueChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {team.list.map((member: Member) => (
                  <SelectItem key={member.id} value={member.name}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" >Cancel</Button>
            </DialogClose>
            <Button onClick={handleSubmitNewAssignment} >Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
    </div>
  );
};

export default DateCell;