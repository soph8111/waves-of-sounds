// src/components/ProgramGrid.tsx
import { useEffect, useState } from "react";
import ArtistCard from "./ProgramArtistCard";
import useArtist, { Artist } from "../hooks/useArtist";
import { DataQuery } from "./ProgramContainer";

interface Props {
  dataQuery: DataQuery;
  isAdmin: boolean;
  onEdit?: (artist: Artist) => void
}

const ProgramGrid = ({ dataQuery, isAdmin, onEdit }: Props) => {
  // initial load via hook (keeps behavior identical)
  const { data: hookData } = useArtist(dataQuery);
  const [artists, setArtists] = useState<Artist[]>([]);

  // sync initial hook data
  useEffect(() => {
    if (hookData) setArtists(hookData);
  }, [hookData]);

  return (
    <div className="artist_grid">
      {artists.map((artist) => (
        <ArtistCard
          key={artist.id}
          artist={artist}
          isAdmin={isAdmin}
          onDeleted={(id) => setArtists((prev) => prev.filter((a) => a.id !== id))}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default ProgramGrid;


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
