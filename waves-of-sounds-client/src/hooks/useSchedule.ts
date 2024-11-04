import useData from "./useData";

export interface Schedule {
  id: number;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}

const useSchedule = () => useData<Schedule>("/dates");

export default useSchedule;

