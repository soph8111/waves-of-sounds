import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { AxiosRequestConfig } from "axios";

// <T> TypeScript generics = en placeholder for en type, der bestemmes senere. Gør koden an gebruges
interface Response<T> {
  count: number;
  results: T[]; // Result er et arrray, men typen afhænger af <T>
}

const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  dependencies?: unknown[]
) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => {
      setIsLoading(true);

      apiClient
        .get<Response<T>>(endpoint, { ...requestConfig }) // API kald - endpoint returnerer objekt (f.eks. artist)
        .then((response) => setData(response.data.results)) // T[]
        .catch((error) => setError(error.message))
        .finally(() => setIsLoading(false));
    },
    dependencies ? [...dependencies] : []
  );

  return { data, error, isLoading };
};

export default useData;
