import useData from "./useData";

export interface Schedule {
  id: number;
  name: string;
}

const useSchedule = () => useData<Schedule>("/dates");

export default useSchedule;

