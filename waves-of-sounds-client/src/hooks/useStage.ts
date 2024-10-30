import useData from "./useData";

export interface Stage {
  id: number;
  name: string;
}

const useStage = () => useData<Stage>("/stage");

export default useStage;

