import { Link } from "react-router-dom";
// import data from "../services/program.json";
import { Artist } from "../hooks/useArtist";
import apiClient from "../services/api-client";

interface Props {
    artist: Artist;
    isAdmin?: boolean;  //vis knap kun for admin
    onDeleted?: (id: number) => void;
    onEdit?: (artist: Artist) => void;                     
  }

  const ArtistCard = ({ artist, isAdmin = false, onDeleted, onEdit }: Props) => {
    // console.log("ArtistCard isAdmin =", isAdmin);

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
    <div className="artist_card" key={artist.id}>
      <img src={artist.image} alt={artist.name} />
      <div className="artist_card_info">
        <Link
          to={`/artist/${artist.name}`}
          relative="path"
          state={artist}
          className="artist_name"
        >
          {artist.name}
        </Link>

        <p className="artist_time">{artist.schedule.startTime.slice(0, 5)}</p>
        <p className="artist_date">{artist.schedule.startDate}</p>

        {/* Admin-only delete */}
        {isAdmin && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default ArtistCard;

//   const ArtistCard = ({ artist }: Props) => {
    
//     return (

//         <div className="artist_card" key={artist.id} >
//             <img src={artist.image} alt={artist.name} />
//             <div className="artist_card_info">
//                 <Link to={`/artist/${artist.name}`} relative="path" state={artist} className="artist_name">{artist.name}</Link>
//                 <p className="artist_time">{artist.schedule.startTime.slice(0, 5)}</p>
//                 <p className="artist_date">{artist.schedule.startDate}</p>
//             </div>
//         </div>

//     );
//   }

//   export default ArtistCard 


