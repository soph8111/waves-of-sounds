import useSchedule, { Schedule } from "../hooks/useSchedule";

interface Props {
  selectedSchedule: Schedule | null;
  onSelectSchedule: (schedule: Schedule | null) => void;
}

const AdminScheduleSelector = ({ selectedSchedule, onSelectSchedule }: Props) => {
  const { data: schedules } = useSchedule();

  return (
    <select
      value={selectedSchedule?.id ?? ""}
      onChange={(e) =>
        onSelectSchedule(
          schedules.find((sch) => sch.id === Number(e.target.value)) || null
        )
      }
    >
      <option value="">Choose a Schedule</option>

      {schedules.map((sch) => (
        <option key={sch.id} value={sch.id}>
          {sch.startDate} {sch.startTime} → {sch.endDate} {sch.endTime}
        </option>
      ))}
    </select>
  );
};

export default AdminScheduleSelector;
