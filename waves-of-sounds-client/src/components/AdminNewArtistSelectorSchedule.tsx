// import useSchedule, { Schedule } from "../hooks/useSchedule";

// interface Props {
//   selectedSchedule: Schedule | null;
//   onSelectSchedule: (schedule: Schedule | null) => void;
// }

// const AdminScheduleSelector = ({ selectedSchedule, onSelectSchedule }: Props) => {
//   const { data: schedules } = useSchedule();

//   return (
//     <select
//       value={selectedSchedule?.id ?? ""}
//       onChange={(e) =>
//         onSelectSchedule(
//           schedules.find((sch) => sch.id === Number(e.target.value)) || null
//         )
//       }
//     >
//       <option value="">Choose a Schedule</option>

//       {schedules.map((sch) => (
//         <option key={sch.id} value={sch.id}>
//           {sch.startDate} {sch.startTime} → {sch.endDate} {sch.endTime}
//         </option>
//       ))}
//     </select>
//   );
// };

// export default AdminScheduleSelector;

import { Schedule } from "../hooks/useSchedule";

interface Props {
  selectedSchedule: Schedule | null;
  onSelectSchedule: (schedule: Schedule | null) => void;
  schedules?: Schedule[];          // alle schedules kommer fra parent
  occupiedIds?: number[];          // parent giver id’er der er optaget
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