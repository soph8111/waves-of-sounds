import { DataQuery } from "../components/ProgramContainer";
import useData from "./useData";

export interface Artist {
  id: number;
  name: string;
  bio: string;
  spotify: string;
  image: string;
  scheduleId: number;
  stageId: number;
}

const useArtist = (dataQuery: DataQuery) => 
  useData<Artist>(
    "/artist", 
    {
      params: {
        stage: dataQuery.stage?.id,
       //date: dataQuery.date?.id,
        // genre: dataQuery.genre?.id
      },
    },
    [dataQuery]
  );


// const useArtist = () => useData<Artist>("/artist");

export default useArtist;

