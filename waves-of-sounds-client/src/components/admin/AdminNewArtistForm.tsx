import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../../services/api-client";

import { Artist } from "../../hooks/useArtist";

import AdminStageSelector from "./AdminNewArtistSelectorStage";
import AdminScheduleSelector from "./AdminNewArtistSelectorSchedule";
import AdminGenreSelector from "./AdminNewArtistSelectorGenre";

import { Stage } from "../../hooks/useStage";
import { Schedule } from "../../hooks/useSchedule";

interface Props {
  artistToEdit?: Artist | null;
  schedules: Schedule[];          // alle schedules kommer fra parent
  occupiedScheduleIds: number[];  // parent giver id'er der er optaget
  onSaved?: (saved: Artist) => void;
  // onCancel?: () => void;
}

const NewArtistForm = ({
  artistToEdit = null,
  schedules,
  occupiedScheduleIds,
  onSaved,
}: Props) => {

  // ---------------- FORM STATE ----------------
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [spotify, setSpotify] = useState("");
  const [image, setImage] = useState("");

  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  // ---------------- PREFILL FORM WHEN EDITING ----------------
  useEffect(() => {
    if (!artistToEdit) {
      setName("");
      setBio("");
      setSpotify("");
      setImage("");
      setSelectedStage(null);
      setSelectedSchedule(null);
      setSelectedGenres([]);
      setMessage("");
      return;
    }

    setName(artistToEdit.name ?? "");
    setBio(artistToEdit.bio ?? "");
    setSpotify(artistToEdit.spotify ?? "");
    setImage(artistToEdit.image ?? "");

    setSelectedStage({ id: artistToEdit.stage, name: "" });
    setSelectedSchedule(artistToEdit.schedule ?? null);

    setSelectedGenres((artistToEdit.genres || []).map((g) => g.id));
    setMessage("");
  }, [artistToEdit]);


  // ---------------- HANDLE SUBMIT WITH ROLLBACK ----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!name || !selectedStage || !selectedSchedule) {
      setMessage("Please fill in name, stage and schedule.");
      return;
    }

    // extra safety: prevent selecting an occupied schedule in create-mode
    if (!artistToEdit && occupiedScheduleIds.includes(selectedSchedule.id)) {
      setMessage("Selected schedule is already occupied. Choose another.");
      return;
    }

    // in edit-mode allow keeping the same schedule even if occupied (owner)
    if (
      artistToEdit &&
      occupiedScheduleIds.includes(selectedSchedule.id) &&
      selectedSchedule.id !== (artistToEdit.schedule?.id ?? null)
    ) {
      setMessage("Selected schedule is occupied by another artist. Choose another.");
      return;
    }

    setLoading(true);

    // --- TAKE SNAPSHOT FOR ROLLBACK ---
    const snapshot = {
      name,
      bio,
      spotify,
      image,
      selectedStage,
      selectedSchedule,
      selectedGenres: [...selectedGenres],
      message,
    };

    const payload = {
      name,
      bio,
      spotify,
      image,
      stageId: selectedStage.id,
      scheduleId: selectedSchedule.id,
      genreIds: selectedGenres,
    };

    try {
      let saved: Artist;

      if (artistToEdit) {
        // PUT UPDATE
        const res = await apiClient.put(`/artists/${artistToEdit.id}`, payload);
        saved = res.data;
        setMessage("Artist updated!");
      } else {
        // POST CREATE
        const res = await apiClient.post("/artists", payload);
        saved = res.data;
        setMessage("Artist created!");

        // Reset after create (only after success)
        setName("");
        setBio("");
        setSpotify("");
        setImage("");
        setSelectedStage(null);
        setSelectedSchedule(null);
        setSelectedGenres([]);
      }

      // call parent callback (wrap in try/catch in case parent throws)
      try {
        onSaved?.(saved);
      } catch (error_) {
        // If parent's onSaved misbehaves, rollback to snapshot and show error
        console.error("onSaved callback threw:", error_);
        // Rollback UI state
        setName(snapshot.name);
        setBio(snapshot.bio);
        setSpotify(snapshot.spotify);
        setImage(snapshot.image);
        setSelectedStage(snapshot.selectedStage);
        setSelectedSchedule(snapshot.selectedSchedule);
        setSelectedGenres(snapshot.selectedGenres);
        setMessage("Saved but parent update failed; rolled back UI.");
      }

    } catch (err) {
      console.error("Error saving:", err);

      // Gør TypeScript glad ved at fortælle hvilken type Axios fejl har
      const error = err as AxiosError<{ error?: string; message?: string }>;

      // Hent HTTP-statuskode (fx 409)
      const status = error.response?.status;

      // Hent fejlbesked fra serveren
      const serverMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Unknown error";

      console.error("Error:", status, serverMsg);

      // Hvis backend siger 409 — schedule er allerede taget
      if (status === 409) {
        setMessage(serverMsg || "Conflict: schedule already assigned to another artist.");
      } else {
        setMessage("Something went wrong — check console.");
      }

      // --- ROLLBACK TO SNAPSHOT ---
      setName(snapshot.name);
      setBio(snapshot.bio);
      setSpotify(snapshot.spotify);
      setImage(snapshot.image);
      setSelectedStage(snapshot.selectedStage);
      setSelectedSchedule(snapshot.selectedSchedule);
      setSelectedGenres(snapshot.selectedGenres);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- BUTTON LABEL ----------------
  let buttonLabel = "Add Artist";
  if (loading) buttonLabel = "Saving…";
  else if (artistToEdit) buttonLabel = "Update Artist";


  return (
    <div className="admin_form">
      <h2>{artistToEdit ? "Edit Artist" : "Add New Artist"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Artist name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Artist bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <input
          type="text"
          placeholder="Spotify embed URL"
          value={spotify}
          onChange={(e) => setSpotify(e.target.value)}
        />

        <input
          type="text"
          placeholder="/img/artists/example.jpg"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        {/* Stage */}
        <AdminStageSelector
          selectedStage={selectedStage}
          onSelectStage={setSelectedStage}
        />

        {/* Schedule — nu med occupied schedules */}
        <AdminScheduleSelector
          selectedSchedule={selectedSchedule}
          onSelectSchedule={setSelectedSchedule}
          schedules={schedules}
          occupiedIds={occupiedScheduleIds}
        />

        {/* Genres */}
        <AdminGenreSelector
          selectedGenres={selectedGenres}
          onSelectGenres={setSelectedGenres}
        />

        {/* Buttons */}
        <div>
          <button type="submit" disabled={loading} className="styled_button" >
            {buttonLabel}
          </button>
        </div>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default NewArtistForm;
