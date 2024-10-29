// import FilterContainer from "./ProgramSelectorContainer";
import ProgramGrid from "./ProgramGrid";
import { Artist } from "../hooks/useArtist"
import { Stage } from "../hooks/useStage";
import { useState } from "react";
import StageSelector from "./ProgramSelectorStage";
//import { useState } from "react"

export interface DataQuery {
  artist: Artist | null;
  stage: Stage | null;
}

const Program = () => {

  const [dataQuery, setDataQuery] = useState<DataQuery>({} as DataQuery);

    return (
    <div className="container">
    <h1>program</h1>
    <p className="intro_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ultrices tincidunt sodales. Suspendisse porta, lacus eget sodales luctus, mauris magna eleifend nisi, quis consectetur nisl massa id odio. </p>
    {/* <FilterContainer /> */}
    <div id="program_selectors">
      <StageSelector 
      selectedStage={dataQuery.stage}
      onSelectStage={(stage) =>
        setDataQuery({ ...dataQuery, stage })
        }/>
    </div>
    <h2 className="program_day">Placeholder: dag</h2>
    <h3 className="prpogram_date">Placeholder: dato</h3>
    <hr />
    {/* <ProgramGrid/> */}
    <ProgramGrid dataQuery={dataQuery}/>
    </div>
    );
  };
  
export default Program
