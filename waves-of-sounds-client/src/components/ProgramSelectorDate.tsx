
// import data from '../services/program.json';
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import useSchedule, { Schedule } from "../hooks/useSchedule";


interface Props {
  selectedSchedule: Schedule | null;
  onSelectSchedule: (schedule: Schedule | null ) => void;
}

const DateSelector = ({ onSelectSchedule, selectedSchedule }: Props) => {
  const { data: schedules} = useSchedule();

  return (
  <Menu>
    <MenuButton 
    as={Button} 
    rightIcon={<ChevronDownIcon />}
    className="selector_name" 
    aria-label='selector_name'>
    {selectedSchedule ? selectedSchedule.startDate : "Date"}
    </MenuButton>
    <MenuList>
      <MenuItem 
          onClick={() => onSelectSchedule(null)} // Choose "all" by returning null
          className="selector_list" 
          aria-label="selector_list" 
        >
          All Dates
          </MenuItem>
      {schedules.map((schedule) => (
        <MenuItem 
        onClick={() => onSelectSchedule(schedule)}
        key={schedule.id}
        className="selector_list" 
        aria-label='selector_list' 
        >
          {schedule.startDate}
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
  );
};
  
export default DateSelector
