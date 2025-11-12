import { useEffect, useState } from "react";
import useArtist, { Artist } from "../hooks/useArtist";
import ArtistCard from "./ProgramArtistCard";
import { DataQuery } from "./ProgramContainer";

interface Props {
  dataQuery: DataQuery;
  isAdmin: boolean; 
}

const ProgramGrid = ({ dataQuery, isAdmin }: Props) => {
  const { data } = useArtist(dataQuery);
  const [artists, setArtists] = useState<Artist[]>([]);
  
  useEffect(() => {
    if (data) setArtists(data);
  }, [data]);

    return (
    <div id="artist_grid">
    {artists.map((artist) => (
          <ArtistCard 
          key={artist.id} 
          artist={artist} 
          isAdmin={isAdmin}
          onDeleted={(id) => 
            setArtists((prev) => prev.filter((a) => a.id !== id))}
          />
      ))}
    </div>
  );
  }

export default ProgramGrid

// import useArtist from "../hooks/useArtist";
// import ArtistCard from "./ProgramArtistCard";
// import { DataQuery } from "./ProgramContainer";

// interface Props {
//   dataQuery: DataQuery;
// }

// const ProgramGrid = ({ dataQuery }: Props) => {
//   const { data: artists } = useArtist(dataQuery);

//     return (
//     <div id="artist_grid">
//     {artists.map((artist) => (
//           <ArtistCard key={artist.id} artist={artist} />
//       ))}
//     </div>
//   );
//   }

// export default ProgramGrid

/*
import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ProgramGrid = ({ children }: Props) => {
  return (
    <Box overflow="hidden" borderRadius={10}>
      {children}
    </Box>
  );
};

export default ProgramGrid;

*/
