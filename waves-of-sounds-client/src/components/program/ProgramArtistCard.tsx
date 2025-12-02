import { Link } from "react-router-dom";
// import data from "../services/program.json";
import { Artist } from "../../hooks/useArtist";
import apiClient from "../../services/api-client";

import useStage from "../../hooks/useStage";


interface Props {
    artist: Artist;
    isAdmin?: boolean;  //vis knap kun for admin
    onDeleted?: (id: number) => void;
    onEdit?: (artist: Artist) => void;                     
  }

  const ArtistCard = ({ artist, isAdmin = false, onDeleted, onEdit }: Props) => {
    // console.log("ArtistCard isAdmin =", isAdmin);

    const { data: stages = [] } = useStage();
    const stageName = stages.find((s) => s.id === artist.stage)?.name || "";

    const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm(`Slet "${artist.name}" fra programmet?`)) return;

    try {
        await apiClient.delete(`artists/${artist.id}`);
        onDeleted?.(artist.id);
    } catch (err) {
        console.error(err);
        alert("Fejl: kunne ikke slette artist.");
    }
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit?.(artist);
  };


  return (
    <Link
      to={`/artist/${artist.id}`}
      relative="path"
      state={artist}
      >
        <div className="artist_card" key={artist.id}>
          <img 
          src={artist.image || "/img/artists/placeholder.jpg"}  
          alt={artist.name} 
          onError={(e) => {
            e.currentTarget.src = "/img/artists/placeholder.jpg";
          }}
          />
          
          <div className="artist_card_info">
            <p className="artist_name">{artist.name ?? "Unknown artist"}</p>
            <p className="artist_date">{artist.schedule?.startDate ?? ""}</p>
            <p className="artist_time">{artist.schedule?.startTime ? artist.schedule.startTime.slice(0, 5) : ""}</p>
            <p className="artist_stage">{stageName ?? ""}</p>
          </div>
          
          {/* Admin-only delete */}
          {isAdmin && (
            <div className="admin_artist_buttons">
              <button
                type="button"
                onClick={handleEdit}
                className="artist_update_btn"
                title="Update artist"
              >
                Edit artist
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="artist_delete_btn"
                title="Delete from program"
              >
                Delete from program
              </button>
            </div>
          )}
        </div>
    </Link>
  );
};

export default ArtistCard;


