import data from "../services/data.json";

function ProgramGrid() {
    return (
      <div>
        <h1>Artists</h1>
        {data.artists.map((artist) => (
          <div key={artist.id}>
            <h2>{artist.name}</h2>
          </div>
        ))}
      </div>
    );
  }

  export default ProgramGrid