// useArtist hook = fetches type-safe (errors are discovered before runtime) and filtered (data is based on different criterias (stage, genre, schedule - id) artist data from the backend using TypeScript interfaces and query parameters.

import { DataQuery } from "../pages/ProgramPage"; //DataQuery er interface - Beskriver hvilke filtre brugeren har valgt 
import useData from "./useData"; // Generisk data-fetch hook, som henter data fra API
import { Genre } from "./useGenre";
import { Schedule } from "./useSchedule";
import { useMemo } from "react";

// Interface = skabelon (template) for hvordan objektet skal se ud. En del af TypeScript. API'et skal hente disse felter
export interface Artist {
  id: number;
  name: string;
  bio: string;
  spotify: string;
  image: string;
  genres: Genre[]; // Mange genre
  stage: number;
  schedule: Schedule; //Én Schedule
}

// Hook med ét argument, som beskriver de valgte filtre (hent artist baseret på følgende valg). DataQuery = UI-state
const useArtist = (dataQuery: DataQuery) => {
  // Bruger useMemo, så hook kun refetcher når ID'erne ændrer sig - ellers refretcher hooket konstant
  const params = useMemo(() => {
    return {
      stage: dataQuery.stage?.id,
      schedule: dataQuery.schedule?.id,
      genres: dataQuery.genre?.id,
    };
  }, [dataQuery.stage?.id, dataQuery.schedule?.id, dataQuery.genre?.id]);
  // Hooket returnerer data af typen Artist -> useData <T> = Artist. 
  // params = f.eks. /artists?stage=1&genres=3
  return useData<Artist>("/artists", { params }, [params.stage, params.schedule, params.genres]);
};

export default useArtist;

