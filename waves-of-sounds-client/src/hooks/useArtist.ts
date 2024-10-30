import { DataQuery } from "../components/ProgramContainer";
import useData from "./useData";
import { Stage } from "./useStage";

export interface Artist {
  id: number;
  name: string;
  bio: string;
  spotify: string;
  image: string;
  scheduleId: number;
  stageId: { stage: Stage }[];
}

const useArtist = (dataQuery: DataQuery) => 
  useData<Artist>(
    "/artists", 
    {
      params: {
        stageId: dataQuery.stage?.id,
       genre: dataQuery.genre?.id
      },
    },
    [dataQuery]
  );

export default useArtist;

