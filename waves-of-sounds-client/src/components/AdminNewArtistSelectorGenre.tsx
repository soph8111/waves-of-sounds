import useGenre from "../hooks/useGenre";

interface Props {
  selectedGenres: number[];
  onSelectGenres: (genres: number[]) => void;
}

const AdminGenreSelector = ({ selectedGenres, onSelectGenres }: Props) => {
  const { data: genres } = useGenre();

  const toggleGenre = (id: number) => {
    if (selectedGenres.includes(id)) {
      onSelectGenres(selectedGenres.filter((g) => g !== id));
    } else {
      onSelectGenres([...selectedGenres, id]);
    }
  };

  return (
    <>
      <h4>Select Genres</h4>
      <div id="select_genres">
        {genres.map((genre) => (
          <label key={genre.id}>
            <input
              type="checkbox"
              checked={selectedGenres.includes(genre.id)}
              onChange={() => toggleGenre(genre.id)}
            />
            {genre.name}
          </label>
        ))}
      </div>
    </>
  );
};

export default AdminGenreSelector;
