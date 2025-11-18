
// // import data from '../services/program.json';
// import { ChevronDownIcon } from "@chakra-ui/icons";
// import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
// import useSchedule, { Schedule } from "../hooks/useSchedule";


// interface Props {
//   selectedSchedule: Schedule | null;
//   onSelectSchedule: (schedule: Schedule | null ) => void;
// }

// const DateSelector = ({ onSelectSchedule, selectedSchedule }: Props) => {
//   const { data: schedules} = useSchedule();

//   return (
//   <Menu>
//     <MenuButton 
//     as={Button} 
//     rightIcon={<ChevronDownIcon />}
//     className="selector_name" 
//     aria-label='selector_name'>
//     {selectedSchedule ? selectedSchedule.startDate : "Date"}
//     </MenuButton>
//     <MenuList>
//       <MenuItem 
//           onClick={() => onSelectSchedule(null)} // Choose "all" by returning null
//           className="selector_list" 
//           aria-label="selector_list" 
//         >
//           All Dates
//           </MenuItem>
//       {schedules.map((schedule) => (
//         <MenuItem 
//         onClick={() => onSelectSchedule(schedule)}
//         key={schedule.id}
//         className="selector_list" 
//         aria-label='selector_list' 
//         >
//           {schedule.startDate}
//         </MenuItem>
//       ))}
//     </MenuList>
//   </Menu>
//   );
// };
  
// export default DateSelector

import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React, { useMemo } from "react";
import { Schedule } from "../hooks/useSchedule";

interface Props {
  schedules: Schedule[]; // alle schedules (fx hentet i Program)
  selectedScheduleDate?: string | null;
  onSelectScheduleDate: (date: string | null) => void;
}

const DateSelector: React.FC<Props> = ({
  schedules,
  selectedScheduleDate = null,
  onSelectScheduleDate,
}) => {
  // hent unikke startDate strenge (bevarer rækkefølge efter first-occurrence)
  const uniqueDates = useMemo(() => {
    const seen = new Set<string>();
    const list: string[] = [];
    for (const s of schedules) {
      if (!s?.startDate) continue;
      if (!seen.has(s.startDate)) {
        seen.add(s.startDate);
        list.push(s.startDate);
      }
    }
    return list;
  }, [schedules]);

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        className="selector_name"
        aria-label="selector_date"
      >
        {selectedScheduleDate ? selectedScheduleDate : "Date"}
      </MenuButton>

      <MenuList>
        <MenuItem
          onClick={() => onSelectScheduleDate(null)}
          className="selector_list"
          aria-label="selector_list"
        >
          All Dates
        </MenuItem>

        {uniqueDates.map((date) => (
          <MenuItem
            key={date}
            onClick={() => onSelectScheduleDate(date)}
            className="selector_list"
            aria-label="selector_list"
          >
            {date}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default DateSelector;
