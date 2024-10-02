import FilterData from "./ProgramSelectorDate";
import FilterGenre from "./ProgramSelectorGenre";
import StageSelector from "./ProgramSelectorStage";

const FilterContainer = () => {
    return (
    <>
    <StageSelector />
    <FilterGenre />
    <FilterData />
    </>
    );
  };
  
export default FilterContainer