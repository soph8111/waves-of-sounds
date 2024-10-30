
// import data from '../services/program.json';
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import useGenre, { Genre } from "../hooks/useGenre";

interface Props {
  selectedGenre: Genre | null;
  onSelectGenre: (genre: Genre) => void;
}

const StageSelector = ({ onSelectGenre, selectedGenre }: Props) => {
  const { data: genres} = useGenre();

  return (
  <Menu>
    <MenuButton 
    as={Button} 
    rightIcon={<ChevronDownIcon />}
    className="selector_name" 
    aria-label='selector_name'>
    {selectedGenre ? selectedGenre.name : "Genre"}
    </MenuButton>
    <MenuList>
      {genres.map((genre) => (
        <MenuItem 
        onClick={() => onSelectGenre(genre)}
        key={genre.id}
        className="selector_list" 
        aria-label='selector_list' 
        >
          {genre.name}
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
  );
};
  
export default StageSelector
