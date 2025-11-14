// import { DataQuery } from "../components/ProgramContainer";
// import useData from "./useData";
// import { Genre } from "./useGenre";
// import { Schedule } from "./useSchedule";


// export interface Artist {
//   id: number;
//   name: string;
//   bio: string;
//   spotify: string;
//   image: string;
//   // scheduleId: number;
//   // stageId: number;
//   genres: Genre[];
//   stage: number;
//   schedule: Schedule;
// }

// const useArtist = (dataQuery: DataQuery) => 
//   useData<Artist>(
//     "/artists", 
//     {
//       params: {
//         stage: dataQuery.stage?.id,
//         schedule: dataQuery.schedule?.id,
//         genres: dataQuery.genre?.id
//       },
//     },
//     [dataQuery]
//   );

// export default useArtist;

import { DataQuery } from "../components/ProgramContainer";
import useData from "./useData";
import { Genre } from "./useGenre";
import { Schedule } from "./useSchedule";
import { useMemo } from "react";

export interface Artist {
  id: number;
  name: string;
  bio: string;
  spotify: string;
  image: string;
  genres: Genre[];
  stage: number;
  schedule: Schedule;
}

const useArtist = (dataQuery: DataQuery) => {
  // lav primitive deps så hook kun refetcher når ID'erne ændrer sig
  const params = useMemo(() => {
    return {
      stage: dataQuery.stage?.id,
      schedule: dataQuery.schedule?.id,
      genres: dataQuery.genre?.id,
    };
  }, [dataQuery.stage?.id, dataQuery.schedule?.id, dataQuery.genre?.id]);

  return useData<Artist>("/artists", { params }, [params.stage, params.schedule, params.genres]);
};

export default useArtist;

