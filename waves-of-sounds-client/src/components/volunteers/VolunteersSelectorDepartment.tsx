import useDepartments, { Department } from "../../hooks/useDepartment";

interface Props {
  selectedDepartment: Department | null;
  onSelectDepartment: (department: Department | null) => void;
}

const DepartmentSelector = ({ selectedDepartment, onSelectDepartment }: Props) => {
  const { data: departments } = useDepartments();

  return (
    <div>
      {/* <label htmlFor="department-selector">Select Department:</label> */}
      <select
        id="department-selector"
        value={selectedDepartment?.id ?? ""}
        onChange={(e) =>
          onSelectDepartment(
            departments.find((department) => department.id === Number(e.target.value)) || null
          )
        }
      >
        <option value="" disabled>
          Choose a department
        </option>
        {departments.map((department) => (
          <option key={department.id} value={department.id}>
            {department.department}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DepartmentSelector
