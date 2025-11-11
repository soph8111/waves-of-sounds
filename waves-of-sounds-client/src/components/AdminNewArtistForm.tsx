import { useState } from "react";
import apiClient from "../services/api-client";

// import AdminStageSelector from "./AdminNewArtistSelectorStage";
// import AdminScheduleSelector from "./AdminNewArtistSelectorSchedule";
// import AdminGenreSelector from "./AdminNewArtistSelectorGenre";


const NewArtistForm = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [spotify, setSpotify] = useState("");
  const [image, setImage] = useState("");

  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
//   const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedStage || !selectedSchedule) {
      setMessage("Please select both stage and schedule.");
      return;
    }

    try {
      await apiClient.post("/artists", {
        name,
        bio,
        spotify,
        image
      });

      // Reset form
      setName("");
      setBio("");
      setSpotify("");
      setImage("");
      setSelectedStage(null);
      setSelectedSchedule(null);
    //   setSelectedGenres([]);

      setMessage("Artist added!");
    } catch (err) {
      console.error(err);
      setMessage("Error adding artist.");
    }
  };

  return (
    <div>
      <h2>Add Artist</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Artist Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <input
          type="text"
          placeholder="Spotify Embed URL"
          value={spotify}
          onChange={(e) => setSpotify(e.target.value)}
        />

        <input
          type="text"
          placeholder="Image Path"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        {/* <AdminStageSelector
          selectedStage={selectedStage}
          onSelectStage={setSelectedStage}
        />

        <AdminScheduleSelector
          selectedSchedule={selectedSchedule}
          onSelectSchedule={setSelectedSchedule}
        />

        <AdminGenreSelector
          selectedGenres={selectedGenres}
          onSelectGenres={setSelectedGenres}
        /> */}

        <button type="submit">Add Artist</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default NewArtistForm;
