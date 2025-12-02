import { useLocation } from 'react-router-dom'

const FALLBACK_SPOTIFY = "https://open.spotify.com/embed/playlist/7dWdVrXD7fhFfobwqfjkuE?utm_source=generator";

export default function  ArtistPage () {
  const location = useLocation()
  const artist = location.state

const spotifyUrl = artist?.spotify?.includes("open.spotify.com") ? artist.spotify : FALLBACK_SPOTIFY;


  return (
    <>
    <div className='container'>
            <h1>{artist.name}</h1>
        <div className='split_content artist_bio'>
            <p>{artist.bio}</p>
        <img 
        className='artist_img' 
        src={artist.image || "/img/artists/placeholder.jpg"} 
        alt={artist.name}
        onError={(e) => {
            e.currentTarget.src = "/img/artists/placeholder.jpg";
          }} 
        />
        </div>
    </div>
    <iframe
    title={artist?.name ?? "Music on waves of sound"}
    className="artist_spotify" 
    src={spotifyUrl} 
    frameBorder="0" 
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
    loading="lazy" />
    </>
  )
}