
import data from '../services/program.json';
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";

const StageSelector = () => {
  return (
  <Menu>
    <MenuButton 
    as={Button} 
    rightIcon={<ChevronDownIcon />}
    className="selector_name" 
    aria-label='selector_name'>
    stage
    </MenuButton>
    <MenuList>
      {data.stages.map((stage) => (
        <MenuItem 
        className="selector_list" 
        aria-label='selector_list' 
        key={stage.id}>
          {stage.name}
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
  );
};
  
export default StageSelector
