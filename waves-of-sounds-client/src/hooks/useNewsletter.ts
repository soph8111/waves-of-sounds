import useData from "./useData";

export interface Newsletter {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

const useNewsletter = () => useData<Newsletter>("/newsletter");

export default useNewsletter;

