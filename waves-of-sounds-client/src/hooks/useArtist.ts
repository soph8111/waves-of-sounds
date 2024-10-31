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
    "/artists", 
    {
      params: {
        stage: dataQuery.stage?.id,
        genres: dataQuery.genre?.id
      },
    },
    [dataQuery]
  );

export default useArtist;

