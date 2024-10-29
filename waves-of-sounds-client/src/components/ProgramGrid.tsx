import useArtist from "../hooks/useArtist";
import ArtistCard from "./ProgramArtistCard";
import { DataQuery } from "./ProgramContainer";

interface Props {
  dataQuery: DataQuery;
}

// const ProgramGrid = ({ dataQuery }: Props) => {
//   const { data: artists } = useArtist(dataQuery);
//   const skeletons = [...Array(20).keys()];

//   return (
//   <div id="artist_grid">
//     {artists.map((artist) => (
//         <GameCardContainer key={game.id}>
//           <GameCard game={game} />
//         </GameCardContainer>
      
//     <ArtistCard artist={artist} />
//   ))}
//     </div>
//     );
// };


const ProgramGrid = ({ dataQuery }: Props) => {
  const { data: artists } = useArtist(dataQuery);

    return (
    <>
    {artists.map((artist) => (
      <div id="artist_grid" key={artist.id}>
        <ArtistCard artist={artist} />
        </div>
      ))}
      </>
  );
  }

export default ProgramGrid