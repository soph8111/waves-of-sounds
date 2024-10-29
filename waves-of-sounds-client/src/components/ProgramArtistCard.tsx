import { Link } from "react-router-dom";
// import data from "../services/program.json";
import { Artist } from "../hooks/useArtist";

interface Props {
    artist: Artist;
  }

  const ArtistCard = ({ artist }: Props) => {
    
    return (

        <div className="artist_card" key={artist.id} >
            <img src={artist.image} alt={artist.name} />
            <div className="artist_card_info">
                <Link to={`/artist/${artist.name}`} relative="path" state={artist} className="artist_name">{artist.name}</Link>
                {/* <p className="artist_time">{artist.time.time}</p>
                <p className="artist_date">{artist.date.date}</p> */}
            </div>
        </div>

    );
  }

  export default ArtistCard 


