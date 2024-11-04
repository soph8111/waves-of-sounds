import { DataQuery } from "../components/ProgramContainer";
import useData from "./useData";
import { Genre } from "./useGenre";
import { Schedule } from "./useSchedule";


export interface Artist {
  id: number;
  name: string;
  bio: string;
  spotify: string;
  image: string;
  // scheduleId: number;
  // stageId: number;
  genres: Genre[];
  stage: number;
  schedule: Schedule;
}

const useArtist = (dataQuery: DataQuery) => 
  useData<Artist>(
    "/artists", 
    {
      params: {
        stage: dataQuery.stage?.id,
        schedule: dataQuery.schedule?.id,
        genres: dataQuery.genre?.id
      },
    },
    [dataQuery]
  );

export default useArtist;

