import DateSelector from "./ProgramSelectorDate";
import SelectorGenre from "./ProgramSelectorGenre";
// import StageSelector from "./ProgramSelectorStage";

const FilterContainer = () => {
    return (
    <div id="program_selectors">
      <DateSelector />
      {/* <StageSelector /> */}
      <SelectorGenre />
    </div>
    );
  };
  
export default FilterContainer