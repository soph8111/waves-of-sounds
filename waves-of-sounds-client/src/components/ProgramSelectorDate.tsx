
import data from '../services/program.json';
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";

const DateSelector = () => {
  return (
  <Menu>
    <MenuButton 
    as={Button} 
    rightIcon={<ChevronDownIcon />}
    className="selector_name" 
    aria-label='selector_name'>
    date
    </MenuButton>
    <MenuList>
      {data.dates.map((date) => (
        <MenuItem 
        className="selector_list" 
        aria-label='selector_list' 
        key={date.id}>
          {date.date}
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
  );
};
  
export default DateSelector