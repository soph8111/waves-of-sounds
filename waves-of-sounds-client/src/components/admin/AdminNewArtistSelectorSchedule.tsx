import { Schedule } from "../../hooks/useSchedule";

interface Props {
  selectedSchedule: Schedule | null;
  onSelectSchedule: (schedule: Schedule | null) => void;
  schedules?: Schedule[];          // all schedules from parent
  occupiedIds?: number[];          // parent gives ids that are occupied
}

const AdminScheduleSelector = ({
  selectedSchedule,
  onSelectSchedule,
  schedules = [],
  occupiedIds = [],
}: Props) => {
  return (
    <select
      value={selectedSchedule?.id ?? ""}
      onChange={(e) => {
        const id = Number(e.target.value);
        const found = schedules.find((s) => s.id === id) || null;
        onSelectSchedule(found);
      }}
    >
      <option value="">Choose a Schedule</option>

      {schedules.map((sch) => {
        const disabled = occupiedIds.includes(sch.id);
        return (
          <option key={sch.id} value={sch.id} disabled={disabled}>
            {sch.startDate} {sch.startTime.slice(0, 5)}
            {disabled ? " — occupied" : ""}
          </option>
        );
      })}
    </select>
  );
};

export default AdminScheduleSelector;