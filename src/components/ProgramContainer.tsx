import FilterContainer from "./ProgramSelectorContainer";
import ProgramGrid from "./ProgramGrid";

const Program = () => {
    return (
    <div className="container">
    <h1>program</h1>
    <p className="intro_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ultrices tincidunt sodales. Suspendisse porta, lacus eget sodales luctus, mauris magna eleifend nisi, quis consectetur nisl massa id odio. </p>
    <FilterContainer />
    <h2 className="program_day">Placeholder: dag</h2>
    <h3 className="prpogram_date">Placeholder: dato</h3>
    <hr />
    <ProgramGrid />
    </div>
    );
  };
  
export default Program
