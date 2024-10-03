import { Menu, Button, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import data from '../services/program.json';
import { ChevronDownIcon } from '@chakra-ui/icons';


const SelectorGenre = () => {
  return (
  <Menu>
    <MenuButton 
    as={Button} 
    rightIcon={<ChevronDownIcon />}
    className="selector_name" 
    aria-label='selector_name'>
    genre
    </MenuButton>
    <MenuList>
      {data.genres.map((genre) => (
        <MenuItem
        className="selector_list" 
        aria-label='selector_list' 
        key={genre.id}>
          {genre.name}
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
  );
};
  
export default SelectorGenre


