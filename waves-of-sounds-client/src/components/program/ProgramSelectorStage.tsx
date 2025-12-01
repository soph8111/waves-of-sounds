
// import data from '../services/program.json';
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import useStage, { Stage } from '../../hooks/useStage';

interface Props {
  selectedStage: Stage | null;
  onSelectStage: (stage: Stage | null ) => void;
}

const StageSelector = ({ onSelectStage, selectedStage }: Props) => {
  const { data: stages} = useStage();

  return (
  <Menu>
    <MenuButton 
    as={Button} 
    rightIcon={<ChevronDownIcon />}
    className="selector_name" 
    aria-label='selector_name'>
    {selectedStage ? selectedStage.name : "Stage"}
    </MenuButton>
    <MenuList>
      <MenuItem 
          onClick={() => onSelectStage(null)} // Choose "all" by returning null
          className="selector_list" 
          aria-label="selector_list" 
        >
          All Stages
          </MenuItem>
      {stages.map((stage) => (
        <MenuItem 
        onClick={() => onSelectStage(stage)}
        key={stage.id}
        className="selector_list" 
        aria-label='selector_list' 
        >
          {stage.name}
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
  );
};
  
export default StageSelector

