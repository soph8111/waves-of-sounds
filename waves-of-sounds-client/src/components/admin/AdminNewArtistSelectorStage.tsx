import useStage, {Stage} from "../../hooks/useStage";

interface Props {
  selectedStage: Stage | null;
  onSelectStage: (stage: Stage | null) => void;
}

const AdminStageSelector = ({ selectedStage, onSelectStage }: Props) => {
  const { data: stages } = useStage();

  return (
    <select
      value={selectedStage?.id ?? ""}
      onChange={(e) =>
        onSelectStage(
          stages.find((s) => s.id === Number(e.target.value)) || null
        )
      }
    >
      <option value="">Choose a Stage</option>
      {stages.map((stage) => (
        <option key={stage.id} value={stage.id}>
          {stage.name}
        </option>
      ))}
    </select>
  );
};

export default AdminStageSelector;
