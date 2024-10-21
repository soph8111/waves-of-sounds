import { GameQuery } from "../App";
import useData from "./useData";

export interface Artist {
  id: number;
  name: string;

}

const useArtist = (gameQuery: GameQuery) =>
  useData<Artist>(
    "/artist",
    {
      params: {
        genres: gameQuery.genre?.id,
        parent_platforms: gameQuery.platform?.id,
        stores: gameQuery.store?.id,
      },
    },
    [gameQuery]
  );
export default useArtist;
