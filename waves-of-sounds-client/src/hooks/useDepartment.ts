import useData from "./useData";

export interface Department {
  id: number;
  department: string;
}

const useDepartments = () => useData<Department>("/departments");

export default useDepartments;

