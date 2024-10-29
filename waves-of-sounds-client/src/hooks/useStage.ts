import useData from "./useData";

export interface Stage {
  id: number;
  name: string;
  // slug: string;
}

const useStage = () => useData<Stage>("/stage");

export default useStage;

