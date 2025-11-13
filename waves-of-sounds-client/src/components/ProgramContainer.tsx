import { useState } from "react";
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

import { Artist } from "../hooks/useArtist";
import { Stage } from "../hooks/useStage";
import { Genre } from "../hooks/useGenre";
import { Article } from "../hooks/useArticle";
import { Schedule } from "../hooks/useSchedule";

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

  // Chakra modal kontrol
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          onClick={onOpen}
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
          <ModalHeader>Add New Artist</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AdminNewArtistForm
              onSaved={() => {
                onClose(); // Luk modal efter save
                globalThis.location.reload(); // midlertidigt: reload program for at vise ny artist
              }}
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
      <ProgramGrid dataQuery={dataQuery} isAdmin={isAdmin} />
    </div>
  );
};

export default Program;
