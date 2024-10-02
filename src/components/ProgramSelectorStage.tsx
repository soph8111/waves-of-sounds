
import stages from '../services/data.json';
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";

const FilterStage = () => {
    return (
    // <>
    // <button>stage</button>
    // </>

    <>
    <Menu>
    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
      Stages
    </MenuButton>
    <MenuList>
      {stages.stages.map((stage) => (
        <MenuItem
          key={stage.id}
        >
          {stage.name}
        </MenuItem>
      ))}
    </MenuList>
    </Menu>
    </>
    );
  };
  
export default FilterStage
