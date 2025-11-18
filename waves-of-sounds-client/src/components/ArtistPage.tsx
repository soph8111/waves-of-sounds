import { useLocation } from 'react-router-dom'

export default function  ArtistPage () {
  const location = useLocation()
  const artist = location.state

  return (
    <>
    <div className='container artist_grid'>
        <div className='artist_bio'>
            <h1>{artist.name}</h1>
            <p className='intro_text'>{artist.bio}</p>
        </div>
        <img 
        className='artist_img' 
        src={artist.image} alt={artist.name} 
        />
    </div>
    <iframe
    title={artist.name}
    className="artist_spotify" 
    src={artist.spotify} 
    frameBorder="0" 
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
    loading="lazy" />
    </>
  )
}

/*
import { Artist } from '../hooks/useArtist';

interface Props {
  artist: Artist;
}

const ArtistPage = ( { artist }: Props ) => {


  return (
    <>
    <div className='container artist_grid'>
        <div className='artist_bio'>
            <h1>{artist.name}</h1>
            <p className='intro_text'>{artist.bio}</p>
        </div>
        <img className='artist_img' src={artist.image} alt={artist.name} />
    </div>
    <iframe
    title={artist.name}
    className="artist_spotify" 
    src={artist.spotify} 
    frameBorder="0" 
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
    loading="lazy" />
    </>
  )
}

export default ArtistPage;
*/