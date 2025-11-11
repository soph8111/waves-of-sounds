// import FilterContainer from "./ProgramSelectorContainer";
import ProgramGrid from "./ProgramGrid";
import { Artist } from "../hooks/useArtist"
import { Stage } from "../hooks/useStage";
import { Genre } from "../hooks/useGenre";
import { useState } from "react";
import StageSelector from "./ProgramSelectorStage";
import GenreSelector from "./ProgramSelectorGenre";
import { HStack } from "@chakra-ui/react";
import { Article } from "../hooks/useArticle";
import { Schedule } from "../hooks/useSchedule";
import DateSelector from "./ProgramSelectorDate";
export interface DataQuery {
  artist: Artist | null;
  stage: Stage | null;
  schedule: Schedule | null;
  scheduleDate: string | null;
  genre: Genre | null;
  article: Article | null;
}

const Program = () => {

  const [dataQuery, setDataQuery] = useState<DataQuery>({} as DataQuery);

  const isAdmin = localStorage.getItem("isAdmin") === "true"; // Tjekker om Admin er logget ind

    return (
    <div className="container">
    <h1>program</h1>
    <p className="intro_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ultrices tincidunt sodales. Suspendisse porta, lacus eget sodales luctus, mauris magna eleifend nisi, quis consectetur nisl massa id odio. </p>
    {/* <FilterContainer /> */}
    <HStack id="program_selectors">
      <StageSelector 
      selectedStage={dataQuery.stage}
      onSelectStage={(stage) => setDataQuery({ ...dataQuery, stage })}/>
      <DateSelector 
      selectedSchedule={dataQuery.schedule}
      onSelectSchedule={(schedule) => setDataQuery({ ...dataQuery, schedule })}
        /> 
      <GenreSelector
      selectedGenre={dataQuery.genre}
      onSelectGenre={(genre) => setDataQuery({ ...dataQuery, genre })}
        />  
    </HStack>
    <h2 className="program_day">Placeholder: dag</h2>
    <h3 className="program_date">Placeholder: dato</h3>
    <hr />
    {/* <ProgramGrid/> */}
    <ProgramGrid dataQuery={dataQuery} isAdmin={isAdmin} />
    </div>
    );
  };
  
export default Program

/*
// import FilterContainer from "./ProgramSelectorContainer";
import ProgramGrid from "./ProgramGrid";
import useArtist, { Artist } from "../hooks/useArtist"
import { Stage } from "../hooks/useStage";
import { Genre } from "../hooks/useGenre";
import { useState } from "react";
import StageSelector from "./ProgramSelectorStage";
import GenreSelector from "./ProgramSelectorGenre";
import { HStack } from "@chakra-ui/react";
import ArtistCard from "./ProgramArtistCard";

export interface DataQuery {
  artist: Artist | null;
  stage: Stage | null;
  genre: Genre | null;
}

const Program = () => {

  const [dataQuery, setDataQuery] = useState<DataQuery>({} as DataQuery);
  const { data: artists } = useArtist(dataQuery);

    return (
    <div className="container">
    <h1>program</h1>
    <p className="intro_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ultrices tincidunt sodales. Suspendisse porta, lacus eget sodales luctus, mauris magna eleifend nisi, quis consectetur nisl massa id odio. </p>
    <HStack id="program_selectors">
      <StageSelector 
      selectedStage={dataQuery.stage}
      onSelectStage={(stage) => setDataQuery({ ...dataQuery, stage })}/>
      <GenreSelector 
      selectedGenre={dataQuery.genre}
      onSelectGenre={(genre) => setDataQuery({ ...dataQuery, genre })}
        />
    </HStack>
    <h2 className="program_day">Placeholder: dag</h2>
    <h3 className="prpogram_date">Placeholder: dato</h3>
    <hr />
    {artists.map((artist) => (
        <ProgramGrid key={artist.id}>
          <ArtistCard artist={artist} />
        </ProgramGrid>
      ))}
    </div>
    );
  };
  
export default Program

*/