// src/components/ProgramGrid.tsx
import { useEffect, useMemo, useState } from "react";
import ArtistCard from "./ProgramArtistCard";
import useArtist, { Artist } from "../../hooks/useArtist";
import { DataQuery } from "../../pages/ProgramPage";

interface Props {
  dataQuery: DataQuery;
  isAdmin: boolean;
  onEdit?: (artist: Artist) => void
}

// inde i ProgramGrid komponenten (har adgang til dataQuery prop)
const ProgramGrid = ({ dataQuery, isAdmin, onEdit }: Props) => {
  const { data: hookData } = useArtist(dataQuery);
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    if (hookData) setArtists(hookData);
  }, [hookData]);

  // Lokalt filter baseret på valgt startDate (scheduleDate)
  const visibleArtists = useMemo(() => {
    if (!dataQuery.scheduleDate) return artists;
    return artists.filter(
      (a) => a?.schedule?.startDate === dataQuery.scheduleDate
    );
  }, [artists, dataQuery.scheduleDate]);

  return (
    <div className="artist_grid">
      {visibleArtists.map((artist) => (
        <ArtistCard
          key={artist.id}
          artist={artist}
          isAdmin={isAdmin}
          onDeleted={(id) =>
            setArtists((prev) => prev.filter((a) => a.id !== id))
          }
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default ProgramGrid;