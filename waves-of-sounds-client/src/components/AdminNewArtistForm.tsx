import { useState } from "react";
import apiClient from "../services/api-client";

import { Artist } from "../hooks/useArtist";

import AdminStageSelector from "./AdminNewArtistSelectorStage";
import AdminScheduleSelector from "./AdminNewArtistSelectorSchedule";
import AdminGenreSelector from "./AdminNewArtistSelectorGenre";

interface Stage {
  id: number;
  name: string;
}

interface Schedule {
  id: number;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}

interface Props {
  onSaved?: (savedArtist: Artist) => void;
}

const NewArtistForm = ( { onSaved }: Props) => {
  // Form fields
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [spotify, setSpotify] = useState("");
  const [image, setImage] = useState("");

  // Related selections
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  // Feedback message
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!name || !selectedStage || !selectedSchedule) {
      setMessage("Please fill in all required fields (name, stage, schedule).");
      return;
    }

    try {
      // Send data to backend
      const response = await apiClient.post("/artists", {
        name,
        bio,
        spotify,
        image,
        stageId: selectedStage.id,
        scheduleId: selectedSchedule.id,
        genreIds: selectedGenres,
      });
      
      const savedArtist: Artist = response.data;

      // Reset form
      setName("");
      setBio("");
      setSpotify("");
      setImage("");
      setSelectedStage(null);
      setSelectedSchedule(null);
      setSelectedGenres([]);

      setMessage("Artist added successfully!");

      // Notify parent
      onSaved?.(savedArtist);

    } catch (error) {
      console.error("Error adding artist:", error);
      setMessage("Could not add artist.");
    }
  };

  return (
    <div className="admin-form">
      <h2>Add New Artist</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Artist Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <textarea
          placeholder="Artist Bio"
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
          placeholder="Image Path (e.g. /img/artists/artist.jpg)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        {/* Stage dropdown */}
        <AdminStageSelector
          selectedStage={selectedStage}
          onSelectStage={setSelectedStage}
        />

        {/* Schedule dropdown */}
        <AdminScheduleSelector
          selectedSchedule={selectedSchedule}
          onSelectSchedule={setSelectedSchedule}
        />

        {/* Genre multi-select */}
        <AdminGenreSelector
          selectedGenres={selectedGenres}
          onSelectGenres={setSelectedGenres}
        />

        <button type="submit">Add Artist</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default NewArtistForm;
