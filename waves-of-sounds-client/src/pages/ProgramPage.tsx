import { useMemo, useState } from "react";
import {
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";

import ProgramGrid from "../components/program/ProgramGrid";
import StageSelector from "../components/program/ProgramSelectorStage";
import GenreSelector from "../components/program/ProgramSelectorGenre";
import DateSelector from "../components/program/ProgramSelectorDate";
import AdminNewArtistForm from "../components/admin/AdminNewArtistForm";

import useArtist, { Artist } from "../hooks/useArtist";
import { Stage } from "../hooks/useStage";
import { Genre } from "../hooks/useGenre";
import useSchedule, { Schedule } from "../hooks/useSchedule";

// DataQuery Interface for brugerens valg
export interface DataQuery {
  stage: Stage | null;
  schedule: Schedule | null;
  scheduleDate: string | null;
  genre: Genre | null;
}

const Program = () => {
  // fælles state for alle filtre
  const [dataQuery, setDataQuery] = useState<DataQuery>({} as DataQuery);
  
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  // Hooks: hent schedules + artists
  const { data: schedules = [] } = useSchedule();
  // Hent alle artists uden filtre - brug et tomt dataQuery hvis din hook kræver det
  const { data: artists = [] } = useArtist({} as DataQuery);

  // Chakra modal kontrol
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [artistToEdit, setArtistToEdit] = useState<Artist | null>(null);

  // Beregn occupied schedule ids (exclude current artist when editing)
  // Når du åbner edit-modal sæt artistToEdit før modal åbnes (se openEdit below)
  const occupiedScheduleIds = useMemo(() => {
    const ids: number[] = [];
    for (const a of artists) {
      const sid = a?.schedule?.id;
      if (typeof sid !== "number") continue;
      // hvis vi redigerer en artist, skal vi IKKE markere denne artists egen schedule som occupied
      if (artistToEdit && a.id === artistToEdit.id) continue;
      ids.push(sid);
    }
    // fjern duplicates
    return Array.from(new Set(ids));
  }, [artists, artistToEdit]);

  const openNewModal = () => {
    setArtistToEdit(null);
    onOpen();
  };

  const openEditModal = (artist: Artist) => {
    setArtistToEdit(artist);
    onOpen();
  };

  // // onSaved callback fra NewArtistForm: luk modal og triggere refresh
  // const handleSaved = (savedArtist: Artist) => {
  //   // Luk modal
  //   onClose();
  //   // Force ProgramGrid til at refetch (eller du kan opdatere lokale artists state)
  // };

  return (
    <div className="container">
      <h1>program</h1>
      <p className="intro_text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
        ultrices tincidunt sodales. Suspendisse porta, lacus eget sodales
        luctus, mauris magna eleifend nisi, quis consectetur nisl massa id odio.
      </p>

      <HStack id="program_selectors">
        <StageSelector
          selectedStage={dataQuery.stage}
          onSelectStage={(stage) => setDataQuery({ ...dataQuery, stage })}
        />
        <DateSelector
          schedules={schedules}
          selectedScheduleDate={dataQuery.scheduleDate}
          onSelectScheduleDate={(scheduleDate) =>
            setDataQuery({ ...dataQuery, schedule: null, scheduleDate })
          }
        />
        <GenreSelector
          selectedGenre={dataQuery.genre}
          onSelectGenre={(genre) => setDataQuery({ ...dataQuery, genre })}
        />
      </HStack>

      <hr />

      {isAdmin && (
        <button
          style={ {margin : "2em 0"}}
          className="styled_button"
          onClick={openNewModal}
          title="Add new artist to the program"
        >
          Add new artist to the program
        </button>
      )}

      {/* Modal (pop-up) */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent p={4}>
          <ModalCloseButton />
          <ModalBody>
            <AdminNewArtistForm
              artistToEdit={artistToEdit ?? undefined}
              schedules={schedules}
              occupiedScheduleIds={occupiedScheduleIds}
              onSaved={() => {
                onClose();
                globalThis.location.reload(); // midlertidigt: reload program for at vise ny artist
              }}
              // onCancel={() => onClose()}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Program grid */}
      <ProgramGrid
        dataQuery={dataQuery}
        isAdmin={isAdmin}
        onEdit={openEditModal}
      />    
      </div>
  );
};

export default Program;
