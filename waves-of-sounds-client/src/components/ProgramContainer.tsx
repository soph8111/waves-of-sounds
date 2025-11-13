import { useMemo, useState } from "react";
import {
  HStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";

import ProgramGrid from "./ProgramGrid";
import StageSelector from "./ProgramSelectorStage";
import GenreSelector from "./ProgramSelectorGenre";
import DateSelector from "./ProgramSelectorDate";
import AdminNewArtistForm from "./AdminNewArtistForm";

import useArtist, { Artist } from "../hooks/useArtist";
import { Stage } from "../hooks/useStage";
import { Genre } from "../hooks/useGenre";
import { Article } from "../hooks/useArticle";
import useSchedule, { Schedule } from "../hooks/useSchedule";

export interface DataQuery {
  artist: Artist | null;
  stage: Stage | null;
  schedule: Schedule | null;
  scheduleDate: string | null;
  genre: Genre | null;
  article: Article | null;
}

const Program = () => {
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
      <h1>Program</h1>
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
          selectedSchedule={dataQuery.schedule}
          onSelectSchedule={(schedule) =>
            setDataQuery({ ...dataQuery, schedule })
          }
        />
        <GenreSelector
          selectedGenre={dataQuery.genre}
          onSelectGenre={(genre) => setDataQuery({ ...dataQuery, genre })}
        />
      </HStack>

      <h2 className="program_day">Placeholder: dag</h2>
      <h3 className="program_date">Placeholder: dato</h3>
      <hr />

      {isAdmin && (
        <Button
          colorScheme="teal"
          onClick={openNewModal}
          title="Add new artist to the program"
          mt={4}
        >
          Add new artist to the program
        </Button>
      )}

      {/* Modal (pop-up) */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{artistToEdit ? "Edit Artist" : "Add New Artist"}</ModalHeader>
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
              onCancel={() => onClose()}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} variant="ghost">
              Close
            </Button>
          </ModalFooter>
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
